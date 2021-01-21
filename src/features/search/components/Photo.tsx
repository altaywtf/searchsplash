import React from "react";
import { Card, Box, Image, Heading } from "theme-ui";
import { Blurhash } from "./Blurhash";
import type { SearchResultItem } from "../api/types";

type Props = {
  width: number;
  data: SearchResultItem;
};

const CARD_PADDING = 8;

export const Photo: React.FC<Props> = ({ width, data }) => (
  <Card padding={`${CARD_PADDING}px`}>
    <Box
      sx={{
        position: "relative",
        width: width - CARD_PADDING * 2,
        height: data.height * ((width - CARD_PADDING * 2) / data.width),
      }}
    >
      <Image src={data.urls.regular} />
      <Blurhash value={data.blur_hash} />
    </Box>

    <Box m={1} />

    <Heading py={2} sx={{ fontSize: 2 }}>{data.user.name}</Heading>
  </Card>
);
