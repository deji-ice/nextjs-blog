import { Analytics } from '@vercel/analytics/react';
export default function Head() {
  return (
    <>
      <title>The curiosity chronicles </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Expand your mind and broaden your horizons with our captivating chronicles of curiosity" />
      <link rel="icon" href="/LOGO.png" />
      <Analytics />
    </>
  )
}
