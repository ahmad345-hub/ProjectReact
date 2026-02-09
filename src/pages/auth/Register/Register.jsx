import {
  Box,
  Button,
  Checkbox,
  Divider,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const registerForm = async (values) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");

      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/auth/Account/Register",
        values
      );

      console.log("Server response:", response.data);
      setSuccessMsg("Account created successfully!");
      reset(); 
    } catch (error) {
      console.error("Error registering:", error);

      if (error.response) {
     
        setErrorMsg(error.response.data.message || "Server error");
      } else if (error.request) {
      
        setErrorMsg("Network error: cannot reach server");
      } else {
        setErrorMsg("Error: " + error.message);
      }
    }
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", mt: "64px" }}>
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 6,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: "6px" }}>
          KA
          <Box component="span" sx={{ color: "#ffb703" }}>
            SHOP
          </Box>
        </Typography>
        <Typography
          sx={{ mt: 1, fontSize: "13px", letterSpacing: "3px", color: "text.secondary" }}
        >
          MODERN E-COMMERCE
        </Typography>
        <Divider sx={{ width: 80, my: 3 }} />
        <Typography
          variant="h6"
          sx={{ color: "text.secondary", textAlign: "center", maxWidth: 400 }}
        >
          Smart shopping starts here.
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
      >
        <Box
          component="form"
          sx={{ width: "100%", maxWidth: 380 }}
          onSubmit={handleSubmit(registerForm)}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Create your account
          </Typography>

          {/* رسائل الخطأ أو النجاح */}
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

          <TextField {...register("fullName")} fullWidth label="Full Name" margin="normal" />
          <TextField {...register("userName")} fullWidth label="Username" margin="normal" />
          <TextField {...register("email")} fullWidth label="Email Address" margin="normal" />
          <TextField {...register("phoneNumber")} fullWidth label="Phone Number" margin="normal" />
          <TextField
            {...register("password")}
            fullWidth
            label="Password"
            type="password"
            margin="normal"
          />

          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Checkbox />
            <Typography variant="body2">I agree to the Terms & Privacy Policy</Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.3,
              mt: 1,
              backgroundColor: "#111",
              "&:hover": { backgroundColor: "#000" },
            }}
          >
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", fontWeight: 500 }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
