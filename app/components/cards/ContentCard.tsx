import {
  Card,
  CardImage,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
} from '@/app/components/ui';
import { getImageUrl, extractImagePath } from '@/lib/api/graphql';
import type { Blog, CalendarEvent } from '@/types';

interface ContentCardProps {
  content: Blog | CalendarEvent;
  type: 'blog' | 'event';
}

export function ContentCard({ content, type }: ContentCardProps) {
  const imageUrl = getImageUrl(extractImagePath(content.image));

  const isBlog = type === 'blog';
  const badgeText = isBlog ? 'Blog Post' : 'Event';
  const description = isBlog ? (content as Blog).teaser : (content as CalendarEvent).description;
  const href = isBlog ? (content as Blog).urlMap || '#' : undefined;

  return (
    <Card href={href}>
      <CardImage
        src={imageUrl}
        alt={content.title}
      />
      <CardContent>
        <CardHeader>
          <Badge variant="primary" className="mb-2">
            {badgeText}
          </Badge>
        </CardHeader>
        <CardTitle>{content.title}</CardTitle>
        {description && (
          <CardDescription lines={3}>
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
