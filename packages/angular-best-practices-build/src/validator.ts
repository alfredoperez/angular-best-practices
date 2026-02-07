/**
 * Validator for rule markdown files
 * Ensures rules comply with formatting standards
 */

export type ValidationErrorType =
  | 'LINE_COUNT'
  | 'CODE_BLOCKS'
  | 'CODE_TOO_LONG'
  | 'MISSING_FIELD'

export interface ValidationError {
  file: string
  type: ValidationErrorType
  message: string
}

export interface ValidationConfig {
  maxLines: number
  minCodeBlocks: number
  maxCodeBlocks: number
  maxCodeBlockLines: number
  requiredFields: string[]
}

export const DEFAULT_CONFIG: ValidationConfig = {
  maxLines: 50,
  minCodeBlocks: 0, // TEXT-ONLY rules have no code blocks
  maxCodeBlocks: 2,
  maxCodeBlockLines: 10,
  requiredFields: ['title', 'impact', 'tags'],
}

interface Frontmatter {
  title?: string
  impact?: string
  tags?: string
  [key: string]: string | undefined
}

function parseFrontmatter(content: string): Frontmatter {
  const frontmatter: Frontmatter = {}

  if (!content.startsWith('---')) {
    return frontmatter
  }

  const endIndex = content.indexOf('---', 3)
  if (endIndex === -1) {
    return frontmatter
  }

  const frontmatterText = content.slice(3, endIndex).trim()

  for (const line of frontmatterText.split('\n')) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    let value = line.slice(colonIndex + 1).trim()

    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    frontmatter[key] = value
  }

  return frontmatter
}

function extractCodeBlocks(content: string): string[] {
  const blocks: string[] = []
  const regex = /```[\s\S]*?```/g
  let match

  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[0])
  }

  return blocks
}

export function validateRule(
  filePath: string,
  content: string,
  config: ValidationConfig = DEFAULT_CONFIG
): ValidationError[] {
  const errors: ValidationError[] = []
  const lines = content.split('\n')

  // Check line count
  if (lines.length > config.maxLines) {
    errors.push({
      file: filePath,
      type: 'LINE_COUNT',
      message: `${lines.length} lines (max ${config.maxLines})`,
    })
  }

  // Check code blocks count
  const codeBlocks = extractCodeBlocks(content)
  if (codeBlocks.length < config.minCodeBlocks) {
    errors.push({
      file: filePath,
      type: 'CODE_BLOCKS',
      message: `${codeBlocks.length} code blocks (min ${config.minCodeBlocks})`,
    })
  }
  if (codeBlocks.length > config.maxCodeBlocks) {
    errors.push({
      file: filePath,
      type: 'CODE_BLOCKS',
      message: `${codeBlocks.length} code blocks (max ${config.maxCodeBlocks})`,
    })
  }

  // Check code block length
  codeBlocks.forEach((block, i) => {
    const blockLines = block.split('\n').length - 2 // exclude ``` lines
    if (blockLines > config.maxCodeBlockLines) {
      errors.push({
        file: filePath,
        type: 'CODE_TOO_LONG',
        message: `Code block ${i + 1} has ${blockLines} lines (max ${config.maxCodeBlockLines})`,
      })
    }
  })

  // Check required frontmatter fields
  const frontmatter = parseFrontmatter(content)
  for (const field of config.requiredFields) {
    if (!frontmatter[field] || frontmatter[field]?.trim() === '') {
      errors.push({
        file: filePath,
        type: 'MISSING_FIELD',
        message: `Missing required field: ${field}`,
      })
    }
  }

  return errors
}

export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) {
    return ''
  }

  const grouped = new Map<string, ValidationError[]>()
  for (const error of errors) {
    if (!grouped.has(error.file)) {
      grouped.set(error.file, [])
    }
    grouped.get(error.file)!.push(error)
  }

  const lines: string[] = []
  for (const [file, fileErrors] of grouped) {
    lines.push(`\n  ${file}:`)
    for (const error of fileErrors) {
      lines.push(`    - ${error.message}`)
    }
  }

  return lines.join('\n')
}
