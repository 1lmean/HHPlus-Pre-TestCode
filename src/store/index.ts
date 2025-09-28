import {configureStore} from "@reduxjs/toolkit"

import todosReducer from "./todoSlice"

export const store = configureStore({
  reducer: {
    todos: todosReducer
  },
});

// 타입스크립트에서 사용할 타입 export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
