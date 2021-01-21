import axios from "axios";
import type { SearchParams, SearchResponse } from "./types";

const API_BASE_URL = "https://api.unsplash.com";
const API_SEARCH_PATH = "/search/photos";
const API_CLIENT_ID = "H9-H-SPbnnu8KuqD1qqZdCczvDwHwhyxtc8Yx13wXcg";

export const api = {
  search: (params: SearchParams) =>
    axios.get<SearchResponse>(`${API_BASE_URL}/${API_SEARCH_PATH}`, {
      params: {
        ...params,
        client_id: API_CLIENT_ID,
      },
    }),
};
