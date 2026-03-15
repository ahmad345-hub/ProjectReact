import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import useChangePassword from "../../hooks/useChangePassword";

export default function ChangePasswordForm({ onClose }) {
  const changePassword = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirmation do not match!");
      return;
    }

    changePassword.mutate(
      {
        CurrentPassword: currentPassword,
        NewPassword: newPassword,
        ConfirmNewPassword: confirmNewPassword,
      },
      {
        onSuccess: () => {
          if (onClose) onClose(); // يغلق الديالوج بعد النجاح
          alert("Password changed successfully!");
        },
      }
    );
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400 }}
    >
      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        fullWidth
        required
      />

      <Button
        variant="contained"
        type="submit"
        disabled={changePassword.isPending}
      >
        Change Password
      </Button>
    </Stack>
  );
}