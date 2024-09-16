import {configureStore} from '@reduxjs/toolkit'

import {
    registerUserApiReducer,logUserApiReducer,getUserApiReducer,getAllHotelsApiReducer,getHotelTravelCardsApiReducer
    ,getHotelTravelOptionsApiReducer,searchPackagesApiSliceReducer
} from '../reducers';
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        registerUserApiReducer,logUserApiReducer,getUserApiReducer,getAllHotelsApiReducer,getHotelTravelCardsApiReducer,
        getHotelTravelOptionsApiReducer,searchPackagesApiSliceReducer
    },
});
setupListeners(store.dispatch)

