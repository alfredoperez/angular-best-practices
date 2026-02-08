Ship the current changes: create branch, commit, PR, and merge.

## Instructions

1. Run `git status` and `git diff --stat` to see all changes
2. Determine a conventional commit type and short description from the changes (feat/fix/chore/docs/refactor)
3. Create a branch named `{type}/{short-slug}` (e.g., `feat/add-dark-mode`)
4. Stage all relevant files (exclude node_modules, .env, credentials, build artifacts like tsconfig.tsbuildinfo)
5. Commit with a conventional commit message: type + short summary on first line, bullet points for details
6. Push the branch with `-u`
7. Create a PR with `gh pr create` using a short title and summary body
8. Merge the PR with `gh pr merge --merge`
9. Switch back to main and pull

Do NOT add Co-Authored-By lines. Use conventional commits format per CLAUDE.md.

If $ARGUMENTS is provided, use it as context for the commit message.
