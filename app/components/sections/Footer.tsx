import { Container } from '@/app/components/ui';
import { FOOTER_LINKS } from '@/lib/constants';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-dark text-white">
      <Container>
      
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4 md:py-16">

          <div>
            <h3 className="mb-4 text-2xl font-bold">Logo</h3>
           
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase">
              Catalog
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.catalog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase ">
              Services
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase">
              About
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

       
        <div className="border-t border-secondary-light py-6">
          <p className="text-center text-sm text-white/60">
            &copy; {currentYear} Marketing Page. Powered by dotCMS ❤️
          </p>
        </div>
      </Container>
    </footer>
  );
}
