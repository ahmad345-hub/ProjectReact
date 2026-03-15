import React, { useState } from "react";
import useProfile from "../../hooks/useProfile";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import EditProfile from "../../components/EditProfile/EditProfile.jsx";

export default function ProfileInfo() {
  const { data, isLoading } = useProfile();
  const [open, setOpen] = useState(false);

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

      {/* Edit Button */}
      <Box mt={3}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Edit Profile
        </Button>
      </Box>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent>
          <EditProfile />
        </DialogContent>

      </Dialog>

    </Box>
  );
}