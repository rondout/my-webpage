import { Box, Skeleton } from "@mui/material";
import { PropsWithChildren } from "react";

export interface MatSkeletonProps {
  size?: number;
  height?: number;
  loading?: boolean;
}

export default function MatSkeleton(
  props: PropsWithChildren<MatSkeletonProps>
) {
  const { loading = true, size = 8, height = 32, children } = props;

  return (
    <Box>
      {loading && (
        <Box sx={{ p: 2 }}>
          {Array.from({ length: size }).map((_, index) => {
            return (
              <Skeleton
                key={index}
                variant="text"
                sx={{ width: index % 2 === 0 ? 1 : 0.9, height }}
              />
            );
          })}
        </Box>
      )}
      {!loading && children}
    </Box>
  );
}
