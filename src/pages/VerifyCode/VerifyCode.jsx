import React, { useState, useRef } from "react";
import { Box, Button, Typography, Alert, AppBar, Toolbar, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [code, setCode] = useState(["", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // يسمح برقم واحد فقط
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // الانتقال للحقل التالي
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const finalCode = code.join("");
    if (finalCode.length < 4) {
      setErrorMsg("Please enter the 4-digit code sent to your email.");
      return;
    }
    navigate("/reset-password", { state: { email, code: finalCode } });
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
        <Box sx={{ width: 400, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: "#fff", textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>Enter Verification Code</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter the 4-digit code sent to {email}.
          </Typography>

          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            {code.map((num, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputsRef.current[index] = el)}
                value={num}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "1.5rem" } }}
                sx={{ width: 60, height: 60 }}
              />
            ))}
          </Box>

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