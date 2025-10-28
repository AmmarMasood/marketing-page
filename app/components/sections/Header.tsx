import { Container } from "@/app/components/ui";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-secondary-light">
      <Container>
        <div className="flex h-24 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-secondary hover:text-primary transition-colors focus-visible:outline-none "
            >
              Logo
            </Link>
          </div>

          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm font-lg text-secondary hover:text-primary transition-colors focus-visible:outline-none px-2 py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" aria-label="Facebook">
              <Image
                alt="Facebook"
                src="/icons/facebook.svg"
                width={20}
                height={20}
              />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Image
                alt="Twitter"
                src="/icons/twitter.svg"
                width={20}
                height={20}
              />
            </Link>
            <Link href="#" aria-label="Gmail">
              <Image
                alt="Gmail"
                src="/icons/gmail.svg"
                width={20}
                height={20}
              />
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden "
            aria-label="Open menu"
          >
            <Image
              alt="Menu"
              src="/icons/menu-svgrepo-com.svg"
              width={24}
              height={24}
            />
          </button>
        </div>
      </Container>
    </header>
  );
}
