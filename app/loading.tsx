import { Container } from '@/app/components/ui';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-96 bg-gray-200 animate-pulse" />
      <Container>
        {[1, 2, 3].map((section) => (
          <div key={section} className="py-16">
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
