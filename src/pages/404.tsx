'use client'

import { Providers } from "src/redux/provider";


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  console.log("This a regular 404");
  return (
    <div>
      <Providers>
        <h2>Something went wrong! {error}</h2>
        <button onClick={() => reset()}>Try again</button>
      </Providers>
    </div>
  )
}
