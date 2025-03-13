import { configureStore } from "@reduxjs/toolkit";
import brandsReducer from "@/store/features/brands/brandsSlice";
import carsReducer from "@/store/features/cars/carsSlice";
import ordersReducer from "@/store/features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    brands: brandsReducer,
    cars: carsReducer,
    orders: ordersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
