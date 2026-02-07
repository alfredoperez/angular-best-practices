#!/usr/bin/env tsx
/**
 * Build script for Angular Best Practices
 * Generates AGENTS.md from individual rule files
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs'
import { join, basename } from 'path'
import { SKILL_CONFIG, SECTION_TITLES, SECTION_IMPACTS, OPTIONAL_SKILLS, ROOT_DIR } from './config.js'
import { parseRuleFile } from './parser.js'
import { validateRule, formatValidationErrors, ValidationError, DEFAULT_CONFIG } from './validator.js'
import type { Section, Rule, GuidelinesDocument, ImpactLevel } from './types.js'

interface Metadata {
  version: string
  organization: string
  abstract: string
}

interface ParsedRuleWithPath {
  section: number
  rule: Rule
  filePath: string
  rawContent: string
  tags: string[]
}

// Parse CLI arguments
const args = process.argv.slice(2)
const upgradeVersion = args.includes('--upgrade-version')
const skipValidation = args.includes('--skip-validation')

// Parse --exclude flag (defaults to excluding 'patterns' which are in beta)
const DEFAULT_EXCLUDE_TAGS = ['patterns']
const excludeIndex = args.indexOf('--exclude')
const excludeTags: string[] =
  excludeIndex >= 0 && args[excludeIndex + 1]
    ? args[excludeIndex + 1].split(',').map(t => t.trim().toLowerCase())
    : DEFAULT_EXCLUDE_TAGS

// Allow --include-all to override default exclusions
const includeAll = args.includes('--include-all')
const finalExcludeTags = includeAll ? [] : excludeTags

function incrementVersion(version: string): string {
  const parts = version.split('.').map(Number)
  parts[2] = (parts[2] || 0) + 1
  return parts.join('.')
}

function getAllRuleFiles(dir: string): string[] {
  const files: string[] = []

  function walk(currentDir: string) {
    const entries = readdirSync(currentDir)
    for (const entry of entries) {
      const fullPath = join(currentDir, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        // Skip guides directory
        if (entry === 'guides') continue
        walk(fullPath)
      } else if (entry.endsWith('.md') && !entry.startsWith('_')) {
        files.push(fullPath)
      }
    }
  }

  walk(dir)
  return files.sort()
}

function generateTableOfContents(sections: Section[]): string {
  const lines: string[] = ['## Table of Contents', '']

  for (const section of sections) {
    const anchor = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const impactBadge = section.impact ? ` — **${section.impact}**` : ''
    lines.push(`${section.number}. [${section.title}](#${section.number}-${anchor})${impactBadge}`)

    for (const rule of section.rules) {
      const ruleAnchor = rule.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      lines.push(`   - ${rule.id} [${rule.title}](#${rule.id.replace('.', '')}-${ruleAnchor})`)
    }
  }

  return lines.join('\n')
}

function generateRuleMarkdown(rule: Rule): string {
  const lines: string[] = []

  // Rule header with ID
  const anchor = rule.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  lines.push(`### ${rule.id} ${rule.title}`)
  lines.push('')

  // Impact badge
  let impactLine = `**Impact: ${rule.impact}**`
  if (rule.impactDescription) {
    impactLine += ` (${rule.impactDescription})`
  }
  lines.push(impactLine)
  lines.push('')

  // Explanation
  if (rule.explanation) {
    lines.push(rule.explanation)
    lines.push('')
  }

  // Code examples
  for (const example of rule.examples) {
    lines.push(`**${example.label}:**`)
    lines.push('')
    lines.push('```' + (example.language || 'typescript'))
    lines.push(example.code)
    lines.push('```')
    lines.push('')

    if (example.additionalText) {
      lines.push(example.additionalText)
      lines.push('')
    }
  }

  // References
  if (rule.references && rule.references.length > 0) {
    lines.push('**References:**')
    for (const ref of rule.references) {
      lines.push(`- ${ref}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

function generateSectionMarkdown(section: Section): string {
  const lines: string[] = []
  const anchor = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  // Section header
  lines.push(`## ${section.number}. ${section.title}`)
  lines.push('')

  // Impact
  let impactLine = `**Impact: ${section.impact}**`
  if (section.impactDescription) {
    impactLine += ` (${section.impactDescription})`
  }
  lines.push(impactLine)
  lines.push('')

  // Introduction
  if (section.introduction) {
    lines.push(section.introduction)
    lines.push('')
  }

  // Rules
  for (const rule of section.rules) {
    lines.push(generateRuleMarkdown(rule))
  }

  lines.push('---')
  lines.push('')

  return lines.join('\n')
}

function generateMarkdown(doc: GuidelinesDocument): string {
  const lines: string[] = []

  // Header
  lines.push(`# ${SKILL_CONFIG.title}`)
  lines.push('')
  lines.push(`**Version ${doc.version}**`)
  lines.push(`${doc.organization}`)
  lines.push(`${doc.date}`)
  lines.push('')

  // Note for AI agents
  lines.push('> **Note:**')
  lines.push('> This document is optimized for AI agents and LLMs. It provides')
  lines.push('> actionable guidelines for Angular applications with code examples')
  lines.push('> and impact assessments.')
  lines.push('')

  lines.push('---')
  lines.push('')

  // Abstract
  lines.push('## Abstract')
  lines.push('')
  lines.push(doc.abstract)
  lines.push('')

  lines.push('---')
  lines.push('')

  // Table of Contents
  lines.push(generateTableOfContents(doc.sections))
  lines.push('')
  lines.push('---')
  lines.push('')

  // Sections
  for (const section of doc.sections) {
    lines.push(generateSectionMarkdown(section))
  }

  return lines.join('\n')
}

function buildSkill(): void {
  const config = SKILL_CONFIG

  console.log(`Building ${config.name}...`)

  if (finalExcludeTags.length > 0) {
    console.log(`  Excluding tags: ${finalExcludeTags.join(', ')}`)
  }

  // Load metadata
  let metadata: Metadata
  if (existsSync(config.metadataFile)) {
    metadata = JSON.parse(readFileSync(config.metadataFile, 'utf-8'))
  } else {
    metadata = {
      version: '1.0.0',
      organization: 'Angular Best Practices',
      abstract: 'Comprehensive guidelines for building performant, maintainable Angular applications.',
    }
  }

  // Optionally upgrade version
  if (upgradeVersion) {
    metadata.version = incrementVersion(metadata.version)
    writeFileSync(config.metadataFile, JSON.stringify(metadata, null, 2) + '\n')
    console.log(`  Version upgraded to ${metadata.version}`)
  }

  // Parse all rule files
  const ruleFiles = getAllRuleFiles(config.rulesDir)
  console.log(`  Found ${ruleFiles.length} rule files`)

  const parsedRules: ParsedRuleWithPath[] = []

  for (const filePath of ruleFiles) {
    const rawContent = readFileSync(filePath, 'utf-8')
    const parsed = parseRuleFile(filePath, config.sectionMap)
    if (parsed) {
      const tags = parsed.rule.tags?.map(t => t.toLowerCase()) || []
      parsedRules.push({
        section: parsed.section,
        rule: parsed.rule,
        filePath,
        rawContent,
        tags,
      })
    }
  }

  console.log(`  Parsed ${parsedRules.length} rules`)

  // Filter rules by excluded tags
  const filteredRules = parsedRules.filter(({ tags }) => {
    if (finalExcludeTags.length === 0) return true
    return !finalExcludeTags.some(excludeTag => tags.includes(excludeTag))
  })

  if (finalExcludeTags.length > 0) {
    const excluded = parsedRules.length - filteredRules.length
    console.log(`  Excluded ${excluded} rules by tag`)
  }

  // Validate rules (unless skipped)
  if (!skipValidation) {
    const allErrors: ValidationError[] = []
    for (const { filePath, rawContent } of filteredRules) {
      const errors = validateRule(filePath, rawContent, DEFAULT_CONFIG)
      allErrors.push(...errors)
    }

    if (allErrors.length > 0) {
      console.error('\n❌ Validation failed:')
      console.error(formatValidationErrors(allErrors))
      console.error(`\n${allErrors.length} error(s) found. Fix violations or use --skip-validation to bypass.\n`)
      process.exit(1)
    }

    console.log(`  Validated ${filteredRules.length} rules`)
  }

  // Collect optional section numbers
  const optionalSections = new Set(OPTIONAL_SKILLS.flatMap(s => s.sections))

  // --- Core skill: exclude optional sections ---
  const coreRules = filteredRules.filter(({ section }) => !optionalSections.has(section))
  const coreSections = buildSections(coreRules)
  const coreDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const coreDoc: GuidelinesDocument = {
    version: metadata.version,
    organization: metadata.organization,
    date: coreDate,
    abstract: metadata.abstract,
    sections: coreSections,
  }

  const coreMarkdown = generateMarkdown(coreDoc)
  writeFileSync(config.outputFile, coreMarkdown)

  const coreTotalRules = coreSections.reduce((sum, s) => sum + s.rules.length, 0)
  console.log(`  Generated ${config.outputFile}`)
  console.log(`  Core: ${coreSections.length} sections, ${coreTotalRules} rules`)

  // --- Optional skills ---
  let optionalTotalRules = 0
  for (const skill of OPTIONAL_SKILLS) {
    const skillRules = filteredRules.filter(({ section }) => skill.sections.includes(section))
    if (skillRules.length === 0) {
      console.log(`  Skipping ${skill.name} (no rules)`)
      continue
    }

    const skillSections = buildSections(skillRules)
    const skillMarkdown = generateOptionalSkillMarkdown(skill.name, skillSections)

    const skillDir = join(ROOT_DIR, 'skills', skill.name)
    mkdirSync(skillDir, { recursive: true })
    const outputPath = join(skillDir, 'AGENTS.md')
    writeFileSync(outputPath, skillMarkdown)

    const skillTotalRules = skillSections.reduce((sum, s) => sum + s.rules.length, 0)
    optionalTotalRules += skillTotalRules
    console.log(`  Generated ${outputPath} (${skillSections.length} sections, ${skillTotalRules} rules)`)
  }

  console.log(`  Grand total: ${coreTotalRules + optionalTotalRules} rules`)
}

function buildSections(rules: ParsedRuleWithPath[]): Section[] {
  const sectionRules = new Map<number, Rule[]>()
  for (const { section, rule } of rules) {
    if (!sectionRules.has(section)) {
      sectionRules.set(section, [])
    }
    sectionRules.get(section)!.push(rule)
  }

  const sections: Section[] = []
  const sortedSectionNumbers = [...sectionRules.keys()].sort((a, b) => a - b)

  // Renumber sections sequentially starting from 1
  sortedSectionNumbers.forEach((originalNum, index) => {
    const newNum = index + 1
    const rules = sectionRules.get(originalNum)!

    // Sort rules alphabetically by title
    rules.sort((a, b) => a.title.localeCompare(b.title))

    // Assign IDs using renumbered section
    rules.forEach((rule, ruleIndex) => {
      rule.id = `${newNum}.${ruleIndex + 1}`
      rule.section = newNum
    })

    const impactInfo = SECTION_IMPACTS[originalNum] || { impact: 'MEDIUM' }

    sections.push({
      number: newNum,
      title: SECTION_TITLES[originalNum] || `Section ${originalNum}`,
      impact: impactInfo.impact as ImpactLevel,
      impactDescription: impactInfo.description,
      rules,
    })
  })

  return sections
}

function generateOptionalSkillMarkdown(skillName: string, sections: Section[]): string {
  const lines: string[] = []

  const title = skillName
    .replace('angular-best-practices-', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())

  lines.push(`# Angular ${title} Best Practices`)
  lines.push('')
  lines.push('> Use with the core `angular-best-practices` skill.')
  lines.push('')
  lines.push('---')
  lines.push('')

  for (const section of sections) {
    lines.push(generateSectionMarkdown(section))
  }

  return lines.join('\n')
}

// Main
buildSkill()
console.log('Build complete!')
