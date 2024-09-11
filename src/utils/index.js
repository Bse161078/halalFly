import {isPossiblePhoneNumber} from 'react-phone-number-input'
import moment from "moment";


export const validateUserInput = (objectToValidate) => {
    let isValid = true
    for (const prop in objectToValidate) {

        if (!objectToValidate[prop].optional || (prop === "email" && objectToValidate[prop].value && (objectToValidate[prop].value).trim().length > 0)) {
            if ((objectToValidate[prop].value && (objectToValidate[prop].value).trim().length > 0)
                || (typeof objectToValidate[prop].value === "number" && !isNaN(objectToValidate[prop].value))) {
                if (prop === "username" || prop === "email") {
                    if (!objectToValidate[prop].value.toLowerCase().match(/^\S+@\S+\.\S+$/)) {
                        objectToValidate[prop] = {
                            ...objectToValidate[prop],
                            showError: true,
                            error: "Please provide valid email address"
                        };
                        isValid = false;
                    } else {
                        objectToValidate[prop].showError = false;
                    }
                } else if (prop === "phone") {
                    if (!isPossiblePhoneNumber("+92" + objectToValidate[prop].value)) {
                        objectToValidate[prop] = {
                            ...objectToValidate[prop],
                            showError: true,
                            error: "Please provide valid phone number"
                        };
                        isValid = false;
                    } else {
                        objectToValidate[prop].showError = false;
                    }
                } else {
                    objectToValidate[prop].showError = false;
                }
            } else {
                objectToValidate[prop].showError = true;
                isValid = false;
            }
        }
    }
    return {isValid, data: objectToValidate};
}



export const transformValidateObject = (obejctToTransform) => {
    let newObject = {};
    for (const prop in obejctToTransform) {
        if (prop === "location" && obejctToTransform[prop].value) {
            newObject[prop] = `${(obejctToTransform[prop].value).lat},${(obejctToTransform[prop].value).lng}`;
        } else {
            if (obejctToTransform[prop])
                newObject[prop] = obejctToTransform[prop].value;
        }
    }
    return newObject;
}


export const saveToken = async (token) => {
    await localStorage.setItem("token", token)
}

export const getToken = () => {
    return localStorage.getItem("token")
}


export const getAccessToken=()=>{
    try {
        const token = getToken().replaceAll('"','')  || "";
        return token
    }catch (e) {
        return "";
    }
}


export const removeAccessToken = () => {
    localStorage.removeItem("token")
}


export const getFormattedDate=(date)=>{
    return moment(date).format("MM-DD-yyyy").toString()
}


export const getFormattedDateTime=(dateTime)=>{
    return moment(dateTime).format("MM-DD-yyyy")
}


export const isObject = (val)=> {
    const isObject= (typeof val === 'object');
    return isObject;
}
