import React, { useState } from "react";
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import usecart from "../../hooks/usecart";
import useCheckOut from "../../hooks/useCheckOut";
import { useTranslation } from "react-i18next";

export default function Checkout() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = usecart();
  const { mutate, isPending } = useCheckOut();
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  if (isLoading)
    return (
      <Typography variant="h5" textAlign="center" mt={10}>
        {t("Loading...")}
      </Typography>
    );

  if (isError)
    return (
      <Typography variant="h5" textAlign="center" mt={10} color="error">
        {t("Server went wrong")}: {error.message}
      </Typography>
    );

  return (
    <Box
      sx={{
        maxWidth: "5xl",
        mx: "auto",
        p: 3,
        pt: 12,
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h3" fontWeight="bold" mb={6} textAlign="center">
        {t("Checkout")}
      </Typography>

      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {data.items.map((item) => (
          <Box
            key={item.productId}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: 1,
              borderColor: "divider",
              p: 3,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {item.productName}
              </Typography>
              <Typography color="text.secondary">
                {t("Price")}: ${item.price}
              </Typography>
              <Typography color="text.secondary">
                {t("Quantity")}: {item.count}
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700}>
              ${item.totalPrice}
            </Typography>
          </Box>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            bgcolor: "action.hover",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {t("Total")}
          </Typography>
          <Typography variant="h5" fontWeight={700} color="success.main">
            ${data.cartTotal}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 3,
          alignItems: "center",
        }}
      >
        <FormControl fullWidth sx={{ minWidth: 200 }}>
          <InputLabel id="payment-method-label">{t("Payment Method")}</InputLabel>
          <Select
            labelId="payment-method-label"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label={t("Payment Method")}
          >
            <MenuItem value="visa">{t("Visa Card")}</MenuItem>
            <MenuItem value="Cash">{t("Cash")}</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={() => mutate(paymentMethod)}
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: "background.default",
            px: 6,
            py: 2,
            borderRadius: 3,
            "&:hover": {
              bgcolor: "text.secondary",
            },
          }}
          disabled={isPending}
        >
          {isPending ? t("Processing...") : t("Pay Now")}
        </Button>
      </Box>
    </Box>
  );
}