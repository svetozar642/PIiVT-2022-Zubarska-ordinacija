import { configureStore , combineReducers } from "@reduxjs/toolkit";
import { AuthStoreReducer, DefaultAuthStoreData } from "./AuthReducer";

const reducer = combineReducers({
    auth: AuthStoreReducer,
});

function getStoredApPStoreData(): object {
    if (!localStorage.getItem('app-store-data')) {
        return {};
    }

    const data = JSON.parse(localStorage.getItem('app-store-data') ?? '{}');

    if (typeof data !== "object") {
        return {};
    }

    return data;
}

const AppStore = configureStore({
    reducer: reducer,
    preloadedState: {
        auth: {
            ...JSON.parse(JSON.stringify(DefaultAuthStoreData)),
        },
        ...getStoredApPStoreData(),
    },
});

AppStore.subscribe(() => {
    localStorage.setItem('app-store-data', JSON.stringify(AppStore.getState()));
});


export type TAuthStoreDispatch = typeof AppStore.dispatch;

export default AppStore;