import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import useChangePassword from "../../hooks/useChangePassword";
import { useTranslation } from "react-i18next";

export default function ChangePasswordForm({ onClose }) {
  const { t } = useTranslation();
  const changePassword = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert(t("Passwords do not match!"));
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
          if (onClose) onClose();
          alert(t("Password changed successfully!"));
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
        label={t("Current Password")}
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label={t("New Password")}
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label={t("Confirm New Password")}
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
        {t("Change Password")}
      </Button>
    </Stack>
  );
}