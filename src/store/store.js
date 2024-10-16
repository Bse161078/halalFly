import {configureStore} from '@reduxjs/toolkit'

import {
    registerUserApiReducer,logUserApiReducer,formOptionsApiSliceReducer,getUserApiReducer,getAllHotelsApiReducer,getHotelTravelCardsApiReducer,getHotelTravelOptionsApiReducer,searchPackagesApiSliceReducer,landOptionsApiSliceReducer
} from '../reducers';
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        registerUserApiReducer,logUserApiReducer,getUserApiReducer,getAllHotelsApiReducer,getHotelTravelCardsApiReducer,
        getHotelTravelOptionsApiReducer,searchPackagesApiSliceReducer,landOptionsApiSliceReducer,formOptionsApiSliceReducer
    },
});
setupListeners(store.dispatch)

