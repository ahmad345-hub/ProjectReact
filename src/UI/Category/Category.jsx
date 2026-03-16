import { useNavigate, Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";

export default function CategoriesSection({ categoriesArray = [] }) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const showMore = true;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 6 },
        backgroundColor: "background.default",
      }}
    >
      {/* العنوان + الزر */}
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
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.6rem", md: "2.125rem" },
            color: "text.primary",
          }}
        >
          {t("Our Categories")}
        </Typography>

        {showMore && (
          <Box
            sx={{
              mt: { xs: 2, md: 0 },
              marginInlineStart: { xs: 0, md: "auto" }, // 🟢 الحل هنا
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
                e.currentTarget.style.backgroundColor =
                  theme.palette.action.hover;
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {t("Show More")}
            </Link>
          </Box>
        )}
      </Box>

      {/* الكاتيجوريز */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
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
              onClick={() => navigate(`/category/${cat.id}`)}
              sx={{
                backgroundColor: "background.paper",
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
              <Box
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={2}
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    color: "text.primary",
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