import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className, href }: CardProps) {
  const baseStyles =
    'group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100';

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, 'block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2', className)}
      >
        {children}
      </Link>
    );
  }

  return <div className={cn(baseStyles, className)}>{children}</div>;
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className }: CardImageProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-gray-100 aspect-video',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-3', className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function CardTitle({
  children,
  as: Component = 'h3',
  className,
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        'text-lg font-bold text-text-dark line-clamp-2 group-hover:text-primary transition-colors',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
  lines?: number;
}

export function CardDescription({
  children,
  className,
  lines = 3,
}: CardDescriptionProps) {
  return (
    <p
      className={cn(
        'text-sm text-text-gray',
        lines === 2 && 'line-clamp-2',
        lines === 3 && 'line-clamp-3',
        lines === 4 && 'line-clamp-4',
        className
      )}
    >
      {children}
    </p>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('mt-4 flex items-center justify-between', className)}>
      {children}
    </div>
  );
}
