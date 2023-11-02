'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  console.log("Who is this=?");
  return (
    <div>
      <h2>Something went wrong! {error}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
