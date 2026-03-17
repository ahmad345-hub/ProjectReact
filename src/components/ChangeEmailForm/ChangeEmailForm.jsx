import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import useChangeEmail from "../../hooks/useChangeEmail";
import { useTranslation } from "react-i18next";

export default function ChangeEmailForm({ onClose }) {
  const { t } = useTranslation();
  const changeEmail = useChangeEmail();
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    changeEmail.mutate(newEmail, {
      onSuccess: () => {
        if (onClose) onClose(); 
        alert(t("Email changed successfully!"));
      },
      onError: (err) => {
        alert(err.response?.data?.message || t("Something went wrong"));
      }
    });
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400 }}
    >
      <TextField
        label={t("New Email")}
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        fullWidth
        required
      />

      <Button
        variant="contained"
        type="submit"
        disabled={changeEmail.isPending}
      >
        {t("Change Email")}
      </Button>
    </Stack>
  );
}