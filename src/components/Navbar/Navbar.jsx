import React, { useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useAuthStore from "../../store/useAuthStore.js";
import usecart from "../../hooks/usecart";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next.jsx";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data } = usecart();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const cartCount =
    data?.items?.reduce((total, item) => total + item.count, 0) || 0;

  const navLinks = [
    { title: t("Home"), path: "/" },
    { title: t("Shop"), path: "/shop" },
    { title: t("Product"), path: "/product" },
    { title: t("Contact"), path: "/contact" },
  ];

  const hoverStyle = {
    borderRadius: "12px",
    transition: "all 0.25s ease",
    "&:hover": {
      backgroundColor: "#333",
      transform: "translateY(-2px)",
    },
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar position="fixed" elevation={0}  >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: "70px" }}>
          
          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.4rem",
            }}
          >
       3legant.
          </Typography>

          {/* Desktop Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.title}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    ...hoverStyle,
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Section */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            
            <IconButton sx={{ color: "white", ...hoverStyle }}>
              <SearchIcon />
            </IconButton>

            {/* Language Dropdown */}
            <Select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              size="small"
              sx={{
                color: "white",
                minWidth: 110,
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#aaa",
                },
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">العربية</MenuItem>
            </Select>

            {token ? (
              <>
                {/* Cart */}
                <IconButton
                  component={Link}
                  to="/cart"
                  sx={{ color: "white", ...hoverStyle }}
                >
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <Button
                  onClick={handleLogout}
                  sx={{ color: "white", ...hoverStyle }}
                >
                  {t("Logout")}
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ color: "white", ...hoverStyle }}
                >
                  {t("Login")}
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  sx={{ color: "white", ...hoverStyle }}
                >
                  {t("Register")}
                </Button>
              </>
            )}

            {isMobile && (
              <IconButton
                onClick={() => setOpenDrawer(true)}
                sx={{ color: "white", ...hoverStyle }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ sx: { backgroundColor: "#000", color: "#fff" } }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.title}
                component={Link}
                to={link.path}
                onClick={() => setOpenDrawer(false)}
                sx={{ mx: 1, ...hoverStyle }}
              >
                <ListItemText primary={link.title} />
              </ListItem>
            ))}

            <Divider sx={{ my: 1, backgroundColor: "#555" }} />

            {token ? (
              <>
                <ListItem
                  component={Link}
                  to="/cart"
                  onClick={() => setOpenDrawer(false)}
                  sx={{ mx: 1, ...hoverStyle }}
                >
                  <ListItemText primary={t("Cart")} />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleLogout();
                    setOpenDrawer(false);
                  }}
                  sx={{ mx: 1, ...hoverStyle }}
                >
                  <ListItemText primary={t("Logout")} />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  component={Link}
                  to="/login"
                  onClick={() => setOpenDrawer(false)}
                  sx={{ mx: 1, ...hoverStyle }}
                >
                  <ListItemText primary={t("Login")} />
                </ListItem>

                <ListItem
                  component={Link}
                  to="/register"
                  onClick={() => setOpenDrawer(false)}
                  sx={{ mx: 1, ...hoverStyle }}
                >
                  <ListItemText primary={t("Register")} />
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