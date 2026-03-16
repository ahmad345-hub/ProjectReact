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
  Paper,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import useProductsOperation from "../../hooks/useProductsOperation";
import useAddReview from "../../hooks/useAddReview";

function ProductCard({ product }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

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
          setShowForm(false);
        },
      }
    );
  };

  return (
    <Box>

      {/* Product Card */}
      <Card
        sx={{
          borderRadius: 3,
          transition: "0.3s",
          "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
        }}
      >
        <Box
          sx={{
            height: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f5f5f5",
          }}
        >
          <img
            src={product.image || "https://via.placeholder.com/120"}
            alt={product.name}
            style={{ maxHeight: "100%" }}
          />
        </Box>

        <CardContent>
          <Typography variant="h6">{product.name}</Typography>

          {/* Rating Stars */}
          <Rating value={product.rate || 0} readOnly />

          <Typography color="error.main" fontWeight="bold">
            ${product.price}
          </Typography>
        </CardContent>

        <Box sx={{ p: 2, display: "flex", gap: 1 }}>
          <Button
            component={Link}
            to={`/product/${product.id}`}
            variant="contained"
            fullWidth
          >
            View Details
          </Button>

          <Button
            variant="outlined"
            onClick={() => setShowForm(!showForm)}
          >
            Add Review
          </Button>
        </Box>
      </Card>

      {/* Add Review */}
      {showForm && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#fafafa",
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit}>

            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />

            <TextField
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              size="small"
              fullWidth
              sx={{ my: 1 }}
            />

            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={addReview.isLoading}
            >
              {addReview.isLoading ? "Submitting..." : "Submit Review"}
            </Button>

          </form>
        </Box>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#f1f1f1",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" mb={1}>
            Reviews
          </Typography>

          {reviews.map((r) => (
            <Box key={r.id} sx={{ mb: 1 }}>
              <Rating value={r.rating} readOnly size="small" />
              <Typography variant="body2">
                {r.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default function Shop() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProductsOperation();

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [ascending, setAscending] = useState(false);
  const [search, setSearch] = useState("");

  const displayedProducts = useMemo(() => {
    let result = [...products];

    /* search by name */
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    /* category filter */
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    /* sort */
    result.sort((a, b) => {
      if (sortBy === "price")
        return ascending ? a.price - b.price : b.price - a.price;

      if (sortBy === "rate")
        return ascending ? a.rate - b.rate : b.rate - a.rate;

      return 0;
    });

    return result;
  }, [products, category, sortBy, ascending, search]);

  if (isLoading)
    return (
      <Typography textAlign="center" mt={10}>
        Loading products...
      </Typography>
    );

  if (isError)
    return (
      <Typography textAlign="center" mt={10} color="error">
        {error?.message || "Error loading products"}
      </Typography>
    );

  return (
    <Box sx={{ px: 6, pt: 12, pb: 6, minHeight: "100vh" }}>

      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        fontWeight="bold"
      >
        Explore Our Exclusive Products
      </Typography>

      {/* Search */}
      <TextField
        label="Search product..."
        sx={{ width: "50%", mb: 4 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4}>

        {/* Filters */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>

            <Typography variant="h6" mb={2}>
              Filters
            </Typography>

            <Typography variant="subtitle2" mb={1}>
              Categories
            </Typography>

            <Select
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="mobiles">Mobiles</MenuItem>
              <MenuItem value="clothes">Clothes</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
            </Select>

            <Typography variant="subtitle2" mb={1}>
              Sort By
            </Typography>

            <Select
              fullWidth
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="rate">Rating</MenuItem>
            </Select>

            <Select
              fullWidth
              value={ascending}
              onChange={(e) =>
                setAscending(e.target.value === "true")
              }
            >
              <MenuItem value="true">Ascending</MenuItem>
              <MenuItem value="false">Descending</MenuItem>
            </Select>

          </Paper>
        </Grid>

        {/* Products */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>

            {displayedProducts.length === 0 && (
              <Typography mt={5}>
                No products found
              </Typography>
            )}

            {displayedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}

          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}