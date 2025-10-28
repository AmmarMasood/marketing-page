import { Container } from '@/app/components/ui';
import { ContentCard } from '@/app/components/cards';
import type { Blog } from '@/types';

interface BlogFeedProps {
  blogs: Blog[];
}

export function BlogFeed({ blogs }: BlogFeedProps) {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>

        <div className="mb-12 text-center">
          <p className="section-label">
            Our Blogs
          </p>
          <h2 className="section-heading">
            Our Recent News
          </h2>
          <p className="section-description">
            There are many variations of passages of Lorem Ipsum available
but the majority have suffered alteration in some form.
          </p>
        </div>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {blogs.map((blog) => (
            <ContentCard key={blog.urlMap || blog.title} content={blog} type="blog" />
          ))}
        </div>
      </Container>
    </section>
  );
}
