import React from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoginUserMutation } from "../store/api/authApi";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(getValues());
      console.log("loginUser", response);
      if (response.data && !response.data.error) {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigate("home");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Welcome!",
        });
      } else {
        console.log("Login Error", response);
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.payload || response?.data?.payload,
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #74b49b 0%, #f4f9f4 100%)",
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: "#74b49b" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="username"
              variant="outlined"
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#74b49b",
                color: "#fff",
                "&:hover": { backgroundColor: "#68a391" },
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </form>

        <Divider sx={{ marginY: 3 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
            Login Credentials:
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> john@example.com
          </Typography>
          <Typography variant="body1">
            <strong>Password:</strong> john123
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;