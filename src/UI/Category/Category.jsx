import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CategoriesSection({ categoriesArray = [] }) {
  const { t } = useTranslation();
  const showMore = true; // الزر سيكون دائمًا على اليمين

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, backgroundColor: "#f5f7fa" }}>
      {/* العنوان + زر Show More */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
          position: "relative", // يسمح بوضع الزر على اليمين
        }}
      >
        {/* العنوان في الوسط */}
        <Typography variant="h4" fontWeight={800} sx={{ textAlign: "center" }}>
          {t("Our Categories")}
        </Typography>

        {/* الزر على اليمين */}
        {showMore && (
          <Link
            to="/CatagoriesExtra"
            className="inline-block px-4 py-2 border rounded-md hover:bg-black hover:text-white transition-transform duration-300 hover:scale-110"
            style={{ position: "absolute", right: 0 }}
          >
            Show More
          </Link>
        )}
      </Box>

      {/* قائمة الكاتيجوريز */}
      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        loop={true}
        breakpoints={{
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {categoriesArray.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                transition: "0.4s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  {cat.name}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}