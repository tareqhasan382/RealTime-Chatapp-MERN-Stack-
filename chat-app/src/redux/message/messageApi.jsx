// router.get("/message/:chatId", getMessages);
// router.post("/message", createMessage);

import { baseApi } from "../api/baseApi";
export const messageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // sendMessage: build.mutation({
    //     query: (data) => ({
    //       url: "/api/v1/message",
    //       method: "POST",
    //       body: data,
    //     }),
    //     invalidatesTags: ["chat"],
    //   }),
    sendMessage: build.mutation({
        query: (data) => ({
            url: "/api/v1/message",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ["chat"],
    }),
    getMessage: build.query({
        query: (chat) => ({
          url: `/api/v1/message/${chat}`,
          method: "GET",
        }),
        providesTags:["chat"]
      }),
  }),
});

export const {useGetMessageQuery,useSendMessageMutation} =
messageApi;