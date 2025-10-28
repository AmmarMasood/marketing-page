import Link from "next/link";
import { Container } from "@/app/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Container>
        <div className="max-w-md mx-auto text-center py-12">
          <h1 className="section-heading mb-4">404- Page Not Found</h1>
          <p className="section-description mb-8">
            CCouldn&apos;t find the page you&apos;re looking for.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="text-sm text-primary hover:underline"
            >
              Go Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
