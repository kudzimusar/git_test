export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">LinkedIn Job Copilot</h1>
      <p className="mt-2 text-gray-600">Paste a LinkedIn job URL or job description to begin.</p>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job URL</label>
          <input
            type="url"
            placeholder="https://www.linkedin.com/jobs/view/..."
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Or paste Job Description</label>
          <textarea
            rows={8}
            placeholder="Paste the job description..."
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <input id="agree" type="checkbox" className="h-4 w-4" />
          <label htmlFor="agree" className="text-sm text-gray-700">
            I confirm I have the right to paste this information and request processing.
          </label>
        </div>
        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Generate
        </button>
      </form>
    </main>
  );
}

