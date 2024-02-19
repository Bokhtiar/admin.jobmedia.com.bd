import {publicRequest} from '../config/axios.config'

export const login = async (data) => {
    return await publicRequest.post(`/account/jwt/create/`, data);
};

export const registration = async (data) => {
    return await publicRequest.post(`/admin/auth/register`, data);
};