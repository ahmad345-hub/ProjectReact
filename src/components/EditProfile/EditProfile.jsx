import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import useProfile from "../../hooks/useProfile";

export default function EditProfile() {
  const { data } = useProfile();
  const updateProfile = useUpdateProfile();

  const [email, setEmail] = useState(data?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile.mutate({
      email: email
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
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        type="submit"
        disabled={updateProfile.isPending}
      >
        Update
      </Button>
    </Stack>
  );
}