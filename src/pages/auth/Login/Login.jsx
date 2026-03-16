import { Box, Button, TextField, Typography, Alert, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();
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
        localStorage.setItem("token", token);

        setSuccessMsg("Login successful 👁️ Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg,#000,#222)"
              : "linear-gradient(135deg,#f5f5f5,#eaeaea)",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 6,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 800, letterSpacing: "6px" }}>
          3le
          <Box component="span" sx={{ color: "#ffb703" }}>
            gant
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: "14px",
            letterSpacing: "3px",
            color: "text.secondary",
          }}
        >
          SMART E-COMMERCE PLATFORM
        </Typography>

        <Divider sx={{ width: 80, my: 4 }} />

        <Typography
          sx={{
            textAlign: "center",
            maxWidth: 320,
            color: "text.secondary",
          }}
        >
          Discover modern shopping with a smart and elegant experience.
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 6, md: 0 },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: { xs: 3, sm: 4 },
            boxShadow: 3,
            borderRadius: 4,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Welcome back 
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Login to your 3legant account
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          <TextField
            {...register("email")}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("password")}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Typography variant="body2" sx={{ textAlign: "right", mt: 1 }}>
  <Link
    to="/forgot-password"
    style={{ textDecoration: "none" }}
  >
    <Box
      component="span"
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        fontWeight: 500,
        color: "primary.main",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "action.hover",
          textDecoration: "underline",
        },
      }}
    >
      Forgot Password?
    </Box>
  </Link>
</Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.4,
              mt: 3,
              borderRadius: 2,
            }}
          >
            LOGIN TO 3LEGANT
          </Button>

         <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
  New to 3legant?{" "}
  <Link to="/register" style={{ textDecoration: "none" }}>
    <Box
      component="span"
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        fontWeight: 600,
        color: "primary.main",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "action.hover",
          textDecoration: "underline",
        },
      }}
    >
      Create Account
    </Box>
  </Link>
</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;