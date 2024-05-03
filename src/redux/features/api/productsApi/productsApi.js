import { baseApi } from "../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, brand }) => ({
        url: `/products`,
        params: { category, brand },
      }),
      // Enhanced error handling
      onError: (error) => {
        console.error("Error fetching products :", error);
        return { error: "An error occurred while fetching products" };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
