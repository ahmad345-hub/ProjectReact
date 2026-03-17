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
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { schema } from "../../../Validation/schema.js";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation(); // استخدم t لترجمة النصوص
  const theme = useTheme();
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

      setOpenSuccess(true);
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
        setServerError(t("Network error or server not reachable"));
      }
    } finally {
      setLoading(false);
    }
  };

  const primaryBlue = "#1976d2";

  return (
    <>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          mt: "64px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: theme.palette.mode === "dark" ? "#111" : "#f5f5f5",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 3, md: 6 },
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, letterSpacing: "6px" }}
          >
            3le
            <Box component="span" sx={{ color: "#ffb703" }}>
              gant
            </Box>
          </Typography>

          <Typography
            sx={{ mt: 1, fontSize: "13px", letterSpacing: "3px", color: theme.palette.text.secondary }}
          >
            {t("MODERN E-COMMERCE")}
          </Typography>

          <Divider sx={{ width: 80, my: 3, bgcolor: theme.palette.text.secondary }} />

          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.secondary, textAlign: "center", maxWidth: 400 }}
          >
            {t("Smart shopping starts here.")}
          </Typography>
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 0 },
          }}
        >
          <Box
            component="form"
            sx={{
              width: "100%",
              maxWidth: 380,
              backgroundColor: theme.palette.mode === "dark" ? "#222" : "#fff",
              p: 4,
              borderRadius: 2,
              boxShadow: theme.palette.mode === "dark" ? "0 0 10px rgba(255,255,255,0.1)" : "0 0 10px rgba(0,0,0,0.1)",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: primaryBlue }}>
              {t("Create your account")}
            </Typography>

            {serverError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {serverError}
              </Alert>
            )}

            <TextField
              {...register("fullName")}
              fullWidth
              label={t("Full Name")}
              margin="normal"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              sx={{ input: { color: theme.palette.text.primary }, label: { color: theme.palette.text.secondary } }}
            />

            <TextField
              {...register("userName")}
              fullWidth
              label={t("Username")}
              margin="normal"
              error={!!errors.userName}
              helperText={errors.userName?.message}
              sx={{ input: { color: theme.palette.text.primary }, label: { color: theme.palette.text.secondary } }}
            />

            <TextField
              {...register("email")}
              fullWidth
              label={t("Email Address")}
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ input: { color: theme.palette.text.primary }, label: { color: theme.palette.text.secondary } }}
            />

            <TextField
              {...register("phoneNumber")}
              fullWidth
              label={t("Phone Number")}
              margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              sx={{ input: { color: theme.palette.text.primary }, label: { color: theme.palette.text.secondary } }}
            />

            <TextField
              {...register("password")}
              fullWidth
              label={t("Password")}
              type="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ input: { color: theme.palette.text.primary }, label: { color: theme.palette.text.secondary } }}
            />

            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Checkbox sx={{ color: primaryBlue }} />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {t("I agree to the Terms & Privacy Policy")}
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
                backgroundColor: primaryBlue,
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : t("Sign Up")}
            </Button>

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center", color: theme.palette.text.secondary }}>
              {t("Already have an account?")}{" "}
              <Link to="/login" style={{ textDecoration: "none", fontWeight: 500, padding: "2px 6px", borderRadius: 4, color: primaryBlue }}>
                {t("Sign in")}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={() => setOpenSuccess(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: "100%" }}>
          {t("Account created successfully 🎉")}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;