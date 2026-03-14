import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useProductsByCategory from "../../hooks/useProductsByCategory.jsx";

export default function CategoryProducts() {
  const { categoryId } = useParams();

  // نستخدم products مباشرة
  const { data: products = [], isLoading, isError, error } = useProductsByCategory(categoryId);

  console.log("Fetched products:", products);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      

      {/* Main Content */}
      <Box sx={{ flex: 1, px: { xs: 2, md: 6 }, py: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Products in this Category
        </Typography>

        {isLoading && <Typography>Loading products...</Typography>}
        {isError && (
          <Typography color="error">
            {error?.response?.data?.message || "Failed to fetch products"}
          </Typography>
        )}
        {!isLoading && products.length === 0 && (
          <Typography textAlign="center">No products found in this category.</Typography>
        )}

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={product.image || "/placeholder.png"}
                  alt={product.name}
                  sx={{
                    objectFit: "contain", // يحافظ على نسبة الصورة
                    maxHeight: 150,       // أقصى ارتفاع
                    width: "100%",        // العرض كامل الكارد
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" mb={1}>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#111", "&:hover": { backgroundColor: "#000" } }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      
    </Box>
  );
}