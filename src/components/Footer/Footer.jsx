import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Divider
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container>

          {/* أول 3 أعمدة */}
          <Grid item xs={12} md={8}>
            <Grid container columnSpacing={6}>
              {/* Column 1 */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="bold">
                  3legant.
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                  43111 Hai Trieu street.<br />
                  District 1, HCMC<br />
                  Vietnam
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                  84-756-3237
                </Typography>
              </Grid>

              {/* Column 2 */}
              <Grid item xs={6} md={3}>
                <Typography fontWeight="bold">Page</Typography>
                {["Home", "Shop", "Product", "Articles", "Contact Us"].map(item => (
                  <Typography
                    key={item}
                    variant="body2"
                    sx={{ mt: 1, color: "text.secondary", cursor: "pointer" }}
                  >
                    {item}
                  </Typography>
                ))}
              </Grid>

              {/* Column 3 */}
              <Grid item xs={6} md={3}>
                <Typography fontWeight="bold">Info</Typography>
                {["Shipping Policy", "Return & Refund", "Support", "FAQs"].map(item => (
                  <Typography
                    key={item}
                    variant="body2"
                    sx={{ mt: 1, color: "text.secondary", cursor: "pointer" }}
                  >
                    {item}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Column 4 */}
          <Grid item xs={12} md={4} sx={{ ml: { md: 23 } }}>
            <Typography fontWeight="bold">Join Newsletter</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Subscribe our newsletter to get more deals, new products and promotions
            </Typography>

            <Box sx={{ display: "flex", mt: 2 }}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  sx: {
                    bgcolor: "background.paper",
                    color: "text.primary",
                    "& fieldset": { borderColor: "divider" }
                  }
                }}
              />
              <IconButton sx={{ bgcolor: "text.primary", ml: 1, "&:hover": { bgcolor: "text.secondary" } }}>
                <ArrowForwardIcon sx={{ color: "background.paper" }} />
              </IconButton>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: "divider" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.secondary" }}
        >
          © 2023 3legant. All rights reserved | Privacy Policy | Terms & Conditions
        </Typography>
      </Container>
    </Box>
  );
}