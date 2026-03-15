import React, { useState } from "react";
import useProfile from "../../hooks/useProfile";
import { Box, Typography, Grid, Paper, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import EditProfile from "../../components/EditProfile/EditProfile.jsx";
import ChangeEmailForm from "../../components/ChangeEmailForm/ChangeEmailForm.jsx";

export default function ProfileInfo() {
  const { data, isLoading } = useProfile();
  const [openEdit, setOpenEdit] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">Name</Typography>
            <Typography>{data.fullName}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">Email</Typography>
            <Typography>{data.email}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">Phone</Typography>
            <Typography>{data.phoneNumber}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">City</Typography>
            <Typography>{data.city || "No city added"}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box mt={3} display="flex" gap={2}>
        <Button variant="contained" onClick={() => setOpenEdit(true)}>
          Edit Profile
        </Button>
        <Button variant="outlined" onClick={() => setOpenEmail(true)}>
          Change Email
        </Button>
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <EditProfile onClose={() => setOpenEdit(false)} />
        </DialogContent>
      </Dialog>

      {/* Change Email Dialog */}
      <Dialog open={openEmail} onClose={() => setOpenEmail(false)} fullWidth>
        <DialogTitle>Change Email</DialogTitle>
        <DialogContent>
          <ChangeEmailForm onClose={() => setOpenEmail(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}