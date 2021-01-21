import type { AppThunk } from "../../../core/store";
import type { SearchResponse, SearchParams } from "../api/types";
import { api } from "../api";

const searchPhotosRequest = (params: SearchParams) =>
  ({
    type: "SEARCH_PHOTOS_REQUEST",
    payload: params,
  } as const);

const searchPhotosSuccess = (response: SearchResponse) =>
  ({
    type: "SEARCH_PHOTOS_SUCCESS",
    payload: response,
  } as const);

const searchPhotosFailure = (error: Error) =>
  ({
    type: "SEARCH_PHOTOS_FAILURE",
    payload: error,
  } as const);

export const searchPhotos = (params: SearchParams): AppThunk => async (
  dispatch
) => {
  dispatch(searchPhotosRequest(params));

  try {
    const { data } = await api.search(params);
    dispatch(searchPhotosSuccess(data));
  } catch (error) {
    dispatch(searchPhotosFailure(error));
  }
};

type SearchPhotosAction =
  | ReturnType<typeof searchPhotosRequest>
  | ReturnType<typeof searchPhotosSuccess>
  | ReturnType<typeof searchPhotosFailure>;

const paginateResultsRequest = (page: number) =>
  ({
    type: "PAGINATE_RESULTS_REQUEST",
    payload: page,
  } as const);

const paginateResultsSuccess = (response: SearchResponse) =>
  ({
    type: "PAGINATE_RESULTS_SUCCESS",
    payload: response,
  } as const);

const paginateResultsFailure = (error: Error) =>
  ({
    type: "PAGINATE_RESULTS_FAILURE",
    payload: error,
  } as const);

export const paginateResults = (page: number): AppThunk => async (
  dispatch,
  getState
) => {
  const state = getState().search;

  if (state.status !== "success") {
    throw new Error(`Invalid call to pagination.`);
  }

  dispatch(paginateResultsRequest(page));

  try {
    const { data } = await api.search({ ...state.params, page });
    dispatch(paginateResultsSuccess(data));
  } catch (error) {
    dispatch(paginateResultsFailure(error));
  }
};

type PaginateResultsAction =
  | ReturnType<typeof paginateResultsRequest>
  | ReturnType<typeof paginateResultsSuccess>
  | ReturnType<typeof paginateResultsFailure>;

export type SearchAction = SearchPhotosAction | PaginateResultsAction;
