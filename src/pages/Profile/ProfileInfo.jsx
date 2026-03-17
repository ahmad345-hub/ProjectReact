import React, { useState } from "react";
import useProfile from "../../hooks/useProfile";
import { 
  Box, Typography, Grid, Paper, Button, Dialog, DialogTitle, DialogContent 
} from "@mui/material";

import EditProfile from "../../components/EditProfile/EditProfile";
import ChangeEmailForm from "../../components/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import { useTranslation } from "react-i18next";

export default function ProfileInfo() {
  const { t } = useTranslation();
  const { data, isLoading } = useProfile();
  
  const [openEdit, setOpenEdit] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  if (isLoading) return <Typography>{t("Loading...")}</Typography>;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">{t("Name")}</Typography>
            <Typography>{data.fullName}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">{t("Email")}</Typography>
            <Typography>{data.email}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">{t("Phone")}</Typography>
            <Typography>{data.phoneNumber}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">{t("City")}</Typography>
            <Typography>{data.city || t("No city added")}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={3} display="flex" gap={2} flexWrap="wrap">
        <Button variant="contained" onClick={() => setOpenEdit(true)}>
          {t("Edit Profile")}
        </Button>
        <Button variant="outlined" onClick={() => setOpenEmail(true)}>
          {t("Change Email")}
        </Button>
        <Button variant="outlined" color="error" onClick={() => setOpenPassword(true)}>
          {t("Change Password")}
        </Button>
      </Box>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>{t("Edit Profile")}</DialogTitle>
        <DialogContent>
          <EditProfile onClose={() => setOpenEdit(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openEmail} onClose={() => setOpenEmail(false)} fullWidth>
        <DialogTitle>{t("Change Email")}</DialogTitle>
        <DialogContent>
          <ChangeEmailForm onClose={() => setOpenEmail(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={openPassword} onClose={() => setOpenPassword(false)} fullWidth>
        <DialogTitle>{t("Change Password")}</DialogTitle>
        <DialogContent>
          <ChangePasswordForm onClose={() => setOpenPassword(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}