import React from "react";
import { Box, Image } from "rebass";
import { Blurhash } from "./Blurhash";
import type { SearchResultItem } from "../api/types";

type Props = {
  width: number
  data: SearchResultItem;
};

export const Photo: React.FC<Props> = ({ width, data }) => (
  <Box
    sx={{ position: "relative", overflow: "hidden" }}
    width={width}
    height={data.height * (width / data.width)}
  >
    <Image src={data.urls.regular} />
    <Blurhash value={data.blur_hash} />
  </Box>
);
