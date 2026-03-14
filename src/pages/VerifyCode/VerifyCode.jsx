import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert, AppBar, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerify = () => {
    if (!code) {
      setErrorMsg("Please enter the code sent to your email.");
      return;
    }
    // نقدر نتحقق من الكود هنا عبر API أو ننتقل مباشرة لصفحة Reset Password
    navigate("/reset-password", { state: { email, code } });
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" sx={{ backgroundColor: "#111" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            KA<Box component="span" sx={{ color: "#ffb703" }}>SHOP</Box>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", px: 2, py: 6 }}>
        <Box sx={{ width: 400, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: "#fff" }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>Enter Verification Code</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter the code sent to {email}.
          </Typography>

          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

          <TextField
            label="Code"
            type="text"
            fullWidth
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.3, backgroundColor: "#111", "&:hover": { backgroundColor: "#000" } }}
            onClick={handleVerify}
          >
            Continue
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#f5f5f5", py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © 2026 KA SHOP. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}