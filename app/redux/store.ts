import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categoriesSlice";
import authReducer from "./slices/authSlice";
import categoryDetailReducer from "./slices/categoryDetailSlice";
import jobListReducer from "./slices/jobListSlice";
import jobDetailReducer from "./slices/jobDetailSlice";
import reviewReducer from "./slices/reviewSlice";
import commentReducer from "./slices/commentSlice";
import searchReducer from "./slices/searchSlice";
import userReducer from "./slices/userSlice";
import jobsReducer from "./slices/jobsSlice";
const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
    categoryDetail: categoryDetailReducer,
    jobList: jobListReducer,
    jobDetail: jobDetailReducer,
    reviews: reviewReducer,
    comments: commentReducer,
    search: searchReducer,
    user: userReducer,
    jobs: jobsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
