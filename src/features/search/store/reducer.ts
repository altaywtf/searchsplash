import type { SearchParams, SearchResponse } from "../api/types";
import type { AppAction } from "../../../core/store";

type PaginationState = (
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ended" }
  | { status: "error"; error: Error }
) & {
  page: number;
  totalPages: number;
  totalItems: number;
};

export type SearchState =
  | { status: "idle" }
  | { status: "loading"; params: SearchParams }
  | { status: "empty"; params: SearchParams }
  | {
      status: "success";
      params: SearchParams;
      data: SearchResponse["results"];
      pagination: PaginationState;
    }
  | { status: "failure"; params: SearchParams; error: Error };

export const searchReducer = (
  state: SearchState = { status: "idle" },
  action: AppAction
): SearchState => {
  switch (action.type) {
    case "SEARCH_PHOTOS_REQUEST":
      return { status: "loading", params: action.payload };

    case "SEARCH_PHOTOS_SUCCESS":
      if (state.status !== "loading") {
        throw new Error(`Invalid action: ${action.type}`);
      }

      if (action.payload.total === 0) {
        return { ...state, status: "empty" };
      }

      return {
        ...state,
        status: "success",
        data: action.payload.results,
        pagination: {
          status: action.payload.total_pages === 1 ? "ended" : "idle",
          page: 1,
          totalPages: action.payload.total_pages,
          totalItems: action.payload.total,
        },
      };

    case "SEARCH_PHOTOS_FAILURE":
      if (state.status !== "loading") {
        throw new Error(`Invalid action: ${action.type}`);
      }

      return { ...state, status: "failure", error: action.payload };

    case "PAGINATE_RESULTS_REQUEST":
      if (state.status !== "success") {
        throw new Error(`Invalid action: ${action.type}`);
      }

      return {
        ...state,
        pagination: {
          ...state.pagination,
          status: "loading",
          page: action.payload,
        },
      };

    case "PAGINATE_RESULTS_SUCCESS":
      if (state.status !== "success") {
        throw new Error(`Invalid action: ${action.type}`);
      }

      return {
        ...state,
        data: [...state.data, ...action.payload.results],
        pagination: {
          ...state.pagination,
          totalPages: action.payload.total_pages,
          totalItems: action.payload.total,
          status:
            state.pagination.page === state.pagination.totalPages
              ? "ended"
              : "idle",
        },
      };

    case "PAGINATE_RESULTS_FAILURE":
      if (state.status !== "success") {
        throw new Error(`Invalid action: ${action.type}`);
      }

      return {
        ...state,
        pagination: {
          ...state.pagination,
          status: "error",
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
