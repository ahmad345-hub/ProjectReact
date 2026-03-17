import React from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/use Products";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="error">
          {t("Error loading products")}
        </Alert>
      </Container>
    );
  }

  const products = data?.response?.data || [];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" align="center" mb={6}>
        {t("Our Products")}
      </Typography>

      <Grid container spacing={4} justifyContent="space-between">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              component={Link}
              to={`/product/${product.id}`}
              sx={{
                textDecoration: "none",
                borderRadius: 3,
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  height: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.default",
                  p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x300?text=No+Image")
                  }
                />
              </Box>

              <CardContent>
                <Typography variant="h6" fontWeight={600} noWrap gutterBottom>
                  {product.name || t("No Name")}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  ⭐ {product.rate}
                </Typography>

                <Typography variant="h6" color="success.main" fontWeight="bold" mt={1}>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}