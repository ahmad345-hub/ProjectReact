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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useAuthStore from "../../store/useAuthStore.js";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "Product", path: "/product" },
    { title: "Contact", path: "/contact" },
  ];

  const hoverStyle = {
    borderRadius: "12px",
    transition: "all 0.25s ease",
    "&:hover": { backgroundColor: "#333", transform: "translateY(-2px)" },
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          
          backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          color: "white",
          transition: "all 0.4s ease",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: scrolled ? "64px" : "80px",
            transition: "all 0.4s ease",
          }}
        >
          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: scrolled ? "1.2rem" : "1.4rem",
            }}
          >
            KASHOP
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
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton sx={{ color: "white", ...hoverStyle }}>
              <SearchIcon />
            </IconButton>

            {token ? (
              <>
                <IconButton component={Link} to="/cart" sx={{ color: "white", ...hoverStyle }}>
                  <ShoppingCartIcon />
                </IconButton>
                <Button onClick={handleLogout} sx={{ color: "white", ...hoverStyle }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" sx={{ color: "white", ...hoverStyle }}>
                  Login
                </Button>
                <Button component={Link} to="/register" sx={{ color: "white", ...hoverStyle }}>
                  Register
                </Button>
              </>
            )}

            {isMobile && (
              <IconButton onClick={() => setOpenDrawer(true)} sx={{ color: "white", ...hoverStyle }}>
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

            <ListItem sx={{ mx: 1, ...hoverStyle }}>
              <IconButton sx={{ mr: 1, color: "white" }}>
                <SearchIcon />
              </IconButton>
              <ListItemText primary="Search" />
            </ListItem>

            {token ? (
              <>
                <ListItem
                  component={Link}
                  to="/cart"
                  onClick={() => setOpenDrawer(false)}
                  sx={{ mx: 1, ...hoverStyle }}
                >
                  <IconButton sx={{ mr: 1, color: "white" }}>
                    <ShoppingCartIcon />
                  </IconButton>
                  <ListItemText primary="Cart" />
                </ListItem>
                <ListItem
                  onClick={() => {
                    handleLogout();
                    setOpenDrawer(false);
                  }}
                  sx={{ mx: 1, ...hoverStyle }}
                >
                  <ListItemText primary="Logout" />
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
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/register"
                  onClick={() => setOpenDrawer(false)}
                  sx={{ mx: 1, ...hoverStyle }}
                >
                  <ListItemText primary="Register" />
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