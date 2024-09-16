import {createSlice} from "@reduxjs/toolkit";
import {
    registerUserApi,logUserApi,getUserApi,getAllHotelsApi,getHotelTravelCardsApi,
    getHotelTravelOptionsApi,searchPackagesApi,createPaymentLinkApi

} from 'src/services/index';
import {selectedLanguage} from "src/constants/service";

const initialState = {
    data: null,
    loading: false,
    error: null
}


const initialStateSelectedLanguage = {
    selectedLanguage: selectedLanguage,
    engList: [],
    urduList: [],
}


export const languageSlice = createSlice({
    name: 'language',
    initialState: initialStateSelectedLanguage,
    reducers: {
        updateSelectedLanguage: (state, {payload}) => {
            state.selectedLanguage = payload.selectedLanguage;
            state.engList = payload.engList;
            state.urduList = payload.urduList;

        }
    }
});


export const registerUserApiSlice = createSlice({
    name: 'registerUserApiSlice',
    initialState,
    reducers: {
        registerUserApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [registerUserApi.pending]: (state) => {
            state.loading = true
        },
        [registerUserApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [registerUserApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const logUserApiSlice = createSlice({
    name: 'logUserApiSlice',
    initialState,
    reducers: {
        logUserApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [logUserApi.pending]: (state) => {
            state.loading = true
        },
        [logUserApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [logUserApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getUserApiSlice = createSlice({
    name: 'getUserApiSlice',
    initialState,
    reducers: {
        getUserApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getUserApi.pending]: (state) => {
            state.loading = true
        },
        [getUserApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getUserApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getAllHotelsApiSlice = createSlice({
    name: 'getAllHotelsApiSlice',
    initialState,
    reducers: {
        getAllHotelsApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getAllHotelsApi.pending]: (state) => {
            state.loading = true
        },
        [getAllHotelsApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllHotelsApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getHotelTravelCardsApiSlice = createSlice({
    name: 'getHotelTravelCardsApiSlice',
    initialState,
    reducers: {
        getHotelTravelCardsApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getHotelTravelCardsApi.pending]: (state) => {
            state.loading = true
        },
        [getHotelTravelCardsApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getHotelTravelCardsApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});




export const getHotelTravelOptionsApiSlice = createSlice({
    name: 'getHotelTravelOptionsApiSlice',
    initialState,
    reducers: {
        getHotelTravelOptionsApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getHotelTravelOptionsApi.pending]: (state) => {
            state.loading = true
        },
        [getHotelTravelOptionsApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getHotelTravelOptionsApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const searchPackagesApiSlice = createSlice({
    name: 'searchPackagesApiSlice',
    initialState,
    reducers: {
        searchPackagesApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [searchPackagesApi.pending]: (state) => {
            state.loading = true
        },
        [searchPackagesApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [searchPackagesApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const createPaymentLinkApiSlice = createSlice({
    name: 'createPaymentLinkApiSlice',
    initialState,
    reducers: {
        createPaymentLinkApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [createPaymentLinkApi.pending]: (state) => {
            state.loading = true
        },
        [createPaymentLinkApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [createPaymentLinkApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const {registerUserApiReset} = registerUserApiSlice.actions
export const {logUserApiReset} = logUserApiSlice.actions;
export const {getUserApiReset} = getUserApiSlice.actions;
export const {getAllHotelsApiReset} = getAllHotelsApiSlice.actions;
export const {getHotelTravelCardsApiReset} = getHotelTravelCardsApiSlice.actions;
export const {getHotelTravelOptionsApiReset} = getHotelTravelOptionsApiSlice.actions;
export const {searchPackagesApiReset} = searchPackagesApiSlice.actions;
export const {createPaymentLinkApiReset} = createPaymentLinkApiSlice.actions;


export const registerUserApiReducer = registerUserApiSlice.reducer;
export const logUserApiReducer = logUserApiSlice.reducer;
export const getUserApiReducer = getUserApiSlice.reducer;
export const getAllHotelsApiReducer = getAllHotelsApiSlice.reducer;
export const getHotelTravelCardsApiReducer = getHotelTravelCardsApiSlice.reducer;
export const getHotelTravelOptionsApiReducer = getHotelTravelOptionsApiSlice.reducer;
export const searchPackagesApiSliceReducer = searchPackagesApiSlice.reducer;
export const createPaymentLinkApiSliceReducer = createPaymentLinkApiSlice.reducer;
