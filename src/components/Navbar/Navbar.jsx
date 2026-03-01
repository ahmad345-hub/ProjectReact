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
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const openMenu = Boolean(anchorEl);

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

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const hoverStyle = {
    borderRadius: "12px",
    transition: "all 0.25s ease",
    "&:hover": {
      backgroundColor: "#f2f2f2",
      transform: "translateY(-2px)",
    },
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          boxShadow: scrolled ? "0 6px 25px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.4s ease",
          color: "black",
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
              color: "inherit",
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
                    color: "black",
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2,
                    ...hoverStyle,
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Section */}
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton sx={hoverStyle}>
                <SearchIcon />
              </IconButton>

              <IconButton onClick={handleMenuOpen} sx={hoverStyle}>
                <PersonIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                  Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/register"
                  onClick={handleMenuClose}
                >
                  Register
                </MenuItem>
              </Menu>

              <IconButton component={Link} to="/cart" sx={hoverStyle}>
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={() => setOpenDrawer(true)} sx={hoverStyle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.title}
                component={Link}
                to={link.path}
                onClick={() => setOpenDrawer(false)}
                sx={{
                  mx: 1,
                  ...hoverStyle,
                }}
              >
                <ListItemText primary={link.title} />
              </ListItem>
            ))}

            <Divider sx={{ my: 1 }} />

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

            <ListItem
              component={Link}
              to="/cart"
              onClick={() => setOpenDrawer(false)}
              sx={{ mx: 1, ...hoverStyle }}
            >
              <ListItemText primary="Cart" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;