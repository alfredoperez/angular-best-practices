interface RulePreviewProps {
  content: string
}

export function RulePreview({ content }: RulePreviewProps) {
  return (
    <div className="terminal-box overflow-hidden">
      <div className="border-b border-border px-4 py-2">
        <span className="text-xs text-text-dim">Preview</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-text-muted whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  )
}
