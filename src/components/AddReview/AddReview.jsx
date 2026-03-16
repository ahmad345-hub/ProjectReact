import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import useAddReview from "../../hooks/useAddReview.jsx";

export default function AddReview({ productId, onNewReview }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const addReview = useAddReview(productId);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;

    addReview.mutate(
      { rating, comment },
      {
        onSuccess: () => {
          // تحديث الريفيوز مباشرة في المكون الأب إذا مررنا onNewReview
          if (onNewReview) onNewReview({ id: Date.now(), rating, comment });
          setComment("");
          setRating(5);
        },
        onError: (error) => {
          console.error("Failed to add review:", error);
        },
      }
    );
  };

  return (
    <Box sx={{ mt: 1 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <TextField
            type="number"
            label="Rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            inputProps={{ min: 1, max: 5 }}
            size="small"
            sx={{ width: 80 }}
          />
          <TextField
            type="text"
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            size="small"
            fullWidth
            placeholder="Write your review..."
          />
        </Box>
        <Button type="submit" variant="contained" size="small" disabled={addReview.isLoading}>
          {addReview.isLoading ? "Submitting..." : "Add Review"}
        </Button>
      </form>

      {addReview.isError && (
        <Typography color="error" variant="body2">
          Error adding review
        </Typography>
      )}
      {addReview.isSuccess && (
        <Typography color="green" variant="body2">
          Review added!
        </Typography>
      )}
    </Box>
  );
}