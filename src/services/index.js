import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseUl} from "src/constants/service";
import {getAccessToken} from "../utils";

const validateAdmin = createAsyncThunk("validateAdminApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}auth/login`, data);
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getUserStats = createAsyncThunk("getUserStats", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/user-stats`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getAllUsers = createAsyncThunk("getAllUsers", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}user/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllWaivers = createAsyncThunk("getAllWaivers", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}waiver`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)

const getAllOrganizerPartners = createAsyncThunk("getAllOrganizerPartners", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/organization-partner/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getAllEvents = createAsyncThunk("getAllEvents", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/events/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const postOrganization = createAsyncThunk("postOrganization", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/organization`, data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllOrganization = createAsyncThunk("getAllOrganization", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/organization/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const blockUnblock = createAsyncThunk("blockUnblock", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUl}user/blocked-status`, data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const cancelSubscription = createAsyncThunk("cancelSubscription", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}payment/cancel-subscription`, data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const blockUnblockPartner = createAsyncThunk("blockUnblockPartner", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/block/partner`, data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteEvent = createAsyncThunk("deleteEvent", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}users/event/${data}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const sendFirebasePushNotifications = createAsyncThunk("sendFirebasePushNotifications", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/notification`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const postStaticData = createAsyncThunk("postStaticData", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}static`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getStaticDataByType = createAsyncThunk("getStaticDataByType", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}static/type/${data}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)




const getAllEventDetails = createAsyncThunk("getAllEventDetails", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/event/details/${data}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const postEventDetails = createAsyncThunk("postEventDetails", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUl}event/${data.id}/admin`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteUser = createAsyncThunk("deleteUser", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}users/${data}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return {success:true};
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllPartners = createAsyncThunk("getAllPartners", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/partners/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deletePartnerById= createAsyncThunk("deletePartnerById", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}partners/${data}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return {success:true};
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)

const getPartnerDetails = createAsyncThunk("getPartnerDetails", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}reservation/partner/${data}/admin`,
                {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllVenues = createAsyncThunk("getAllVenues", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/venues/all`,
                {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteVenueById= createAsyncThunk("deleteVenueById", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}venue/${data}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return {success:true};
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getAllEventOfReservations= createAsyncThunk("getAllEventReservations", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}reservation/event/${data}/admin`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const updatePasswordAdminApi = createAsyncThunk("updatePasswordAdminApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUl}users/updatePassword/admin`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getAllExperiences = createAsyncThunk("getAllExperiences", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}experience`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllGroupsApi = createAsyncThunk("getAllGroups", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}group`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getAllGameMastersApi = createAsyncThunk("getAllGameMastersApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}game-master`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)




const postSubscriptionPackageApi = createAsyncThunk("postSubscriptionPackageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}package`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getSubscriptionPackageApi = createAsyncThunk("getSubscriptionPackageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}package`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const updateSubscriptionPackageApi = createAsyncThunk("updateSubscriptionPackageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUl}package/${data.packageId}`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const deletePackageApi = createAsyncThunk("deletePackageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}package/${data.packageId}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


export {
    validateAdmin,
    getUserStats,
    getAllUsers,
    getAllOrganizerPartners,
    getAllEvents,
    postOrganization,
    getAllOrganization,
    blockUnblock,
    cancelSubscription,
    blockUnblockPartner,
    deleteEvent,
    sendFirebasePushNotifications,
    postStaticData,
    getStaticDataByType,
    getAllEventDetails,
    postEventDetails,
    deleteUser,
    getAllPartners,
    deletePartnerById,
    getPartnerDetails,
    getAllVenues,
    deleteVenueById,
    getAllEventOfReservations,
    updatePasswordAdminApi,
    getAllWaivers,
    getAllExperiences,
    getAllGroupsApi,
    getAllGameMastersApi,
    postSubscriptionPackageApi,
    getSubscriptionPackageApi,
    updateSubscriptionPackageApi,
    deletePackageApi
}
