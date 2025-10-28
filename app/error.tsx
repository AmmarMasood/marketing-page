'use client';

import { useEffect } from 'react';
import { Container, Button } from '@/app/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Container>
        <div className="max-w-md mx-auto text-center py-12">
          <h1 className="section-heading mb-4">
            Oops! Something went wrong
          </h1>
          <p className="section-description mb-8">
            We encountered an unexpected error. Don&apos;t worry, our team has been notified
            and we&apos;re working on it.
          </p>


          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} variant="primary">
              Try again
            </Button>
            <Button onClick={() => (window.location.href = '/')} variant="secondary">
              Go home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
