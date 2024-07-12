import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";

export default configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api)
})