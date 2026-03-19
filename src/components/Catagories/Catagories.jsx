import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import usecatagories from "../../hooks/usecatagories";
import Catagory from "../../UI/Category/Category.jsx";

export default function Categories({ showMore = false }) {
  const { data, isLoading, isError } = usecatagories();

  if (isLoading)
    return (
      <Box
        sx={{
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Loading Categories...
        </Typography>
      </Box>
    );

  if (isError)
    return (
      <Box
        sx={{
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} color="error">
          Server went wrong
        </Typography>
      </Box>
    );

  const categoriesArray = data?.response.data || [];

  return <Catagory categoriesArray={categoriesArray} showMore={showMore} />;
}