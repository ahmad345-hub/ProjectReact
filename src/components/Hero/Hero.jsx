import { useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";

import sofa1 from "../../assets/sofa1.png";
import sofa2 from "../../assets/sofa2.png";
import sofa3 from "../../assets/sofa3.png";

export default function Hero() {
  const theme = useTheme(); // جلب الثيم
  const images = [sofa1, sofa2, sofa3];
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="pt-[70px]">
      <Box className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[536px] relative overflow-hidden">
        <img
          src={images[current]}
          alt="slider"
          className="w-full h-full object-cover"
        />

        {/* left arrow */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            left: { xs: 2, sm: 4, md: 5 },
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            width: { xs: 32, sm: 36, md: 40 },
            height: { xs: 32, sm: 36, md: 40 },
            borderRadius: "50%",
            boxShadow: 3,
            color: "text.primary",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          ❮
        </IconButton>

        {/* right arrow */}
        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            right: { xs: 2, sm: 4, md: 5 },
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            width: { xs: 32, sm: 36, md: 40 },
            height: { xs: 32, sm: 36, md: 40 },
            borderRadius: "50%",
            boxShadow: 3,
            color: "text.primary",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          ❯
        </IconButton>

        {/* dots */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 3, sm: 4, md: 6 },
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrent(index)}
              sx={{
                width: { xs: 8, sm: 12 },
                height: { xs: 8, sm: 12 },
                borderRadius: "50%",
                bgcolor:
                  current === index
                    ? "text.primary"
                    : "text.primary",
                opacity: current === index ? 1 : 0.5,
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
}