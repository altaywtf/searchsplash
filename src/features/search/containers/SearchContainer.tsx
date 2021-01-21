import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppState } from "../../../core/store";
import { searchPhotos, paginateResults } from "../store/actions";
import { Flex, Box, Button } from "rebass";
import { Label, Input } from "@rebass/forms";
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
        return "loading more...";

      case "ended":
        return null;

      case "error":
        return "failed to load more";

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
        return "loading";

      case "empty":
        return "no result";

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
        return "whooooops an error occurred";
    }
  }, [state, renderPagination]);

  return (
    <Box width={CONTAINER_WIDTH} my={4} mx="auto">
      <form onSubmit={handleSearch}>
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Box flex={1}>
            <Label htmlFor="keyword">Keyword</Label>

            <Input
              id="keyword"
              name="keyword"
              placeholder="Type a keyword: Berlin"
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
