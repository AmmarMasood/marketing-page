import Image from 'next/image';
import { Container, Button } from '@/app/components/ui';
import { getImageUrl, extractImagePath } from '@/lib/api/graphql';
import type { Banner } from '@/types';

interface HeroProps {
  banner: Banner | null;
}

export function Hero({ banner }: HeroProps) {
  const title = banner?.title || '';
  const caption = banner?.caption || '';
  const imageUrl = getImageUrl(extractImagePath(banner?.image));

 
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          unoptimized //because dotcms not returning optimized images
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
       

      </div>
       <div className="absolute inset-0 bg-black/70" />
      <Container className="relative z-10 h-full">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <h1 className="mb-4 max-w-4xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
            {caption}
          </p>

          <Button size="lg" variant="primary">
            Start Now
          </Button>
        </div>
      </Container>
    </section>
  );
}
