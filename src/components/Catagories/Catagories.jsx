import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import usecatagories from "../../hooks/usecatagories";
import Catagory from "../../UI/Category/Category.jsx";
import { useTranslation } from "react-i18next";

export default function Categories({ showMore = false }) {
  const { t } = useTranslation();
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
          {t("Loading Categories")}
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
          {t("Server went wrong")}
        </Typography>
      </Box>
    );

  const categoriesArray = data?.response.data || [];

  return <Catagory categoriesArray={categoriesArray} showMore={showMore} />;
}