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

export default function Profile() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = 250; // width of the sidebar

  const sidebarItems = [
    { label: "Info", to: "" },
    { label: "Orders", to: "ProfileOrders" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: sidebarWidth }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        My Profile
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
      {/* Main Container below Navbar */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6, flexGrow: 1 }}>
        {/* Menu Button for mobile */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" }, mb: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex" }}>
          {/* Sidebar for desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: sidebarWidth,
              flexShrink: 0,
            }}
          >
            {drawer}
          </Box>

          {/* Sidebar Drawer for mobile */}
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

          {/* Main content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: { md: 3 }, // margin-left to separate from sidebar
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 2,
              minHeight: "70vh", // ensures space above footer
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}