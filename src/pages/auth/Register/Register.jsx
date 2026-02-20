import {
  Box,
  Button,
  Checkbox,
  Divider,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { schema } from "../../../Validation/schema.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const onSubmit = async (values) => {
    try {
      setServerError("");
      setLoading(true);

      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/auth/Account/Register",
        values
      );

      console.log("Server response:", response.data);

      setOpenSuccess(true); // ✅ إشعار نجاح
      reset();
    } catch (error) {
      if (error.response) {
        setServerError(
          error.response.data.message +
            (error.response.data.errors
              ? " - " + error.response.data.errors.join(", ")
              : "")
        );
      } else {
        setServerError("Network error or server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh", display: "flex" }}>
        {/* Left Side */}
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
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, letterSpacing: "6px" }}
          >
            KA
            <Box component="span" sx={{ color: "#ffb703" }}>
              SHOP
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: "13px",
              letterSpacing: "3px",
              color: "text.secondary",
            }}
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

        {/* Right Side */}
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Create your account
            </Typography>

            {serverError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {serverError}
              </Alert>
            )}

            <TextField
              {...register("fullName")}
              fullWidth
              label="Full Name"
              margin="normal"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <TextField
              {...register("userName")}
              fullWidth
              label="Username"
              margin="normal"
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />

            <TextField
              {...register("email")}
              fullWidth
              label="Email Address"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              {...register("phoneNumber")}
              fullWidth
              label="Phone Number"
              margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />

            <TextField
              {...register("password")}
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Checkbox />
              <Typography variant="body2">
                I agree to the Terms & Privacy Policy
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.3,
                mt: 1,
                backgroundColor: "#111",
                "&:hover": { backgroundColor: "#000" },
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                "Sign Up"
              )}
            </Button>

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", fontWeight: 500 }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Account created successfully 🎉
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
