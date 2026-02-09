import {
  Box,
  Button,
  Checkbox,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  userName: yup
    .string()
    .required("Username is required")
    .matches(
      /^[A-Za-z0-9][A-Za-z0-9-_\.]*$/,
      "Username must start with letter/number and can contain -, _, ."
    ),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "Phone must be 10-15 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/auth/Account/Register",
        values
      );
      console.log("Server response:", response.data);
      alert("Account created successfully!");
      reset();
    } catch (error) {
      if (error.response) {
        alert(
          error.response.data.message +
            (error.response.data.errors ? " - " + error.response.data.errors.join(", ") : "")
        );
      } else {
        alert("Network error or server not reachable");
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
        <Typography sx={{ mt: 1, fontSize: "13px", letterSpacing: "3px", color: "text.secondary" }}>
          MODERN E-COMMERCE
        </Typography>
        <Divider sx={{ width: 80, my: 3 }} />
        <Typography variant="h6" sx={{ color: "text.secondary", textAlign: "center", maxWidth: 400 }}>
          Smart shopping starts here.
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", px: 3 }}>
        <Box component="form" sx={{ width: "100%", maxWidth: 380 }} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Create your account
          </Typography>

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
            <Typography variant="body2">I agree to the Terms & Privacy Policy</Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ py: 1.3, mt: 1, backgroundColor: "#111", "&:hover": { backgroundColor: "#000" } }}
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
