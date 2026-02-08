export interface ValidationError {
  type: string
  message: string
}

export function validateRuleContent(content: string): ValidationError[] {
  const errors: ValidationError[] = []
  const lines = content.split('\n')

  // Check line count
  if (lines.length > 50) {
    errors.push({
      type: 'LINE_COUNT',
      message: `${lines.length} lines (max 50)`,
    })
  }

  // Check code blocks
  const codeBlocks = content.match(/```[\s\S]*?```/g) ?? []
  if (codeBlocks.length > 2) {
    errors.push({
      type: 'CODE_BLOCKS',
      message: `${codeBlocks.length} code blocks (max 2)`,
    })
  }

  // Check code block length
  for (let i = 0; i < codeBlocks.length; i++) {
    const blockLines = codeBlocks[i].split('\n').length - 2
    if (blockLines > 10) {
      errors.push({
        type: 'CODE_TOO_LONG',
        message: `Code block ${i + 1} has ${blockLines} lines (max 10)`,
      })
    }
  }

  // Check required frontmatter
  if (!content.startsWith('---')) {
    errors.push({ type: 'MISSING_FIELD', message: 'Missing frontmatter' })
  } else {
    const end = content.indexOf('---', 3)
    if (end !== -1) {
      const fm = content.slice(3, end)
      if (!fm.includes('title:')) {
        errors.push({ type: 'MISSING_FIELD', message: 'Missing title' })
      }
      if (!fm.includes('impact:')) {
        errors.push({ type: 'MISSING_FIELD', message: 'Missing impact' })
      }
      if (!fm.includes('tags:')) {
        errors.push({ type: 'MISSING_FIELD', message: 'Missing tags' })
      }
    }
  }

  return errors
}
