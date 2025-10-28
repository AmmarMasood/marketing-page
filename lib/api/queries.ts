import { graphqlRequest } from './graphql';
import { CACHE_REVALIDATION } from '@/lib/constants';
import type {
  BannerCollectionResponse,
  ProductCollectionResponse,
  EventCollectionResponse,
  BlogCollectionResponse,
  Banner,
  Product,
  CalendarEvent,
  Blog,
} from '@/types';


const BANNER_QUERY = `
  query ContentAPI {
    BannerCollection(query: "", limit: 1, offset: 0, sortBy: "score") {
      title
      caption
      image {
        fileAsset {
          versionPath
        }
      }
    }
  }
`;


const PRODUCTS_QUERY = `
  query ContentAPI {
    ProductCollection(query: "+title:snow", limit: 3, offset: 0, sortBy: "score") {
      title
      urlMap
      category {
        name
        inode
      }
      retailPrice
      image {
        versionPath
      }
    }
  }
`;


const EVENTS_QUERY = `
  query ContentAPI {
    calendarEventCollection(query: "", limit: 3, offset: 0, sortBy: "score") {
      title
      description
      image {
        fileAsset {
          versionPath
        }
      }
    }
  }
`;


const BLOGS_QUERY = `
  query ContentAPI {
    BlogCollection(query: "+tags:(snowboarding OR surfing)", limit: 3, offset: 0, sortBy: "score") {
      title
      urlMap
      teaser
      image {
        fileAsset {
          versionPath
        }
      }
    }
  }
`;


export async function getBanner(): Promise<Banner | null> {
  try {
    const data = await graphqlRequest<BannerCollectionResponse>({
      query: BANNER_QUERY,
      revalidate: CACHE_REVALIDATION.BANNER,
      tags: ['banner'],
    });

    return data.BannerCollection[0] || null;
  } catch (error) {
    console.error('Failed to fetch banner:', error);
    return null;
  }
}


export async function getProducts(): Promise<Product[]> {
  try {
    const data = await graphqlRequest<ProductCollectionResponse>({
      query: PRODUCTS_QUERY,
      revalidate: CACHE_REVALIDATION.PRODUCTS,
      tags: ['products'],
    });

    return data.ProductCollection || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}


export async function getEvents(): Promise<CalendarEvent[]> {
  try {
    const data = await graphqlRequest<EventCollectionResponse>({
      query: EVENTS_QUERY,
      revalidate: CACHE_REVALIDATION.EVENTS,
      tags: ['events'],
    });

    return data.calendarEventCollection || [];
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}


export async function getBlogs(): Promise<Blog[]> {
  try {
    const data = await graphqlRequest<BlogCollectionResponse>({
      query: BLOGS_QUERY,
      revalidate: CACHE_REVALIDATION.BLOGS,
      tags: ['blogs'],
    });

    return data.BlogCollection || [];
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return [];
  }
}

export async function getLandingPageData() {
  const [banner, products, events, blogs] = await Promise.all([
    getBanner(),
    getProducts(),
    getEvents(),
    getBlogs(),
  ]);

  return {
    banner,
    products,
    events,
    blogs,
  };
}
