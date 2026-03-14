import React from "react";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar"; // عدل المسار حسب مشروعك
import Footer from "../../components/Footer/Footer"; // عدل المسار حسب مشروعك
import usecart from "../../hooks/usecart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useChangeQuantity from "../../hooks/useChangeQuantity";  
import useClearCart from "../../hooks/useClearCart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { data, isLoading, isError, error } = usecart();
  const { mutate: removeItem, isPending } = useRemoveFromCart();
  const { mutate: updateQuantity } = useChangeQuantity();
  const { mutate: clearCart, isPending: isClearingCart } = useClearCart();
  const navigate = useNavigate();

  if (isLoading) return <Typography variant="h4" textAlign="center" mt={10}>Loading...</Typography>;
  if (isError) return <Typography variant="h4" textAlign="center" mt={10} color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Cart Section */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 8 }}>
        <Typography variant="h3" fontWeight={700} mb={4} textAlign="center">
          Shopping Cart
        </Typography>

        <Box sx={{ bgcolor: "background.paper", borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
          {data.items.map((item) => (
            <Grid
              container
              key={item.productId}
              alignItems="center"
              justifyContent="space-between"
              sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}
              spacing={2}
            >
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600}>{item.productName}</Typography>
                <Typography variant="body2" color="text.secondary">Price: ${item.price}</Typography>

                {/* Quantity Controls */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => item.count > 1 && updateQuantity({ id: item.productId, count: item.count - 1 })}
                  >
                    -
                  </Button>
                  <Typography>{item.count}</Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => updateQuantity({ id: item.productId, count: item.count + 1 })}
                  >
                    +
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant="h6" fontWeight={700}>${item.totalPrice}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  disabled={isPending}
                  onClick={() => removeItem(item.productId)}
                  sx={{ mt: 1 }}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}

          {/* Cart Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 3, bgcolor: "background.default" }}>
            <Typography variant="h5" fontWeight={600}>Total</Typography>
            <Typography variant="h4" fontWeight={700} color="success.main">${data.cartTotal}</Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 4, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isClearingCart}
            onClick={() => clearCart()}
          >
            Clear Cart
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}