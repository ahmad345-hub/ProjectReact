import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation(); // ✅ استدعاء الترجمة
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = 250; // عرض الشريط الجانبي

  const sidebarItems = [
    { label: t("Info"), to: "" }, // ترجمة Info
    { label: t("Orders"), to: "ProfileOrders" }, // ترجمة Orders
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: sidebarWidth }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        {t("My Profile")} {/* ترجمة My Profile */}
      </Typography>
      <List>
        {sidebarItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={location.pathname.includes(item.to)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6, flexGrow: 1 }}>
        {/* زر القائمة للجوال */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" }, mb: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex" }}>
          {/* Sidebar لأجهزة سطح المكتب */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: sidebarWidth,
              flexShrink: 0,
            }}
          >
            {drawer}
          </Box>

          {/* Sidebar Drawer للجوال */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { width: sidebarWidth },
            }}
          >
            {drawer}
          </Drawer>

          {/* المحتوى الرئيسي */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: { md: 3 }, // مسافة عن الشريط الجانبي
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