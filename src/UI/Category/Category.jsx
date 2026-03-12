import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CategoriesSection({ categoriesArray = [] }) {
  const { t } = useTranslation();
  const showMore = true;

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 }, backgroundColor: "#f5f7fa" }}>
      {/* العنوان + زر Show More */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // عمودي على الموبايل وأفقي على الديسكتوب
          alignItems: "center",
          justifyContent: "center",
          mb: { xs: 4, md: 5 },
          position: "relative",
        }}
      >
        {/* العنوان في الوسط */}
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.6rem", md: "2.125rem" },
          }}
        >
          {t("Our Categories")}
        </Typography>

        {/* زر Show More */}
        {showMore && (
          <Box
            sx={{
              mt: { xs: 2, md: 0 }, // يضع المسافة أسفل العنوان على الموبايل
              ml: { xs: 0, md: "auto" }, // يدفع الزر لليمين على الديسكتوب
            }}
          >
            <Link
              to="/CatagoriesExtra"
              className="inline-block px-4 py-2 border rounded-md hover:bg-black hover:text-white transition-transform duration-300 hover:scale-105"
            >
              Show More
            </Link>
          </Box>
        )}
      </Box>

      {/* قائمة الكاتيجوريز */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          500: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
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
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box sx={{ p: { xs: 2, md: 3 }, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={700} mb={2} sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}>
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