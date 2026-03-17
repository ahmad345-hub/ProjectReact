// ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Alert, AppBar, Toolbar } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useResetPassword from "../../hooks/useResetPassword.jsx";

export default function ResetPassword() {
  const { t } = useTranslation();
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
          setSuccessMsg(t("Password reset successful! Redirecting to login..."));
          setTimeout(() => navigate("/login"), 2000);
        },
        onError: (err) => setErrorMsg(err.response?.data?.message || t("Something went wrong")),
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
            <Link to="/login" style={{ textDecoration: "none", color: "#fff", marginRight: 16 }}>
              {t("Login")}
            </Link>
            <Link to="/register" style={{ textDecoration: "none", color: "#fff" }}>
              {t("Register")}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", px: 2, py: 6 }}>
        <Box sx={{ width: 400, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: "#fff" }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {t("Reset Password")}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            {t("Enter the code you received and set a new password.")}
          </Typography>

          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

          {/* Email read-only */}
          <TextField
            label={t("Email")}
            type="email"
            fullWidth
            margin="normal"
            value={email}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label={t("Code")}
            type="text"
            fullWidth
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            label={t("New Password")}
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
            {resetPasswordMutation.isLoading ? t("Resetting...") : t("Reset Password")}
          </Button>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            {t("Remembered your password?")}{" "}
            <Link to="/login" style={{ textDecoration: "none", fontWeight: 500 }}>
              {t("Login")}
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {t("© 2026 KA SHOP. All rights reserved.")}
        </Typography>
      </Box>
    </Box>
  );
}