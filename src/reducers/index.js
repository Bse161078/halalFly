import {createSlice} from "@reduxjs/toolkit";
import {
    registerUserApi,logUserApi,getUserApi,getAllHotelsApi,getHotelTravelCardsApi,
    getHotelTravelOptionsApi,searchPackagesApi,getLandOptions
    ,getFormOptionsApi,createHotelPaymentLinkApi,createTravelCardPaymentLinkApi,
    getStaticHomeApi,validateCouponApi

} from 'src/services/index';
import {selectedLanguage} from "src/constants/service";

const initialState = {
    data: [],
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
            state.data = [];
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

 const getLandOptionsApiSlice = createSlice({
    name: 'getLandOptionsApiSlice',
    initialState,
    reducers: {
        // Reset action to clear data and errors
        getLandOptionsApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        // Handle the pending state of the thunk
        [getLandOptions.pending]: (state) => {
            state.loading = true;
            state.error = null;  // Clear any previous errors
        },
        // Handle the fulfilled state of the thunk
        [getLandOptions.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;  // Store the response data
        },
        // Handle the rejected state of the thunk
        [getLandOptions.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Store the error message
        },
    },
});
const getFormOptionsApiSlice = createSlice({
    name: 'getFormOptionsApiSlice',
    initialState,
    reducers: {
        // Reset action to clear data and errors
        getFormOptionsApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        // Handle the pending state of the thunk
        [getFormOptionsApi.pending]: (state) => {
            state.loading = true;
            state.error = null;  // Clear any previous errors
        },
        // Handle the fulfilled state of the thunk
        [getFormOptionsApi.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;  // Store the response data
        },
        // Handle the rejected state of the thunk
        [getFormOptionsApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Store the error message
        },
    },
});

export const createTravelCardPaymentLinkApiSlice = createSlice({
    name: 'createTravelCardPaymentLinkApiSlice',
    initialState,
    reducers: {
        createTravelCardPaymentLinkApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [createTravelCardPaymentLinkApi.pending]: (state) => {
            state.loading = true
        },
        [createTravelCardPaymentLinkApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [createTravelCardPaymentLinkApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const createHotelPaymentLinkApiSlice = createSlice({
    name: 'createHotelPaymentLinkApiSlice',
    initialState,
    reducers: {
        createHotelPaymentLinkApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [createHotelPaymentLinkApi.pending]: (state) => {
            state.loading = true
        },
        [createHotelPaymentLinkApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [createHotelPaymentLinkApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});

export const getStaticHomeApiSlice = createSlice({
    name: 'getStaticHomeApiSlice',
    initialState,
    reducers: {
      getStaticHomeApiReset: (state) => {
        state.loading = false;
        state.error = null;
        state.data = null;
      },
    },
    extraReducers: {
      [getStaticHomeApi.pending]: (state) => {
        state.loading = true;
      },
      [getStaticHomeApi.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      },
      [getStaticHomeApi.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  export const validateCouponApiSlice = createSlice({
    name: 'validateCouponApiSlice',
    initialState,
    reducers: {
      validateCouponApiReset: (state) => {
        state.loading = false;
        state.error = null;
        state.data = null;
      },
    },
    extraReducers: {
      [validateCouponApi.pending]: (state) => {
        state.loading = true;
      },
      [validateCouponApi.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      },
      [validateCouponApi.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
export const { getLandOptionsApiReset } = getLandOptionsApiSlice.actions;
export const { getFormOptionsApiReset } = getFormOptionsApiSlice.actions;
export const {createTravelCardPaymentLinkApiReset} = createTravelCardPaymentLinkApiSlice.actions;
export const {createHotelPaymentLinkApiReset} = createHotelPaymentLinkApiSlice.actions;
export const {validateCouponApiReset} = validateCouponApiSlice.actions;
export const {getStaticHomeApiReset} =  getStaticHomeApiSlice.actions;

export const registerUserApiReducer = registerUserApiSlice.reducer;
export const logUserApiReducer = logUserApiSlice.reducer;
export const getUserApiReducer = getUserApiSlice.reducer;
export const getAllHotelsApiReducer = getAllHotelsApiSlice.reducer;
export const getHotelTravelCardsApiReducer = getHotelTravelCardsApiSlice.reducer;
export const getHotelTravelOptionsApiReducer = getHotelTravelOptionsApiSlice.reducer;
export const searchPackagesApiSliceReducer = searchPackagesApiSlice.reducer;
export const landOptionsApiSliceReducer = getLandOptionsApiSlice.reducer;
export const formOptionsApiSliceReducer = getFormOptionsApiSlice.reducer;
export const createTravelCardPaymentLinkApiReducer = createTravelCardPaymentLinkApiSlice.reducer;
export const createHotelPaymentLinkApiReducer = createHotelPaymentLinkApiSlice.reducer;
export const validateCouponApiReducer= validateCouponApiSlice.reducer;
export const getStaticHomeApiReducer = getStaticHomeApiSlice.reducer;