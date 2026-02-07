/**
 * Configuration for the Angular Best Practices build tooling
 */

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Base paths - navigate from packages/angular-best-practices-build/src to root
export const ROOT_DIR = join(__dirname, '../../..')
export const BUILD_DIR = join(__dirname, '..')

// Skill configuration
export interface SkillConfig {
  name: string
  title: string
  description: string
  rulesDir: string
  metadataFile: string
  outputFile: string
  sectionsFile: string
  sectionMap: Record<string, number>
}

export const SKILL_CONFIG: SkillConfig = {
  name: 'angular-best-practices',
  title: 'Angular Best Practices',
  description: 'Angular applications and libraries',
  rulesDir: join(ROOT_DIR, 'rules'),
  metadataFile: join(ROOT_DIR, 'metadata.json'),
  outputFile: join(ROOT_DIR, 'skills', 'angular-best-practices', 'AGENTS.md'),
  sectionsFile: join(ROOT_DIR, 'rules/_sections.md'),
  sectionMap: {
    // Performance - Eliminating Waterfalls
    'async': 1,
    'opt-async': 1,

    // Bundle Optimization
    'bundle': 2,

    // JavaScript Performance
    'opt': 3,

    // TypeScript
    'ts': 4,

    // Signals & Reactivity
    'signal': 5,

    // Component Patterns
    'component': 6,

    // RxJS Patterns
    'rxjs': 7,

    // Change Detection
    'cd': 8,

    // Template Optimization
    'template': 9,

    // SSR/Hydration
    'ssr': 10,

    // Forms
    'form': 11,

    // State Management - NgRx
    'ngrx': 12,

    // State Management - SignalStore
    'signalstore': 13,

    // State Management - TanStack
    'tanstack': 14,

    // Architecture
    'arch': 15,

    // Testing
    'test': 16,

    // Infrastructure (core/)
    'core': 17,
    'error-handling': 17,
    'observability': 17,
    'pattern': 17,
    'routing': 17,
    'security': 17,

    // UI
    'ui': 18,
    'a11y': 18,
    'loading': 18,
    'dialogs': 18,
    'theming': 18,

    // Data
    'http': 19,
    'mapper': 19,

    // Performance (general - maps to JS perf)
    'performance': 3,
  },
}

// Section titles mapping
export const SECTION_TITLES: Record<number, string> = {
  1: 'Eliminating Waterfalls',
  2: 'Bundle Optimization',
  3: 'JavaScript Performance',
  4: 'TypeScript Best Practices',
  5: 'Signals & Reactivity',
  6: 'Component Patterns',
  7: 'RxJS Patterns',
  8: 'Change Detection',
  9: 'Template Optimization',
  10: 'SSR & Hydration',
  11: 'Forms',
  12: 'NgRx State Management',
  13: 'SignalStore',
  14: 'TanStack Query',
  15: 'Architecture',
  16: 'Testing',
  17: 'Infrastructure',
  18: 'UI & Accessibility',
  19: 'Data Handling',
}

// Optional skills configuration
export interface OptionalSkill {
  name: string
  description: string
  sections: number[]
  tags: string[]
  globs: string[]
}

export const OPTIONAL_SKILLS: OptionalSkill[] = [
  {
    name: 'angular-best-practices-ngrx',
    description: 'NgRx state management best practices for Angular. Install alongside angular-best-practices.',
    sections: [12],
    tags: ['angular', 'ngrx', 'state-management'],
    globs: ['**/*.ts', '**/*.reducer.ts', '**/*.effects.ts', '**/*.selectors.ts'],
  },
  {
    name: 'angular-best-practices-signalstore',
    description: 'NgRx SignalStore best practices for Angular. Install alongside angular-best-practices.',
    sections: [13],
    tags: ['angular', 'ngrx-signals', 'signalstore', 'state-management'],
    globs: ['**/*.ts', '**/*.store.ts'],
  },
  {
    name: 'angular-best-practices-tanstack',
    description: 'TanStack Query best practices for Angular. Install alongside angular-best-practices.',
    sections: [14],
    tags: ['angular', 'tanstack-query', 'server-state'],
    globs: ['**/*.ts', '**/*.service.ts'],
  },
]

// Section impact levels
export const SECTION_IMPACTS: Record<number, { impact: string; description?: string }> = {
  1: { impact: 'CRITICAL', description: '2-10× improvement' },
  2: { impact: 'CRITICAL', description: 'Reduces initial load' },
  3: { impact: 'HIGH', description: 'Runtime performance' },
  4: { impact: 'MEDIUM', description: 'Type safety & maintainability' },
  5: { impact: 'HIGH', description: 'Reactive state management' },
  6: { impact: 'HIGH', description: 'Component architecture' },
  7: { impact: 'HIGH', description: 'Memory leaks & cancellation' },
  8: { impact: 'HIGH', description: 'Rendering performance' },
  9: { impact: 'HIGH', description: 'Lazy loading & pipes' },
  10: { impact: 'HIGH', description: 'Initial render & SEO' },
  11: { impact: 'MEDIUM', description: 'Form handling' },
  12: { impact: 'HIGH', description: 'Global state' },
  13: { impact: 'HIGH', description: 'Local/feature state' },
  14: { impact: 'HIGH', description: 'Server state' },
  15: { impact: 'HIGH', description: 'Scalability' },
  16: { impact: 'HIGH', description: 'Reliability' },
  17: { impact: 'MEDIUM', description: 'Cross-cutting concerns' },
  18: { impact: 'MEDIUM', description: 'User experience' },
  19: { impact: 'MEDIUM', description: 'API integration' },
}
