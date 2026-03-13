import React, { useState, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";

import sof from "../../assets/sof.png";
import lamp1 from "../../assets/lamp1.png";
import lamp2 from "../../assets/lamp2.png";
import basket from "../../assets/basket.png";
import twister from "../../assets/twister.png";

export default function NewArrival() {
  const theme = useTheme();

  const products = [
    { id: 1, name: "Loveseat Sofa", price: 199, oldPrice: 400, image: sof },
    { id: 2, name: "Table Lamp", price: 24.99, image: lamp1 },
    { id: 3, name: "Beige Table Lamp", price: 24.99, image: lamp2 },
    { id: 4, name: "Bamboo Basket", price: 24.99, image: basket },
    { id: 5, name: "Twister", price: 224.99, image: twister },
  ];

  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => {
    setIsDown(false);
    const slider = sliderRef.current;
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    }
  };
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Box className="max-w-7xl mx-auto py-12">
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={4}
        sx={{ color: "text.primary" }}
      >
        New Arrivals
      </Typography>

      <Box
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing scroll-smooth"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              minWidth: { xs: 220, sm: 250, md: 260 },
              backgroundColor: "background.paper", // يتغير حسب الثيم
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              transition: "0.3s",
              cursor: "pointer",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                backgroundColor: "background.default",
                p: 2,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "action.disabledBackground",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.7rem",
                }}
              >
                NEW
              </Typography>

              {product.oldPrice && (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "success.main",
                    color: "common.white",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.7rem",
                  }}
                >
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </Typography>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="h-32 mx-auto object-contain hover:scale-110 transition"
              />
            </Box>

            <Typography
              mt={1}
              fontWeight={500}
              fontSize="0.9rem"
              sx={{ color: "text.primary" }}
            >
              {product.name}
            </Typography>

            <Typography sx={{ color: "#FFD700", fontSize: "0.8rem" }}>★★★★★</Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontWeight={700} sx={{ color: "text.primary" }}>
                ${product.price}
              </Typography>
              {product.oldPrice && (
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                    fontSize: "0.8rem",
                  }}
                >
                  ${product.oldPrice}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}