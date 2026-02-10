import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = async (values) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");

      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/auth/Account/Login",
        values
      );

      if (response.data.success) {
        setSuccessMsg("Login successful! 👁️"); 
      } else {
        setErrorMsg(response.data.message || "Login failed");
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message || "Server error");
      } else {
        setErrorMsg("Network error: cannot reach server");
      }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: 400, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
          Login
        </Typography>

        {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5, backgroundColor: "#111", "&:hover": { backgroundColor: "#000" } }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
