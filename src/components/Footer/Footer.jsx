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
    <Box sx={{ bgcolor: "#000", color: "#fff", pt: 6, pb: 3 }}>
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
                <Typography variant="body2" sx={{ mt: 2, color: "grey.400" }}>
                  43111 Hai Trieu street.<br />
                  District 1, HCMC<br />
                  Vietnam
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "grey.400" }}>
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
                    sx={{ mt: 1, color: "grey.400", cursor: "pointer" }}
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
                    sx={{ mt: 1, color: "grey.400", cursor: "pointer" }}
                  >
                    {item}
                  </Typography>
                ))}
              </Grid>

            </Grid>
          </Grid>

          {/* Column 4 */}
          <Grid
  item
  xs={12}
  md={4}
  sx={{
    ml: { md: 23 } // ⬅️ هون الإبعاد
  }}
>
            <Typography fontWeight="bold">
              Join Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "grey.400" }}>
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
                    bgcolor: "#111",
                    color: "#fff",
                    "& fieldset": { borderColor: "#333" }
                  }
                }}
              />
              <IconButton sx={{ bgcolor: "#fff", ml: 1 }}>
                <ArrowForwardIcon sx={{ color: "#000" }} />
              </IconButton>
            </Box>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: "#333" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "grey.500" }}
        >
          © 2023 3legant. All rights reserved | Privacy Policy | Terms & Conditions
        </Typography>

      </Container>
    </Box>
  );
}