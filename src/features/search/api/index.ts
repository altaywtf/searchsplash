import axios from "axios";
import type { SearchParams, SearchResponse } from "./types";

const API_BASE_URL = "https://api.unsplash.com";
const API_SEARCH_PATH = "/search/photos";

export const api = {
  search: (params: SearchParams) =>
    axios.get<SearchResponse>(`${API_BASE_URL}/${API_SEARCH_PATH}`, {
      params,
    }),
};
