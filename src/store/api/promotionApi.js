import api from "./api";

export const promotionApi = api.injectEndpoints({
  reducerPath: "promotionApi",
  endpoints: (builder) => ({
    addPromotion: builder.mutation({
      query: (data) => {
        return {
          url: "promotions2",
          method: "POST",
          body: data,
        };
      },
    }),

    getAllPromotions: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return 'promotions';
      },
    }),

    getPromotionById: builder.query({
        query: (id) => `promotions/${id}`,
    }),

    updatePromotion: builder.mutation({
        query: (data) => {
          return {
            url: `promotions/${data.get("id")}`,
            method: "PUT",
            body: data,
          };
        },
    }),

    deletePromotion: builder.mutation({
        query: (id) => ({
          url: `promotions/${id}`,
          method: "DELETE",
        }),
    }),

    
  }),
});

export const { 
    useAddPromotionMutation, 
    useGetAllPromotionsQuery,  
    useGetPromotionByIdQuery,
    useUpdatePromotionMutation,
    useDeletePromotionMutation
} = promotionApi;