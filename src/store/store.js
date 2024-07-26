import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import localStorage from "./middleware/localStorage";

export default configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['api/callBegan']
        }
    }).concat(api, localStorage)
})