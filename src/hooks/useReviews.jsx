import { useQuery } from "@tanstack/react-query";
import Authaxiosinstance from "../api/Authaxiosinstance.js";
export default function useReviews(productId) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await Authaxiosinstance.get(
        `https://knowledgeshop.runasp.net/api/Products/${productId}/reviews`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      return res.data;
    },
    staleTime: 1000 * 60, 
  });
}