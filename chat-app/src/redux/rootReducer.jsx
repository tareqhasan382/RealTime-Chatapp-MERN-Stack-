import { baseApi } from "./api/baseApi";
import authSliceReducer from "./auth/authSlice";
export const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSliceReducer,
  
};

