import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

export default function AboutContact() {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 10 }, // عشان الناف بار
        pb: 6,
        backgroundColor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section */}
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ fontSize: { xs: "24px", md: "32px" } }}
        >
          We believe in sustainable decor.
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          mb={5}
          sx={{ maxWidth: 700 }}
        >
          We’re passionate about life at home. Our features timeless furniture,
          with natural fabrics, curved lines, plenty of mirrors and classic
          design.
        </Typography>

        {/* About Section */}
        <Grid container spacing={4} mb={8}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
              alt="about"
              sx={{
                width: "100%",
                borderRadius: 3,
                height: { xs: 250, md: 350 },
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                About Us
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={2}>
                3legant is a gift & decorations store based in HCMC. We provide
                modern products with high quality and comfort.
              </Typography>

              <Button
                variant="text"
                sx={{ width: "fit-content", mt: 1 }}
              >
                Shop Now →
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Contact Section */}
        <Typography variant="h5" fontWeight="bold" mb={4} textAlign="center">
          Contact Us
        </Typography>

        {/* Info Boxes */}
        <Grid container spacing={3} mb={6}>
          {[
            { title: "ADDRESS", desc: "234 Hai Trieu, Ho Chi Minh City" },
            { title: "CONTACT US", desc: "+84 234 567 890" },
            { title: "EMAIL", desc: "hello@3legant.com" },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>
                <Typography fontWeight="bold">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Form + Map */}
        <Grid container spacing={4}>
          {/* Form */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Your Name" fullWidth />
              <TextField label="Email Address" fullWidth />
              <TextField label="Your Email" fullWidth />
              <TextField
                label="Your Message"
                multiline
                rows={4}
                fullWidth
              />

              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Map */}
          <Grid item xs={12} md={6}>
            <Box
              component="iframe"
              src="https://maps.google.com/maps?q=hebron&t=&z=13&ie=UTF8&iwloc=&output=embed"
              sx={{
                width: "100%",
                height: { xs: 300, md: "100%" },
                border: 0,
                borderRadius: 3,
              }}
            />
          </Grid>
        </Grid>

        {/* Bottom Features */}
        <Grid container spacing={3} mt={8}>
          {[
            "Free Shipping",
            "Money-back",
            "Secure Payments",
            "24/7 Support",
          ].map((text, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Box textAlign="center">
                <Typography fontWeight="bold">{text}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Available for all orders
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}