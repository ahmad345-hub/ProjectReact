import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import useProductsOperation from "../../hooks/useProductsOperation.jsx";
import useAddReview from "../../hooks/useAddReview.jsx";

function ProductCard({ product }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const addReview = useAddReview(product.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;

    addReview.mutate(
      { rating, comment },
      {
        onSuccess: () => {
          setReviews((prev) => [
            ...prev,
            { id: Date.now(), rating, comment },
          ]);
          setComment("");
          setRating(5);
        },
      }
    );
  };

  return (
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
      <Box
        sx={{
          width: "100%",
          height: 130,
          bgcolor: "action.hover",
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

        <Typography color="success.main" fontWeight="bold" sx={{ mt: 1 }}>
          ${product.price || "0"}
        </Typography>

        {/* Reviews */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Reviews:</Typography>

          {reviews.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No reviews yet
            </Typography>
          ) : (
            <ul style={{ paddingLeft: "1rem", margin: 0 }}>
              {reviews.map((r) => (
                <li key={r.id}>
                  ⭐ {r.rating} - {r.comment}
                </li>
              ))}
            </ul>
          )}
        </Box>

        {/* Add Review */}
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                type="number"
                label="Rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                inputProps={{ min: 1, max: 5 }}
                size="small"
                sx={{ width: 80 }}
              />

              <TextField
                type="text"
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                size="small"
                fullWidth
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={addReview.isLoading}
            >
              {addReview.isLoading ? "Submitting..." : "Add Review"}
            </Button>
          </form>

          {addReview.isError && (
            <Typography color="error" variant="body2">
              Error adding review
            </Typography>
          )}

          {addReview.isSuccess && (
            <Typography color="success.main" variant="body2">
              Review added!
            </Typography>
          )}
        </Box>
      </CardContent>

      <Box sx={{ p: 2 }}>
        <Button
          component={Link}
          to={`/product/${product.id}`}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 2,
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
}

export default function Shop() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProductsOperation({
    page: 1,
    limit: 3,
    sortBy: "price",
    ascending: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [ascending, setAscending] = useState(false);

  const displayedProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortBy === "price")
        return ascending ? a.price - b.price : b.price - a.price;

      if (sortBy === "rate")
        return ascending ? a.rate - b.rate : b.rate - a.rate;

      return 0;
    });

    return result;
  }, [products, searchTerm, sortBy, ascending]);

  if (isLoading)
    return (
      <Typography variant="h6" textAlign="center" mt={10}>
        Loading products...
      </Typography>
    );

  if (isError)
    return (
      <Typography variant="h6" textAlign="center" mt={10} color="error">
        {error?.message || "Error loading products"}
      </Typography>
    );

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        pt: 12,
        pb: 6,
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        mb={4}
        textAlign="center"
        sx={{ fontWeight: 700 }}
      >
        Our Products
      </Typography>

      {/* Search */}
      <TextField
        label="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{
          mb: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      />

      {/* Sort */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{
            minWidth: 120,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rate">Rate</MenuItem>
        </Select>

        <Select
          value={ascending}
          onChange={(e) => setAscending(e.target.value === "true")}
          sx={{
            minWidth: 150,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <MenuItem value="true">Ascending</MenuItem>
          <MenuItem value="false">Descending</MenuItem>
        </Select>
      </Box>

      {/* Products */}
      <Grid container spacing={3}>
        {displayedProducts.length === 0 && (
          <Typography
            variant="h6"
            textAlign="center"
            mt={5}
            color="text.secondary"
          >
            No products found.
          </Typography>
        )}

        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}