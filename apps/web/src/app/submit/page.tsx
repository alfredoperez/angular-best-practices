import { SubmitForm } from '@/components/submit-form'

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <div>
        <h1 className="text-lg font-medium text-text">Submit a Rule</h1>
        <p className="text-sm text-text-muted mt-1">
          Describe an Angular best practice and submit it as a GitHub issue for
          review.
        </p>
      </div>

      <SubmitForm />
    </div>
  )
}
