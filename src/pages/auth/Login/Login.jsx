import { Box, Button, TextField, Typography, Alert, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosinstance from "../../../api/axiosinstance.js";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (values) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");

      const response = await axiosinstance.post("auth/Account/Login", values);

      if (response.status === 200) {
        const token = response.data.accessToken;
        if (!token) throw new Error("Token missing from response");

        // ✅ خزّن التوكن في localStorage
        localStorage.setItem("token", token);

        setSuccessMsg("Login successful 👁️ Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrorMsg(response.data.message || "Login failed");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || error.message || "Network error");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
      {/* Left Side */}
      <Box sx={{ flex: 1, backgroundColor: "#f5f5f5", display: { xs: "none", md: "flex" }, flexDirection: "column", justifyContent: "center", alignItems: "center", px: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: "6px" }}>KA
          <Box component="span" sx={{ color: "#ffb703" }}>SHOP</Box>
        </Typography>
        <Typography sx={{ mt: 1, fontSize: "13px", letterSpacing: "3px", color: "text.secondary", textAlign: "center" }}>
          SMART E-COMMERCE PLATFORM
        </Typography>
        <Divider sx={{ width: 80, my: 3 }} />
        <Typography sx={{ color: "text.secondary", textAlign: "center", maxWidth: 300 }}>
          Everything you love. One smart place.
        </Typography>
      </Box>

      {/* Right Side */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", px: { xs: 2, sm: 4 }, py: { xs: 6, md: 0 } }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%", maxWidth: 400, p: { xs: 3, sm: 4 }, boxShadow: 3, borderRadius: 3, bgcolor: "#fff" }}>
          <Typography variant="h4" fontWeight="bold" mb={1}>Welcome back 👋</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>Login to your KASHOP account</Typography>

          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

          <TextField {...register("email")} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
          <TextField {...register("password")} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />

          <Typography variant="body2" sx={{ textAlign: "right", mt: 1 }}>
            <Link to="/forgot-password" style={{ textDecoration: "none", fontWeight: 500 }}>Forgot Password?</Link>
          </Typography>

          <Button type="submit" fullWidth variant="contained" sx={{ py: 1.3, mt: 2, backgroundColor: "#111", "&:hover": { backgroundColor: "#000" } }}>
            LOGIN TO KASHOP
          </Button>

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            New to KASHOP?{" "}
            <Link to="/register" style={{ textDecoration: "none", fontWeight: 500 }}>Create account</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;