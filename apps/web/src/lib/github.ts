import { Octokit } from '@octokit/rest'
import type { GeneratedRule } from './schemas'
import { ruleToMarkdown } from './schemas'

const OWNER = 'alfredoperez'
const REPO = 'angular-best-practices'

function getOctokit() {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null
  return new Octokit({ auth: token })
}

export async function createRulePR(
  rule: GeneratedRule,
  githubUsername: string
): Promise<{ url: string } | { error: string }> {
  const octokit = getOctokit()
  if (!octokit) {
    return { error: 'GitHub token not configured. Copy the rule content manually.' }
  }

  const slug = rule.filename.replace('.md', '')
  const branchName = `rule/${rule.category}/${slug}`
  const filePath = `rules/${rule.category}/${rule.filename}`
  const content = ruleToMarkdown(rule)

  try {
    // Get the default branch's latest commit
    const { data: ref } = await octokit.git.getRef({
      owner: OWNER,
      repo: REPO,
      ref: 'heads/main',
    })
    const baseSha = ref.object.sha

    // Create a new branch
    await octokit.git.createRef({
      owner: OWNER,
      repo: REPO,
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    })

    // Create the file
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: filePath,
      message: `feat: add rule ${rule.frontmatter.title}`,
      content: Buffer.from(content).toString('base64'),
      branch: branchName,
    })

    // Create PR
    const { data: pr } = await octokit.pulls.create({
      owner: OWNER,
      repo: REPO,
      title: `Add rule: ${rule.frontmatter.title}`,
      head: branchName,
      base: 'main',
      body: `## New Rule Submission

**Rule:** ${rule.frontmatter.title}
**Impact:** ${rule.frontmatter.impact} — ${rule.frontmatter.impactDescription}
**Section:** ${rule.section} (${rule.category})
**Tags:** ${rule.frontmatter.tags.join(', ')}

### AI Reasoning
${rule.reasoning}

---

Submitted by @${githubUsername} via the Angular Best Practices web app.`,
      labels: undefined,
    })

    // Try to add label (may fail if label doesn't exist)
    try {
      await octokit.issues.addLabels({
        owner: OWNER,
        repo: REPO,
        issue_number: pr.number,
        labels: ['community-submission'],
      })
    } catch {
      // Label may not exist yet, that's OK
    }

    return { url: pr.html_url }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { error: `Failed to create PR: ${message}` }
  }
}
