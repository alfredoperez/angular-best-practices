/**
 * Parser for rule markdown files
 * Extracts frontmatter, content, and code examples
 */

import { readFileSync } from 'fs'
import { basename } from 'path'
import type { Rule, RuleFile, ImpactLevel, CodeExample } from './types.js'

interface Frontmatter {
  title?: string
  impact?: ImpactLevel
  impactDescription?: string
  tags?: string
  section?: number
  subsection?: number
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  const frontmatter: Frontmatter = {}

  if (!content.startsWith('---')) {
    return { frontmatter, body: content }
  }

  const endIndex = content.indexOf('---', 3)
  if (endIndex === -1) {
    return { frontmatter, body: content }
  }

  const frontmatterText = content.slice(3, endIndex).trim()
  const body = content.slice(endIndex + 3).trim()

  for (const line of frontmatterText.split('\n')) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    let value = line.slice(colonIndex + 1).trim()

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    switch (key) {
      case 'title':
        frontmatter.title = value
        break
      case 'impact':
        frontmatter.impact = value as ImpactLevel
        break
      case 'impactDescription':
        frontmatter.impactDescription = value
        break
      case 'tags':
        frontmatter.tags = value
        break
      case 'section':
        frontmatter.section = parseInt(value, 10)
        break
      case 'subsection':
        frontmatter.subsection = parseInt(value, 10)
        break
    }
  }

  return { frontmatter, body }
}

function parseCodeBlocks(body: string): CodeExample[] {
  const examples: CodeExample[] = []
  const lines = body.split('\n')

  let currentLabel = ''
  let inCodeBlock = false
  let codeLines: string[] = []
  let language = 'typescript'
  let pendingText: string[] = []
  let afterCodeBlock = false // Track if we've seen a code block

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Check for label patterns like **Incorrect:** or **Correct:**
    const labelMatch = line.match(/^\*\*([^*]+?)(?:\s*\([^)]*\))?:\*\*\s*$/)
    if (labelMatch && !inCodeBlock) {
      // Save any pending text to previous example (only if after a code block)
      if (examples.length > 0 && pendingText.length > 0 && afterCodeBlock) {
        examples[examples.length - 1].additionalText = pendingText.join('\n').trim()
      }
      pendingText = []
      afterCodeBlock = false

      currentLabel = labelMatch[1].trim()
      continue
    }

    // Start of code block
    if (line.startsWith('```') && !inCodeBlock) {
      inCodeBlock = true
      language = line.slice(3).trim() || 'typescript'
      codeLines = []
      continue
    }

    // End of code block
    if (line === '```' && inCodeBlock) {
      inCodeBlock = false
      afterCodeBlock = true
      if (currentLabel || codeLines.length > 0) {
        examples.push({
          label: currentLabel || 'Example',
          code: codeLines.join('\n'),
          language,
        })
        currentLabel = ''
      }
      pendingText = [] // Reset pending text after adding example
      continue
    }

    // Inside code block
    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // Only collect text after code blocks (for additional explanations)
    if (afterCodeBlock && line.trim() && !line.startsWith('#')) {
      pendingText.push(line)
    }
  }

  // Handle any remaining pending text
  if (examples.length > 0 && pendingText.length > 0) {
    examples[examples.length - 1].additionalText = pendingText.join('\n').trim()
  }

  return examples
}

function extractTitle(body: string): string | undefined {
  const lines = body.split('\n')
  for (const line of lines) {
    // Match ## Title or # Title (top-level heading)
    const match = line.match(/^#{1,2}\s+(.+)$/)
    if (match) {
      return match[1].trim()
    }
  }
  return undefined
}

function extractExplanation(body: string): string {
  const lines = body.split('\n')
  const explanationLines: string[] = []
  let foundHeading = false

  for (const line of lines) {
    // Skip the first heading
    if (!foundHeading && line.match(/^#{1,2}\s+/)) {
      foundHeading = true
      continue
    }
    // Stop at code block or label
    if (line.startsWith('```') || line.match(/^\*\*[^*]+:\*\*/)) {
      break
    }
    // Skip other headings
    if (line.startsWith('#')) {
      continue
    }
    // Skip blockquotes (often used for descriptions)
    if (line.startsWith('>')) {
      const content = line.slice(1).trim()
      if (content) {
        explanationLines.push(content)
      }
      continue
    }
    if (line.trim()) {
      explanationLines.push(line.trim())
    }
  }

  return explanationLines.join(' ').trim()
}

function extractReferences(body: string): string[] {
  const references: string[] = []
  const urlRegex = /https?:\/\/[^\s)]+/g
  const matches = body.match(urlRegex)
  if (matches) {
    references.push(...matches)
  }
  return [...new Set(references)] // Dedupe
}

function inferSectionFromFilename(
  filename: string,
  sectionMap: Record<string, number>
): number | undefined {
  const name = basename(filename, '.md')

  // Try progressively shorter prefixes
  const parts = name.split('-')
  for (let i = parts.length; i > 0; i--) {
    const prefix = parts.slice(0, i).join('-')
    if (sectionMap[prefix] !== undefined) {
      return sectionMap[prefix]
    }
  }

  // Try just the first part
  if (sectionMap[parts[0]] !== undefined) {
    return sectionMap[parts[0]]
  }

  return undefined
}

export function parseRuleFile(
  filePath: string,
  sectionMap: Record<string, number>
): RuleFile | null {
  const content = readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n')
  const { frontmatter, body } = parseFrontmatter(content)

  // Skip template files and section definitions
  const filename = basename(filePath)
  if (filename.startsWith('_')) {
    return null
  }

  // Determine section number
  let section = frontmatter.section
  if (section === undefined) {
    section = inferSectionFromFilename(filePath, sectionMap)
  }
  if (section === undefined) {
    console.warn(`Could not determine section for: ${filePath}`)
    return null
  }

  const title = frontmatter.title || extractTitle(body) || basename(filePath, '.md')
  const impact = frontmatter.impact || 'MEDIUM'
  const explanation = extractExplanation(body)
  const examples = parseCodeBlocks(body)
  const references = extractReferences(body)
  const tags = frontmatter.tags?.split(',').map(t => t.trim()) || []

  const rule: Rule = {
    id: '', // Will be assigned during build
    title,
    section,
    impact,
    impactDescription: frontmatter.impactDescription,
    explanation,
    examples,
    references: references.length > 0 ? references : undefined,
    tags: tags.length > 0 ? tags : undefined,
  }

  return {
    section,
    subsection: frontmatter.subsection,
    rule,
  }
}
