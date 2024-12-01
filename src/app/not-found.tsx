'use client';

import Error from 'next/error';

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>Page not found - 404</title>
        <meta name="description" content="Sorry, the page you are looking for does not exist." />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
      <div>
        <Error statusCode={404} />
      </div>
      </body>
    </html>
  );
}

