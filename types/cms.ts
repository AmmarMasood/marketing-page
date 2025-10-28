export interface ImageAsset {
  versionPath: string;
}

export interface FileAsset {
  versionPath: string;
}

export interface Image {
  fileAsset?: FileAsset;
  versionPath?: string;
}


export interface Banner {
  title: string;
  caption: string;
  image: {
    fileAsset: FileAsset;
  };
}

export interface BannerCollectionResponse {
  BannerCollection: Banner[];
}


export interface Category {
  name: string;
  inode: string;
}

export interface Product {
  title: string;
  urlMap: string;
  category: Category;
  retailPrice: number;
  image: {
    versionPath: string;
  };
}

export interface ProductCollectionResponse {
  ProductCollection: Product[];
}

export interface CalendarEvent {
  title: string;
  description: string;
  image: {
    fileAsset: FileAsset;
  };
}

export interface EventCollectionResponse {
  calendarEventCollection: CalendarEvent[];
}

export interface Blog {
  title: string;
  urlMap: string;
  teaser: string;
  image: {
    fileAsset: FileAsset;
  };
}

export interface BlogCollectionResponse {
  BlogCollection: Blog[];
}

export interface GraphQLRequestOptions {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}
