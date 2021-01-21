type URL = string;
type OrderBy = "latest" | "relevant";
type Orientation = "landscape" | "portrait" | "squarish";
type ContentFilter = "low" | "high";
type Color =
  | "black_and_white"
  | "black"
  | "white"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "magenta"
  | "green"
  | "teal"
  | "blue";

export type SearchParams = {
  query: string;
  page?: number;
  per_page?: number;
  order_by?: OrderBy;
  collections?: string;
  content_filter?: ContentFilter;
  color?: Color;
  orientation?: Orientation;
};

// some values are omitted, check API docs for all of them
export type SearchResultItem = {
  id: string;
  blur_hash: string;
  likes: number;
  description: string;
  user: {
    id: string;
    username: string;
    name: string;
    profile_image: {
      small: URL;
      medium: URL;
      search: URL;
    };
  };
  urls: {
    raw: URL;
    full: URL;
    regular: URL;
    small: URL;
    thumb: URL;
  };
};

export type SearchResponse = {
  total: number;
  total_pages: number;
  results: SearchResultItem[];
};
