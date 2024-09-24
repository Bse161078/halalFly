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
    getLandOptionsApiReducer,
    createHotelPaymentLinkApiReducer,
    createTravelCardPaymentLinkApiReducer
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
        getLandOptionsApiReducer,
        createTravelCardPaymentLinkApiReducer,
        createHotelPaymentLinkApiReducer
    },
});
setupListeners(store.dispatch)

