import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Alert, AppBar, Toolbar } from "@mui/material";
import useResetPassword from "../../hooks/useResetPassword.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const resetPasswordMutation = useResetPassword();

  // تمرير الإيميل من VerifyCode
  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
  }, [location.state]);

  const handleResetPassword = () => {
    setSuccessMsg("");
    setErrorMsg("");

    resetPasswordMutation.mutate(
      { email, code, newPassword },
      {
        onSuccess: () => {
          setSuccessMsg("Password reset successful! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        },
        onError: (err) => setErrorMsg(err.response?.data?.message || "Something went wrong"),
      }
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#111" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            KA<Box component="span" sx={{ color: "#ffb703" }}>SHOP</Box>
          </Typography>
          <Box>
            <Link to="/login" style={{ textDecoration: "none", color: "#fff", marginRight: 16 }}>Login</Link>
            <Link to="/register" style={{ textDecoration: "none", color: "#fff" }}>Register</Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", px: 2, py: 6 }}>
        <Box sx={{ width: 400, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: "#fff" }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>Reset Password</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter the code you received and set a new password.
          </Typography>

          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

          {/* Email read-only */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Code"
            type="text"
            fullWidth
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.3, backgroundColor: "#111", "&:hover": { backgroundColor: "#000" } }}
            onClick={handleResetPassword}
            disabled={resetPasswordMutation.isLoading}
          >
            {resetPasswordMutation.isLoading ? "Resetting..." : "Reset Password"}
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            Remembered your password?{" "}
            <Link to="/login" style={{ textDecoration: "none", fontWeight: 500 }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © 2026 KA SHOP. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}