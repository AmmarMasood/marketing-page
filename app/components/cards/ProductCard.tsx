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
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getImageUrl(extractImagePath(product.image));

  return (
    <Card href={product.urlMap || '#'}>
      <CardImage
        src={imageUrl}
        alt={product.title}
      />
      <CardContent>
        <CardHeader>
          {product.category?.name && (
            <Badge variant="primary" className="mb-2">
              {product.category.name}
            </Badge>
          )}
        </CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription lines={2}>
          {product.retailPrice
            ? `Starting from $${product.retailPrice}`
            : 'Pricing available upon request'}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
