import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Badge,
  Select,
  MenuItem,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import useAuthStore from "../../store/useAuthStore.js";
import usecart from "../../hooks/usecart";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next.jsx";
import useThemeStore from "../../store/useThemeStore";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data } = usecart();
  const cartCount = data?.items?.reduce((total, item) => total + item.count, 0) || 0;

  const navLinks = [
    { title: t("Home"), path: "/" },
    { title: t("Shop"), path: "/shop" },
    { title: t("Profile"), path: "/Profile" },
    { title: t("Contact"), path: "/contact" },
  ];

  const hoverStyle = {
    borderRadius: "12px",
    transition: "all 0.25s ease",
    "&:hover": {
      backgroundColor: "action.hover",
      transform: "translateY(-2px)",
    },
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const mode = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? "background.paper" : "background.default",
          color: "text.primary",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: "70px", flexWrap: "wrap" }}>
          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "text.primary", fontWeight: "bold", fontSize: "1.4rem" }}
          >
            3legant.
          </Typography>

          {/* Desktop Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, flexGrow: 1, justifyContent: "center" }}>
              {navLinks.map((link) => (
                <Button key={link.title} component={Link} to={link.path} sx={{ color: "text.primary", textTransform: "none", ...hoverStyle }}>
                  {link.title}
                </Button>
              ))}
            </Box>
          )}

          {/* Desktop Right Section */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {token && (
                <>
                  {/* 1. Logout */}
                

                  {/* 2. Cart */}
                  <IconButton component={Link} to="/cart" sx={{ color: "text.primary", ...hoverStyle }}>
                    <Badge badgeContent={cartCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>

                  {/* 3. Theme */}
                  <IconButton
                    onClick={toggleTheme}
                    sx={{ color: "text.primary", backgroundColor: "action.hover", "&:hover": { backgroundColor: "action.selected" }, borderRadius: "8px" }}
                  >
                    {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>

                  {/* 4. Language */}
                  <Select
                    value={i18n.language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    size="small"
                    sx={{
                      color: "text.primary",
                      minWidth: 100,
                      ".MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
                      "& .MuiSvgIcon-root": { color: "text.primary" },
                      backgroundColor: "action.hover",
                      borderRadius: "8px",
                    }}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="ar">العربية</MenuItem>
                  </Select>
                       

                       <Button onClick={handleLogout} sx={{ color: "text.primary", ...hoverStyle }}>
                    {t("Logout")}
                  </Button>
                  {/* 5. Profile */}
                  
                </>
              )}
            </Box>
          )}

          {/* Mobile Section */}
          {isMobile && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {token && (
                <Button onClick={handleLogout} sx={{ color: "text.primary" }}>
                  {t("Logout")}
                </Button>
              )}
              <IconButton
                onClick={() => setOpenDrawer(true)}
                sx={{ color: "text.primary", backgroundColor: "action.hover", "&:hover": { backgroundColor: "action.selected" }, borderRadius: "8px" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)} PaperProps={{ sx: { backgroundColor: "background.paper", color: "text.primary" } }}>
        <Box sx={{ width: 250, mt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.title}
                component={Link}
                to={link.path}
                onClick={() => setOpenDrawer(false)}
                sx={{ mx: 1, borderRadius: "12px", "&:hover": { backgroundColor: "action.hover" } }}
              >
                <ListItemText primary={link.title} />
              </ListItem>
            ))}

            <Divider sx={{ my: 1 }} />

            {token && (
              <>
                {/* Same order inside drawer */}
                <ListItem component={Link} to="/cart" onClick={() => setOpenDrawer(false)}>
                  <ListItemText primary={t("Cart")} />
                </ListItem>

                <ListItem>
                  <IconButton onClick={toggleTheme} sx={{ width: "100%" }}>
                    {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </ListItem>

                <ListItem>
                  <Select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)} fullWidth size="small">
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="ar">العربية</MenuItem>
                  </Select>
                </ListItem>

               
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;