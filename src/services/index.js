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
            const response = await axios.get(`${baseUl}user/profile`,
            );

            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)




const getAllHotelsApi = createAsyncThunk("getAllHotelsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}hotels/all`,
            );
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getHotelTravelCardsApi = createAsyncThunk("getHotelTravelCardsApi", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUl}hotels/travel-cards`, 
        );
        return response.data.data;
    } catch (e) {
        const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
        return rejectWithValue(errorResponse);
    }
});



const getHotelTravelOptionsApi = createAsyncThunk("getHotelTravelOptionsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}hotels/travel-options`,
            );
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)
export const getLandOptions = createAsyncThunk(
    "landOptions/getLandOptions", 
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUl}hotels/land-options`, {
                
            
            });
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
);

export const getFormOptionsApi = createAsyncThunk(
    "formOptions/getFormOptions", 
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUl}hotels/travel-forms`, {
               
            
            });
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
);

const searchPackagesApi = createAsyncThunk("searchPackagesApi", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${baseUl}package/search?search=${data.search}`,
        );
        return response.data.data;
    } catch (e) {
        const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
        return rejectWithValue(errorResponse);
    }
}
)

const getB2bPackagesApi = createAsyncThunk("landPackagesApi", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${baseUl}package/b2b-pacakges`,
        );
        return response.data.data;
    } catch (e) {
        const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
        return rejectWithValue(errorResponse);
    }
}
)



// const searchPackagesApi = createAsyncThunk("searchPackagesApi", async (data, {rejectWithValue}) => {
//         try {
//             const response = await axios.get(`${baseUl}package/search?search=${data.search}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
//             return response.data.data;
//         } catch (e) {
//             const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
//             return rejectWithValue(errorResponse);
//         }
//     }
// )



const createPaymentLinkApi = createAsyncThunk("createPaymentLinkApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}package/create-payment-travel-cards`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)




const getTravelFormsApi = createAsyncThunk("getTravelFormsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}hotels/travel-forms`,
            );
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getLandOptionsApi = createAsyncThunk("getLandOptionsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}hotels/land-options`,
            );
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)




const createTravelCardPaymentLinkApi = createAsyncThunk("createTravelCardPaymentLinkApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}package/create-payment-travel-cards`,data,
            );
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const createHotelPaymentLinkApi = createAsyncThunk("createHotelPaymentLinkApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}package/create-payment-hotel`,data,
                );
            return response.data.data;
        } 
        catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)

export const getStaticHomeApi = createAsyncThunk(
    'getStaticHomeApi',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${baseUl}static/home`, {
        });
        return response.data.data;
      } catch (e) {
        const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";

        return rejectWithValue(errorResponse);
      }
    }
  );
  
  export const getBookingDetails = createAsyncThunk(
    'getBookingDetails',
    async (bookingId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${baseUl}package/booking-details/${bookingId}`);
        return response.data.data; // Assumes 'data.data' structure is correct based on API response
      } catch (e) {
        const errorResponse = e.response && e.response.data && e.response.data.message 
          ? e.response.data.message 
          : "Server error";
  
        return rejectWithValue(errorResponse);
      }
    }
  );
  

  // POST request to 'package/validate-coupon'
  export const validateCouponApi = createAsyncThunk(
    'validateCouponApi',
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${baseUl}package/validate-coupon`,
          data
        );
        return response.data.data;
      } catch (e) {
        const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
        console.log("errorResponse",errorResponse)

        return rejectWithValue(errorResponse);
      }
    }
  );

  export const validateLandpackageCouponApi = createAsyncThunk(
    'validateLandpackageCouponApi',
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${baseUl}package/validate-land-coupon`,
          data
        );
        return response.data.data;
      } catch (e) {
        const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
        console.log("errorResponse",errorResponse)

        return rejectWithValue(errorResponse);
      }
    }
  );


  const createGetInTouch = createAsyncThunk("createGetInTouch", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseUl}static/get-in-touch`,data);
        return response.data.data;
    } catch (e) {
        const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
        return rejectWithValue(errorResponse);
    }
}
)
const createB2bForm = createAsyncThunk("createB2bForm", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseUl}static/b2b-form`,data);
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
    createPaymentLinkApi,
    getTravelFormsApi,
    getLandOptionsApi,
    createTravelCardPaymentLinkApi,
    createHotelPaymentLinkApi,
    getB2bPackagesApi,
    createGetInTouch,
    createB2bForm
}
