import React from "react";
import useProfile from "../../hooks/useProfile";
import {
  Box,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ProfileOrders() {
  const { t } = useTranslation();
  const { data, isLoading } = useProfile();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>{t("Loading...")}</Typography>
      </Box>
    );

  return (
    <Stack spacing={2}>
      {data.orders.map((order) => (
        <Paper
          key={order.id}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography fontWeight="bold">
              {t("Order #")} {order.id}
            </Typography>
            <Typography>
              {t("Status:")} {t(order.status)}
            </Typography>
          </Box>

          <Box textAlign="right">
            <Typography>
              {t("Amount:")} {order.amountPaid} ₪
            </Typography>
            <Typography>
              {t("Payment:")} {order.paymentStatus ? t(order.paymentStatus) : t("pending")}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}