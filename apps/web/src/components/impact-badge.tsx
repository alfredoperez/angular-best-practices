const impactColors: Record<string, string> = {
  CRITICAL: 'border-impact-critical text-impact-critical',
  HIGH: 'border-impact-high text-impact-high',
  'MEDIUM-HIGH': 'border-impact-medium text-impact-medium',
  MEDIUM: 'border-impact-medium text-impact-medium',
  'LOW-MEDIUM': 'border-impact-low text-impact-low',
  LOW: 'border-impact-low text-impact-low',
}

export function ImpactBadge({ impact }: { impact: string }) {
  const colors = impactColors[impact] ?? 'border-border text-text-muted'
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 text-xs font-medium ${colors}`}
    >
      {impact}
    </span>
  )
}
