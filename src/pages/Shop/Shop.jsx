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
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import useAddReview from "../../hooks/useAddReview";
import useAuthStore from "../../store/useAuthStore";

import useCatagories from "../../hooks/usecatagories";
import useProductsByCategory from "../../hooks/useProductsByCategory";

// ====== ProductCard Component ======
function ProductCard({ product = {}, token }) {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addReview = useAddReview(product.id || 0);

  // عند الضغط على Add Review
  const handleAddReviewClick = () => {
    if (!token) {
      return Swal.fire({
        icon: "warning",
        title: t("You must login first"),
        text: t("Please login to add a review"),
        confirmButtonText: t("OK"),
      });
    }
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;

    addReview.mutate(
      { rating, comment },
      {
        onSuccess: () => {
          setReviews((prev) => [...prev, { id: Date.now(), rating, comment }]);
          setComment("");
          setRating(5);
          setShowForm(false);
          Swal.fire({
            title: t("Review submitted successfully"),
            icon: "success",
            confirmButtonText: t("OK"),
          });
        },
      }
    );
  };

  return (
    <Box>
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
            alt={product.name || t("No Name")}
            style={{ maxHeight: "100%" }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6">{product.name || t("No Name")}</Typography>
          <Rating value={product.rate || 0} readOnly />
          <Typography color="error.main" fontWeight="bold">
            ${product.price || 0}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, display: "flex", gap: 1 }}>
          <Button
            component={Link}
            to={`/product/${product.id || 0}`}
            variant="contained"
            fullWidth
          >
            {t("View Details")}
          </Button>
          <Button variant="outlined" onClick={handleAddReviewClick}>
            {t("Add Review")}
          </Button>
        </Box>
      </Card>

      {showForm && token && (
        <Box sx={{ mt: 2, p: 2, bgcolor: "#fafafa", borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
            <TextField
              label={t("Comment")}
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
              {addReview.isLoading ? t("Submitting...") : t("Submit Review")}
            </Button>
          </form>
        </Box>
      )}

      {reviews.length > 0 && (
        <Box sx={{ mt: 2, p: 2, bgcolor: "#f1f1f1", borderRadius: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            {t("Reviews")}
          </Typography>
          {reviews.map((r) => (
            <Box key={r.id} sx={{ mb: 1 }}>
              <Rating value={r.rating} readOnly size="small" />
              <Typography variant="body2">{r.comment}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ====== Shop Page ======
export default function Shop() {
  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);

  // Categories
  const { data: categoriesData = [], isLoading: categoriesLoading } = useCatagories(10);
  const categoriesArray = categoriesData?.response?.data || [];

  // الكاتيجوري الافتراضي (أول واحدة)
  const [categoryId, setCategoryId] = useState(
    categoriesArray.length > 0 ? categoriesArray[0].id : null
  );

  // Products for selected category
  const { data: products = [], isLoading: productsLoading } = useProductsByCategory(categoryId);

  // Search + Sort
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [ascending, setAscending] = useState(false);

  // ======= Handlers مع Check تسجيل الدخول =======
  const handleCategoryChange = (id) => {
    if (!token) {
      return Swal.fire({
        icon: "warning",
        title: t("You must login first"),
        text: t("Please login to filter products by category"),
        confirmButtonText: t("OK"),
      });
    }
    setCategoryId(id);
  };

  const handleSearchChange = (value) => {
    if (!token) {
      return Swal.fire({
        icon: "warning",
        title: t("You must login first"),
        text: t("Please login to search products"),
        confirmButtonText: t("OK"),
      });
    }
    setSearch(value);
  };

  // فلترة + ترتيب المنتجات
  const displayedProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortBy === "price") return ascending ? a.price - b.price : b.price - a.price;
      if (sortBy === "rate") return ascending ? a.rate - b.rate : b.rate - a.rate;
      return 0;
    });

    return result;
  }, [products, search, sortBy, ascending]);

  if (categoriesLoading || !categoryId)
    return (
      <Typography textAlign="center" mt={10}>
        {t("Loading categories...")}
      </Typography>
    );

  if (productsLoading)
    return (
      <Typography textAlign="center" mt={10}>
        {t("Loading products...")}
      </Typography>
    );

  return (
    <Box sx={{ px: 6, pt: 12, pb: 6, minHeight: "100vh" }}>
      <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold">
        {t("Explore Our Exclusive Products")}
      </Typography>

      <TextField
        label={t("Search product...")}
        sx={{ width: "50%", mb: 4 }}
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>
              {t("Filters")}
            </Typography>

            <Typography variant="subtitle2" mb={1}>
              {t("Categories")}
            </Typography>
            <Select
              fullWidth
              value={categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              sx={{ mb: 2 }}
            >
              {categoriesArray.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>

            <Typography variant="subtitle2" mb={1}>
              {t("Sort By")}
            </Typography>
            <Select
              fullWidth
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="price">{t("Price")}</MenuItem>
              <MenuItem value="rate">{t("Rating")}</MenuItem>
            </Select>

            <Select
              fullWidth
              value={ascending}
              onChange={(e) => setAscending(e.target.value === "true")}
            >
              <MenuItem value="true">{t("Ascending")}</MenuItem>
              <MenuItem value="false">{t("Descending")}</MenuItem>
            </Select>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {displayedProducts.length === 0 && (
              <Typography mt={5}>{t("No products found")}</Typography>
            )}
            {displayedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} token={token} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}