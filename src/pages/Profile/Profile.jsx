import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  const location = useLocation();

  const sidebarWidth = 250;

  const sidebarItems = [
    { label: t("Info"), to: "" },
    { label: t("Orders"), to: "ProfileOrders" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6, flexGrow: 1 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
          
          {/* Sidebar / Top Menu */}
          <Box
            sx={{
              width: { xs: "100%", md: sidebarWidth },
              flexShrink: 0,
              mb: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                gap: 1,
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              {/* Title يظهر فقط بالديسكتوب */}
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", md: "block" }, mb: 1 }}
              >
                {t("My Profile")}
              </Typography>

              {sidebarItems.map((item) => (
                <ListItemButton
                  key={item.to}
                  component={Link}
                  to={item.to}
                  selected={location.pathname.includes(item.to)}
                  sx={{
                    borderRadius: 2,
                    justifyContent: "center",
                    flex: { xs: 1, md: "unset" },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              ))}
            </Box>
          </Box>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: { md: 3 },
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 2,
              minHeight: "70vh",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}