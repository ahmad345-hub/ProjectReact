import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useproduct";
import useAddtoCart from "../../hooks/useAddtoCart";
import { Box, Typography, Button, CircularProgress, useTheme } from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams();
  const theme = useTheme();

  const { data, isLoading, isError, error } = useProduct(id);
  const { mutate, isPending } = useAddtoCart();

  if (isLoading)
    return (
      <Typography
        variant="h5"
        align="center"
        sx={{ mt: 10, color: theme.palette.text.primary }}
      >
        Loading...
      </Typography>
    );

  if (isError)
    return (
      <Typography
        variant="h5"
        align="center"
        sx={{ mt: 10, color: theme.palette.error.main }}
      >
        {error.message}
      </Typography>
    );

  const product = data.response;

  return (
    <Box
      sx={{
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 10 },
        backgroundColor: theme.palette.background.default,
        minHeight: "calc(100vh - 64px)", // أسفل Navbar
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Image */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: theme.palette.mode === "dark" ? "#111" : "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            borderRadius: 3,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 12px rgba(255,255,255,0.1)"
                : "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name || "Product"}
            sx={{
              maxHeight: 400,
              maxWidth: "100%",
              objectFit: "contain",
            }}
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/400x400?text=No+Image")
            }
          />
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {product.name || "No Name"}
          </Typography>

          <Typography variant="body1" mb={1}>
            ⭐ {product.rate}
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
            sx={{ color: theme.palette.success.main }}
          >
            ${product.price}
          </Typography>

          <Typography variant="body1" mb={4}>
            {product.description}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => mutate({ ProductId: product.id, Count: 1 })}
            disabled={isPending}
            sx={{
              width: { xs: "100%", md: "50%" },
              py: 1.5,
              borderRadius: 2,
            }}
          >
            {isPending ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Add to Cart"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}