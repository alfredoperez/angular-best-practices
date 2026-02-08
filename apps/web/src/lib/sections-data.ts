export interface Section {
  number: number
  title: string
  prefix: string
  impact: string
  impactDescription: string
  ruleCount: number
}

export const sections: Section[] = [
  { number: 1, title: 'Eliminating Waterfalls', prefix: 'async-, opt-async-', impact: 'CRITICAL', impactDescription: '2-10x improvement', ruleCount: 2 },
  { number: 2, title: 'Bundle Optimization', prefix: 'bundle-', impact: 'CRITICAL', impactDescription: 'Reduces initial load', ruleCount: 5 },
  { number: 3, title: 'JavaScript Performance', prefix: 'opt-', impact: 'HIGH', impactDescription: 'Runtime performance', ruleCount: 14 },
  { number: 4, title: 'TypeScript Best Practices', prefix: 'ts-', impact: 'MEDIUM', impactDescription: 'Type safety & maintainability', ruleCount: 14 },
  { number: 5, title: 'Signals & Reactivity', prefix: 'signal-', impact: 'HIGH', impactDescription: 'Reactive state management', ruleCount: 5 },
  { number: 6, title: 'Component Patterns', prefix: 'component-', impact: 'HIGH', impactDescription: 'Component architecture', ruleCount: 4 },
  { number: 7, title: 'RxJS Patterns', prefix: 'rxjs-', impact: 'HIGH', impactDescription: 'Memory leaks & cancellation', ruleCount: 5 },
  { number: 8, title: 'Change Detection', prefix: 'cd-', impact: 'HIGH', impactDescription: 'Rendering performance', ruleCount: 4 },
  { number: 9, title: 'Template Optimization', prefix: 'template-', impact: 'HIGH', impactDescription: 'Lazy loading & pipes', ruleCount: 1 },
  { number: 10, title: 'SSR & Hydration', prefix: 'ssr-', impact: 'HIGH', impactDescription: 'Initial render & SEO', ruleCount: 7 },
  { number: 11, title: 'Forms', prefix: 'form-', impact: 'MEDIUM', impactDescription: 'Form handling', ruleCount: 5 },
  { number: 12, title: 'NgRx State Management', prefix: 'ngrx-', impact: 'HIGH', impactDescription: 'Global state', ruleCount: 5 },
  { number: 13, title: 'SignalStore', prefix: 'signalstore-', impact: 'HIGH', impactDescription: 'Local/feature state', ruleCount: 4 },
  { number: 14, title: 'TanStack Query', prefix: 'tanstack-', impact: 'HIGH', impactDescription: 'Server state', ruleCount: 4 },
  { number: 15, title: 'Architecture', prefix: 'arch-', impact: 'HIGH', impactDescription: 'Scalability', ruleCount: 3 },
  { number: 16, title: 'Testing', prefix: 'test-', impact: 'HIGH', impactDescription: 'Reliability', ruleCount: 9 },
  { number: 17, title: 'Infrastructure', prefix: 'core-, routing-, security-', impact: 'MEDIUM', impactDescription: 'Cross-cutting concerns', ruleCount: 11 },
  { number: 18, title: 'UI & Accessibility', prefix: 'ui-, a11y-', impact: 'MEDIUM', impactDescription: 'User experience', ruleCount: 7 },
  { number: 19, title: 'Data Handling', prefix: 'http-, mapper-', impact: 'MEDIUM', impactDescription: 'API integration', ruleCount: 4 },
  { number: 20, title: 'Angular Material', prefix: 'material-', impact: 'MEDIUM', impactDescription: 'Component usage & theming', ruleCount: 4 },
  { number: 21, title: 'PrimeNG', prefix: 'primeng-', impact: 'MEDIUM', impactDescription: 'Component imports & theming', ruleCount: 3 },
  { number: 22, title: 'Spartan UI', prefix: 'spartan-', impact: 'MEDIUM', impactDescription: 'Headless components', ruleCount: 3 },
  { number: 23, title: 'Transloco', prefix: 'transloco-', impact: 'MEDIUM', impactDescription: 'Runtime i18n', ruleCount: 3 },
]

// Section map: prefix → section number (mirrored from config.ts)
export const sectionMap: Record<string, number> = {
  'async': 1, 'opt-async': 1,
  'bundle': 2,
  'opt': 3, 'performance': 3,
  'ts': 4,
  'signal': 5,
  'component': 6,
  'rxjs': 7,
  'cd': 8,
  'template': 9,
  'ssr': 10,
  'form': 11,
  'ngrx': 12,
  'signalstore': 13,
  'tanstack': 14,
  'arch': 15,
  'test': 16,
  'core': 17, 'error-handling': 17, 'observability': 17, 'pattern': 17, 'routing': 17, 'security': 17,
  'ui': 18, 'a11y': 18, 'loading': 18, 'dialogs': 18, 'theming': 18,
  'http': 19, 'mapper': 19,
  'material': 20,
  'primeng': 21,
  'spartan': 22,
  'transloco': 23,
}

export interface SkillDefinition {
  id: string
  name: string
  rules: number
  always?: boolean
  flag?: string
  description: string
}

export const skills: SkillDefinition[] = [
  {
    id: 'core',
    name: 'Angular Best Practices',
    rules: 93,
    always: true,
    description: 'Core Angular, TypeScript, signals, testing, performance',
  },
  {
    id: 'ngrx',
    name: 'NgRx',
    rules: 5,
    flag: 'angular-best-practices-ngrx',
    description: 'Action groups, selectors, pure reducers, entity adapter',
  },
  {
    id: 'signalstore',
    name: 'SignalStore',
    rules: 4,
    flag: 'angular-best-practices-signalstore',
    description: 'Feature stores, computed state, entities, rxMethod',
  },
  {
    id: 'tanstack',
    name: 'TanStack Query',
    rules: 4,
    flag: 'angular-best-practices-tanstack',
    description: 'Query keys, mutations, prefetching, enabled patterns',
  },
  {
    id: 'material',
    name: 'Angular Material',
    rules: 4,
    flag: 'angular-best-practices-material',
    description: 'Component usage, theming, CDK utilities, test harnesses',
  },
  {
    id: 'primeng',
    name: 'PrimeNG',
    rules: 3,
    flag: 'angular-best-practices-primeng',
    description: 'Component imports, theming system, table patterns',
  },
  {
    id: 'spartan',
    name: 'Spartan UI',
    rules: 3,
    flag: 'angular-best-practices-spartan',
    description: 'Brain/Helm headless components, Tailwind integration',
  },
  {
    id: 'transloco',
    name: 'Transloco',
    rules: 3,
    flag: 'angular-best-practices-transloco',
    description: 'Runtime i18n, lazy-loaded translations, test mocking',
  },
]
