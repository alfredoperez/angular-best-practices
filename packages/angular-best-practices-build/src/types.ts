/**
 * Type definitions for Angular Best Practices rules
 */

export type ImpactLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM-HIGH' | 'MEDIUM' | 'LOW-MEDIUM' | 'LOW'

export interface CodeExample {
  label: string // e.g., "Incorrect", "Correct", "Example"
  description?: string // Optional description before code
  code: string
  language?: string // Default: 'typescript'
  additionalText?: string // Optional text after code block
}

export interface Rule {
  id: string // e.g., "1.1", "2.3"
  title: string
  section: number // Main section number
  subsection?: number // Subsection number within section
  impact: ImpactLevel
  impactDescription?: string // e.g., "2-10× improvement"
  explanation: string
  examples: CodeExample[]
  references?: string[] // URLs or citations
  tags?: string[] // For categorization/search
}

export interface Section {
  number: number
  title: string
  impact: ImpactLevel
  impactDescription?: string
  introduction?: string
  rules: Rule[]
}

export interface GuidelinesDocument {
  version: string
  organization: string
  date: string
  abstract: string
  sections: Section[]
  references?: string[]
}

export interface RuleFile {
  section: number
  subsection?: number
  rule: Rule
}

export interface SectionMeta {
  number: number
  title: string
  impact: ImpactLevel
  impactDescription?: string
  introduction?: string
}
