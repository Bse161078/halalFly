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
    formOptionsApiSliceReducer,  createHotelPaymentLinkApiReducer,
    createTravelCardPaymentLinkApiReducer,validateCouponApiReducer,
    getStaticHomeApiReducer,getB2bPackagesApiReducer,validateLandpackageCouponApiReducer,
    createGetInTouchApiReducer,
    createB2bFormApiReducer,getBookingDetailsApiReducer
    
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
        formOptionsApiSliceReducer,
        createHotelPaymentLinkApiReducer,
        createTravelCardPaymentLinkApiReducer,
        validateCouponApiReducer,
        getStaticHomeApiReducer,
        getB2bPackagesApiReducer,
        validateLandpackageCouponApiReducer,
        createGetInTouchApiReducer,
        createB2bFormApiReducer,
        getBookingDetailsApiReducer
        },
});
setupListeners(store.dispatch)

