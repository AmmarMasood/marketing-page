import { Hero, Products, Events, BlogFeed } from '@/app/components/sections';
import { getLandingPageData } from '@/lib/api/queries';

export default async function Home() {

  const { banner, products, events, blogs } = await getLandingPageData();

  return (
    <>
      <Hero banner={banner} />
      <Products products={products} />
      <Events events={events} />
      <BlogFeed blogs={blogs} />
    </>
  );
}
