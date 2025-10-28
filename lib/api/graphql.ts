
import { DOTCMS_API_URL, DOTCMS_BASE_URL } from '@/lib/constants';
import type { GraphQLRequestOptions, GraphQLResponse } from '@/types';



export async function graphqlRequest<T>(
  options: GraphQLRequestOptions
): Promise<T> {
  const { query, variables, cache, revalidate, tags } = options;

  // console.log('🔵 GraphQL Request:', {
  //   url: DOTCMS_API_URL,
  //   variables,
  //   cache,
  //   revalidate,
  //   tags,
  // });

  try {
    const response = await fetch(DOTCMS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache,
      next: {
        revalidate,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(
        `GraphQL request failed: ${response.status} ${response.statusText}`
      );
    }

    const json: GraphQLResponse<T> = await response.json();

    if (json.errors && json.errors.length > 0) {
      const errorMessages = json.errors.map((e) => e.message).join(', ');
      throw new Error(`GraphQL errors: ${errorMessages}`);
    }

    // Log successful response
    // console.log('✅ GraphQL Response:', json.data);

    return json.data;
  } catch (error) {
    // console.error('❌ GraphQL request error:', error);
    throw error;
  }
}

export function getImageUrl(path: string | undefined): string {
  if (!path) {
    return '/images/placeholder-hero.png';
  }


  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${DOTCMS_BASE_URL}${normalizedPath}`;
}


export function extractImagePath(
  image: { fileAsset?: { versionPath: string }; versionPath?: string } | undefined
): string {
  if (!image) return '';

  if (image.fileAsset?.versionPath) {
    return image.fileAsset.versionPath;
  }


  if (image.versionPath) {
    return image.versionPath;
  }

  return '';
}
