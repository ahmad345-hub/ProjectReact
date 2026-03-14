import React, { useState, useMemo } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, TextField, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import useProductsOperation from "../../hooks/useProductsOperation.jsx";

export default function Shop() {
  // القيم الافتراضية تتوافق مع الـ API
  const { data: products = [], isLoading, isError, error } = useProductsOperation({
    page: 1,
    limit: 3,
    sortBy: "price",
    ascending: false
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [ascending, setAscending] = useState(false);

  // العمليات: فلترة + بحث + ترتيب
  const displayedProducts = useMemo(() => {
    let result = [...products];

    // البحث حسب الاسم
    if (searchTerm.trim() !== "") {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // الترتيب حسب السعر أو التقييم
    result.sort((a, b) => {
      if (sortBy === "price") return ascending ? a.price - b.price : b.price - a.price;
      if (sortBy === "rate") return ascending ? a.rate - b.rate : b.rate - a.rate;
      return 0;
    });

    return result;
  }, [products, searchTerm, sortBy, ascending]);

  if (isLoading) return <Typography variant="h6" textAlign="center" mt={10}>Loading products...</Typography>;
  if (isError) return <Typography variant="h6" textAlign="center" mt={10} color="error">{error?.message || "Error loading products"}</Typography>;

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h3" mb={4} textAlign="center" sx={{ fontWeight: 700, color: "#222" }}>
        Our Products
      </Typography>

      {/* البحث + ترتيب */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <TextField
          label="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ minWidth: 250, bgcolor: "#fff", borderRadius: 2 }}
        />

        <Select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          sx={{ minWidth: 120, bgcolor: "#fff", borderRadius: 2 }}
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rate">Rate</MenuItem>
        </Select>

        <Select
          value={ascending}
          onChange={e => setAscending(e.target.value === "true")}
          sx={{ minWidth: 150, bgcolor: "#fff", borderRadius: 2 }}
        >
          <MenuItem value="true">Ascending</MenuItem>
          <MenuItem value="false">Descending</MenuItem>
        </Select>
      </Box>

      {/* قائمة المنتجات */}
      <Grid container spacing={3}>
        {displayedProducts.length === 0 && (
          <Typography variant="h6" textAlign="center" mt={5} color="text.secondary">
            No products found.
          </Typography>
        )}

        {displayedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
              }}
            >
              {/* الصورة */}
              <Box
                sx={{
                  width: "100%",
                  height: 130,
                  bgcolor: "#e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={product.image || "https://via.placeholder.com/120"}
                  alt={product.name}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                  {product.name || "No Name"}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  ⭐ {product.rate || "N/A"}
                </Typography>
                <Typography color="#2e7d32" fontWeight="bold" sx={{ mt: 1 }}>
                  ${product.price || "0"}
                </Typography>
              </CardContent>

              <Box sx={{ p: 2 }}>
                <Button
                  component={Link}
                  to={`/product/${product.id}`}
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: "#111", "&:hover": { backgroundColor: "#000" }, borderRadius: 2 }}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}