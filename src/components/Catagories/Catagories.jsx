import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import usecatagories from "../../hooks/usecatagories";

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Catagory from "../../UI/Category/Category.jsx";
// صور مخصصة لكل كاتيجوري


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
      <CircularProgress sx={{ color: "#000" }} />
      <Typography variant="h6" fontWeight={600}>
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
  

 return (
  
<Catagory 
  categoriesArray={categoriesArray} 
  showMore={showMore}
/>




)};
