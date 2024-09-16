import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseUl} from "src/constants/service";
import {getAccessToken} from "../utils";



axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if (error.message === "Network Error") {
        error.response.status = 101;
    }
    if (error.response.status === 401 || error.response.status === 403) {
        error.response.data.message = "Please authenticate";
    }
    return Promise.reject(error);
});


const registerUserApi = createAsyncThunk("registerUserApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}auth/register-email`, data);
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)




const logUserApi = createAsyncThunk("validateUserApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}auth/login-email`, data);
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getUserApi = createAsyncThunk("getUserApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}user/profile`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)




const getAllHotelsApi = createAsyncThunk("getAllHotelsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}hotels/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getHotelTravelCardsApi = createAsyncThunk("getHotelTravelCardsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}hotels/travel-cards`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getHotelTravelOptionsApi = createAsyncThunk("getHotelTravelOptionsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}hotels/travel-options`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const searchPackagesApi = createAsyncThunk("searchPackagesApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}package/search?search=${data.search}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const createPaymentLinkApi = createAsyncThunk("createPaymentLinkApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}package/create-payment-link`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)

export {
    registerUserApi,
    logUserApi,
    getUserApi,
    getAllHotelsApi,
    getHotelTravelCardsApi,
    getHotelTravelOptionsApi,
    searchPackagesApi,
    createPaymentLinkApi
}
