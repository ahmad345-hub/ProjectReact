import { useMutation, useQueryClient } from "@tanstack/react-query";
import Authaxiosinstance from "../api/Authaxiosinstance";

export default function useAddtoCart() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ ProductId, Count }) => {
      return await Authaxiosinstance.post("/carts/", { ProductId, Count });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["Carts"], (oldData) => {
        if (!oldData)
          return {
            items: [{ ProductId: variables.ProductId, count: variables.Count }],
          };

        const existingItemIndex = oldData.items.findIndex(
          (item) => item.ProductId === variables.ProductId,
        );
        if (existingItemIndex !== -1) {
          const newItems = [...oldData.items];
          newItems[existingItemIndex].count += variables.Count;
          return { ...oldData, items: newItems };
        }

        return {
          ...oldData,
          items: [
            ...oldData.items,
            { ProductId: variables.ProductId, count: variables.Count },
          ],
        };
      });

      queryClient.invalidateQueries({ queryKey: ["Carts"] });
    },
  });

  return mutation;
}
