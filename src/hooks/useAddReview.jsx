import { useMutation, useQueryClient } from "@tanstack/react-query";
import Authaxiosinstance from "../api/Authaxiosinstance.js";

export default function useAddReview(productId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ rating, comment }) => {
  const body = { rating, comment }; // ❌ لا ترسل productId هنا
  console.log("Sending review:", body);
  console.log("Token:", localStorage.getItem("token"));

  return Authaxiosinstance.post(
    `https://knowledgeshop.runasp.net/api/Products/${productId}/reviews`,
    body, // ✅ فقط rating و comment
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
},
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
    },
  });
}