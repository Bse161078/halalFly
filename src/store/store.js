import {configureStore} from '@reduxjs/toolkit'

import {
    registerUserApiReducer,
    logUserApiReducer,
    getUserApiReducer,
    getAllHotelsApiReducer,
    getHotelTravelCardsApiReducer
    ,
    getHotelTravelOptionsApiReducer,
    searchPackagesApiSliceReducer,
    createPaymentLinkApiSliceReducer,
    getTravelFormsApiReducer,
    getLandOptionsApiReducer
} from '../reducers';
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        registerUserApiReducer,
        logUserApiReducer,
        getUserApiReducer,
        getAllHotelsApiReducer,
        getHotelTravelCardsApiReducer,
        getHotelTravelOptionsApiReducer,
        searchPackagesApiSliceReducer,
        createPaymentLinkApiSliceReducer,
        getTravelFormsApiReducer,
        getLandOptionsApiReducer
    },
});
setupListeners(store.dispatch)

