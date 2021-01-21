import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppState } from "../../../core/store";
import { searchPhotos, paginateResults } from "../store/actions";
import { Flex, Box, Button, Heading, Input } from "theme-ui";
import { Photo } from "../components/Photo";

const CONTAINER_WIDTH = 640;

export const SearchContainer: React.FC = () => {
  const dispatch = useDispatch();

  const state = useSelector<AppState, AppState["search"]>(
    (state) => state.search
  );

  const handleSearch = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        keyword: { value: string };
      };

      dispatch(searchPhotos({ query: target.keyword.value }));
    },
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
        return "Loading more...";

      case "ended":
        return null;

      case "error":
        return `Failed to load more: ${state.pagination.error.message}`;

      case "idle":
        return (
          <Button variant="secondary" onClick={() => handlePaginate(state.pagination.page + 1)}>
            Load More
          </Button>
        );
    }
  }, [state, handlePaginate]);

  const renderResults = useCallback(() => {
    switch (state.status) {
      case "idle":
        return null;

      case "loading":
        return "Loading";

      case "empty":
        return "No result";

      case "success":
        return (
          <Box marginY={4}>
            {state.data.map((photo) => (
              <Box key={photo.id} marginBottom={4}>
                <Photo width={CONTAINER_WIDTH} data={photo} />
              </Box>
            ))}

            <>{renderPagination()}</>
          </Box>
        );

      case "failure":
        return `Whooooops an error occurred: ${state.error.message}`;
    }
  }, [state, renderPagination]);

  return (
    <Box my={4} mx="auto" sx={{ width: CONTAINER_WIDTH }}>
      <Heading my={4}>
        📸 SearchSplash
      </Heading>

      <form onSubmit={handleSearch}>
        <Flex>
          <Box sx={{ flex: '1 1 auto' }}>
            <Input
              id="keyword"
              name="keyword"
              placeholder="Search free-high resolution photos"
              autoFocus
            />
          </Box>

          <Box mx={1} />

          <Box>
            <Button
              variant="primary"
              mr={2}
              type="submit"
              disabled={state.status === "loading"}
            >
              Search
            </Button>
          </Box>
        </Flex>
      </form>

      <Box my={2} />

      <Box style={{ textAlign: "center" }}>{renderResults()}</Box>
    </Box>
  );
};
