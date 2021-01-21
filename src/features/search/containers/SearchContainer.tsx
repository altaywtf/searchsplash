import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppState } from "../../../core/store";
import { searchPhotos, paginateResults } from "../store/actions";

export const SearchContainer: React.FC = () => {
  const dispatch = useDispatch();

  const state = useSelector<AppState, AppState["search"]>(
    (state) => state.search
  );

  const handleSearch = useCallback(
    (keyword: string) => dispatch(searchPhotos({ query: keyword })),
    [dispatch]
  );

  const handlePaginate = useCallback(
    (page: number) => dispatch(paginateResults(page)),
    [dispatch]
  );

  const renderPagination = useCallback(() => {
    if (state.status !== "success") {
      return null;
    }

    switch (state.pagination.status) {
      case "loading":
        return "loading more...";

      case "ended":
        return null;

      case "error":
        return "failed to load more";

      case "idle":
        return (
          <button onClick={() => handlePaginate(state.pagination.page + 1)}>
            load more
          </button>
        );
    }
  }, [state, handlePaginate]);

  const renderResults = useCallback(() => {
    switch (state.status) {
      case "idle":
        return null;

      case "loading":
        return "loading";

      case "empty":
        return "no result";

      case "success":
        return (
          <div>
            <div>
              {state.data.map((photo) => (
                <div key={photo.id}>{photo.blur_hash}</div>
              ))}
            </div>
            <div>{renderPagination()}</div>
          </div>
        );

      case "failure":
        return "whooooops an error occurred";
    }
  }, [state, renderPagination]);

  return (
    <div>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            keyword: { value: string };
          };
          handleSearch(target.keyword.value);
        }}
      >
        <input name="keyword" placeholder="type a keyword" />
        <button type="submit">Search</button>
      </form>

      {renderResults()}
    </div>
  );
};
