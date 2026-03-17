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
        pt: { xs: 8, md: 10 },
        pb: 8,
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h4" fontWeight="bold" mb={2}>
          We believe in sustainable decor.
        </Typography>

        <Typography color="text.secondary" mb={8} maxWidth={600}>
          We’re passionate about life at home. Our features timeless furniture,
          natural fabrics and elegant design.
        </Typography>

        {/* About Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "center",
            mb: 12,
          }}
        >
          {/* Image */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
              sx={{
                width: "100%",
                height: 360,
                objectFit: "cover",
                borderRadius: 3,
              }}
            />
          </Box>

          {/* About */}
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 5, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                About Us
              </Typography>

              <Typography color="text.secondary" mb={3}>
                3legant is a gift & decoration store focused on modern lifestyle
                and comfort with high quality products.
              </Typography>

              <Button variant="text">Shop Now →</Button>
            </Paper>
          </Box>
        </Box>

        {/* Contact Title */}
        <Typography variant="h5" textAlign="center" mb={5}>
          Contact Us
        </Typography>

        {/* Contact Boxes with bigger spacing */}
        <Grid container spacing={25} mb={10}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
              <Typography color="text.secondary">ADDRESS</Typography>
              <Typography fontWeight="bold">234 Hai Trieu, HCMC</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
              <Typography color="text.secondary">CONTACT</Typography>
              <Typography fontWeight="bold">+84 234 567 890</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
              <Typography color="text.secondary">EMAIL</Typography>
              <Typography fontWeight="bold">hello@3legant.com</Typography>
            </Paper>
          </Grid>
        </Grid>

<Grid
  container
  spacing={6}
  sx={{ alignItems: "stretch", justifyContent: "center" }} // منتصف الصفحة
>
  {/* Form */}
  <Grid item xs={12} md={6}>
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{ height: "100%" }}
    >
      <TextField
        label="Your Name"
        fullWidth
        sx={{ flex: 1 }}
      />
      <TextField
        label="Email Address"
        fullWidth
        sx={{ flex: 1 }}
      />
      <TextField
        label="Subject"
        fullWidth
        sx={{ flex: 1 }}
      />
      <TextField
        multiline
        rows={4}
        label="Message"
        fullWidth
        sx={{ flex: 2 }}
      />

      <Button
        variant="contained"
        sx={{ width: "fit-content", px: 5, mt: "auto" }}
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
        height: "100%",
        minHeight: 400,
        border: 0,
        borderRadius: 3,
      }}
    />
  </Grid>
</Grid>

        {/* Bottom Features */}
        <Grid container spacing={23} mt={12}>
          {["Free Shipping", "Money-back", "Secure Payments", "24/7 Support"].map(
            (item, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box textAlign="center">
                  <Typography fontWeight="bold">{item}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available for all orders
                  </Typography>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </Box>
  );
}