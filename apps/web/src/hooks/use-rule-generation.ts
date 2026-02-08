'use client'

import { experimental_useObject as useObject } from 'ai/react'
import { generatedRuleSchema } from '@/lib/schemas'

export function useRuleGeneration() {
  const { object, submit, isLoading, error, stop } = useObject({
    api: '/api/generate-rule',
    schema: generatedRuleSchema,
  })

  const generate = (description: string, categoryHint?: string) => {
    submit({ description, categoryHint })
  }

  return {
    rule: object,
    generate,
    isLoading,
    error,
    stop,
  }
}
