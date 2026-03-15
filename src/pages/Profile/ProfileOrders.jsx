import React from "react";
import useProfile from "../../hooks/useProfile";
import {
  Box,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function ProfileOrders() {
  const { data, isLoading } = useProfile();

  if (isLoading) return <CircularProgress />;

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
              Order #{order.id}
            </Typography>
            <Typography>Status: {order.status}</Typography>
          </Box>

          <Box textAlign="right">
            <Typography>
              Amount: {order.amountPaid} ₪
            </Typography>
            <Typography>
              Payment: {order.paymentStatus || "pending"}
            </Typography>
          </Box>
        </Paper>
      ))}

    </Stack>
  );
}