import { configureStore } from "@reduxjs/toolkit";
import covidSlice from "./covid-slice";

const store = configureStore({
  reducer: {
    covid: covidSlice.reducer,
  },
});

export type AppDispatch =   typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
