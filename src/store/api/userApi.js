import api from "./api";

export const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => {
        return {
          url: "register",
          method: "POST",
          body: data,
        };
      },
    }),

    getAllUsers: builder.query({
      query: () => "users",
    }),

    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `users/${data.id}`, // Assuming the user has an `id` field
          method: "PUT",
          body: data,
        };
      },
    }),

    deleteUser: builder.mutation({
      query: (userId) => {
        return {
          url: `users/${userId}`,
          method: "DELETE",
        };
      },
    }),



  }),
});

export const {
  useAddUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;