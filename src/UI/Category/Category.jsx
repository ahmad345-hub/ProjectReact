import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CategoriesSection({ categoriesArray = [] }) {
  const { t } = useTranslation();
  const theme = useTheme(); // نستخدم ثيم MUI

  const showMore = true;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 6 },
        backgroundColor: "background.default", // الخلفية تتغير حسب الثيم
      }}
    >
      {/* العنوان + زر Show More */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
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
            color: "text.primary", // النص يتغير حسب الثيم
          }}
        >
          {t("Our Categories")}
        </Typography>

        {/* زر Show More */}
        {showMore && (
          <Box
            sx={{
              mt: { xs: 2, md: 0 },
              ml: { xs: 0, md: "auto" },
            }}
          >
            <Link
              to="/CatagoriesExtra"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.palette.action.hover;
                e.currentTarget.style.color = theme.palette.text.primary;
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = theme.palette.text.primary;
                e.currentTarget.style.transform = "scale(1)";
              }}
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
                backgroundColor: "background.paper", // خلفية الكارد تتغير حسب الثيم
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: theme.shadows[2],
                transition: "0.4s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[5],
                },
              }}
            >
              <Box sx={{ p: { xs: 2, md: 3 }, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={2}
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    color: "text.primary", // النص يتغير حسب الثيم
                  }}
                >
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