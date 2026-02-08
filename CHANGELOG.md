# Changelog

## [1.1.0] - 2026-02-07

### Fixed
- Fix rule generation step transition not advancing to review
- Return JSON errors from API routes instead of plain text
- Handle Gemini API errors (429) gracefully with try/catch

### Changed
- Tighten rate limiting to 3 per user per day + 20 global daily cap
- Add loading spinner during AI generation
- Redirect to login on auth errors instead of showing generic failures

### Added
- GitHub Issue template for rule suggestions
- "Submit as GitHub Issue" option on submit form (always available, highlighted on errors)
- Favicon using Angular logo
- Start Over button when generation fails

## [1.0.0] - 2026-02-07

### Added
- 97 Angular best practice rules across 19 categories
- Build tooling to generate AGENTS.md from individual rule files
- Optional library skills: NgRx, SignalStore, TanStack Query
- SKILL.md metadata for skills.sh publishing
