import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import usecart from "../../hooks/usecart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useChangeQuantity from "../../hooks/useChangeQuantity";  
import useClearCart from "../../hooks/useClearCart";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function Cart() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = usecart();
  const { mutate: removeItem, isPending } = useRemoveFromCart();
  const { mutate: updateQuantity } = useChangeQuantity();
  const { mutate: clearCart, isPending: isClearingCart } = useClearCart();
  const navigate = useNavigate();

  if (isLoading)
    return <Typography variant="h4" textAlign="center" mt={10}>{t("Loading...")}</Typography>;
  if (isError)
    return <Typography variant="h4" textAlign="center" mt={10} color="error">{t("Server went wrong")}: {error.message}</Typography>;

  // تأكيد حذف عنصر واحد
  const handleRemove = (productId) => {
    Swal.fire({
      title: t("Are you sure you want to remove this item?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("Yes, remove it"),
      cancelButtonText: t("Cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(productId);
        Swal.fire({
          title: t("Removed!"),
          text: t("The item has been removed from your cart."),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // تأكيد مسح كل العربة
  const handleClearCart = () => {
    Swal.fire({
      title: t("Are you sure you want to clear the cart?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("Yes, clear it"),
      cancelButtonText: t("Cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire({
          title: t("Cleared!"),
          text: t("All items have been removed from your cart."),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
      <Navbar />

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, py: 8 }}>
        <Typography variant="h3" fontWeight={700} mb={4} textAlign="center">
          {t("Shopping Cart")}
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
                <Typography variant="body2" color="text.secondary">{t("Price")}: ${item.price}</Typography>

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
                  onClick={() => handleRemove(item.productId)}
                  sx={{ mt: 1 }}
                >
                  {t("Remove")}
                </Button>
              </Grid>
            </Grid>
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between", p: 3, bgcolor: "background.default" }}>
            <Typography variant="h5" fontWeight={600}>{t("Total")}</Typography>
            <Typography variant="h4" fontWeight={700} color="success.main">${data.cartTotal}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 4, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isClearingCart}
            onClick={handleClearCart}
          >
            {t("Clear Cart")}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/checkout")}
          >
            {t("Process to Checkout")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            {t("Continue Shopping")}
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}