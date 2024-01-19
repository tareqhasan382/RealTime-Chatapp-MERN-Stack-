import { baseApi } from "../api/baseApi";
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getChat: build.query({
        query: (user) => ({
          url: `/api/v1/chat/${user?.userId}`,
          method: "GET",
        }),
        providesTags:["chat"]
      }),
  }),
});

export const { useGetChatQuery} =
  authApi;
//   router.post("/chat", createChatController);
//   router.get("/chat/:userId", getChatController);
//   router.get("/find/:firstId/:secondId", findChat);