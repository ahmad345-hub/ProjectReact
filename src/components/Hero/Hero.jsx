import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import heroImg from "../../assets/Image Placeholder.png";

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: {
          xs: "contain", // بالموبايل ما يقص الصورة
          md: "cover",   // بالديسكتوب cover
        },
        backgroundPosition: {
          xs: "center top",   // بالموبايل متمركزة أعلى
          md: "left center",  // بالديسكتوب عاليسار
        },
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f5f5f5", // لون احتياطي لو صار فراغ
        display: "flex",
        alignItems: "center",
        justifyContent: {
          xs: "center",   // بالموبايل النص بالنص
          md: "flex-end", // بالديسكتوب النص عاليمين
        },
        textAlign: {
          xs: "center",
          md: "left",
        },
        px: { xs: 3, sm: 5, md: 10 },
        boxSizing: "border-box",
        flexDirection: {
          xs: "column",   // بالموبايل النص تحت الصورة
          md: "row",      // بالديسكتوب جنب الصورة
        },
        pt: { xs: 8, md: 0 }, // مساحة فوق النص بالموبايل
      }}
    >
      {/* النص */}
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: 500 },
          color: "#111",
          mt: { xs: 4, md: 0 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            lineHeight: 1.2,
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },
          }}
        >
          Discover the power of{" "}
          <Box component="span" sx={{ color: "#ffb703" }}>
            KASHOP
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: {
              xs: 16,
              sm: 18,
            },
          }}
        >
          Shop smarter. Find premium products with a smooth and modern
          shopping experience.
        </Typography>

        <Button
          component={Link}
          to="/shop"
          variant="contained"
          sx={{
            mt: 4,
            px: { xs: 3, sm: 4 },
            py: 1.4,
            backgroundColor: "#111",
            color: "#fff",
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
