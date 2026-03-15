import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Typography, Tabs, Tab, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();

  const currentTab = location.pathname.includes("ProfileOrders") ? 1 : 0;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>

      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        My Profile
      </Typography>

      <Tabs
        value={currentTab}
        centered
        sx={{ mb: 4 }}
      >
        <Tab label="Info" component={Link} to="" />
        <Tab label="Orders" component={Link} to="ProfileOrders" />
      </Tabs>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "background.paper",
        }}
      >
        <Outlet />
      </Box>

    </Container>
  );
}