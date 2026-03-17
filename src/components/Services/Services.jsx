import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Services() {
  const theme = useTheme();
  const { t } = useTranslation();

  const services = [
    { icon: "🚚", title: "Free Shipping", desc: "Order above $200" },
    { icon: "💳", title: "Money-back", desc: "30 days guarantee" },
    { icon: "🔒", title: "Secure Payments", desc: "Secured by Stripe" },
    { icon: "📞", title: "24/7 Support", desc: "Phone and Email support" },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", py: 10 }}>
      <Box
        sx={{
          maxWidth: "1440px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4,1fr)" },
          gap: 3,
          px: 4,
        }}
      >
        {services.map((service, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { boxShadow: 4 },
            }}
          >
            <Typography variant="h3">{service.icon}</Typography>
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ color: "text.primary" }}>
                {t(service.title)}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {t(service.desc)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}