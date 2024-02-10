import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (reqParams) => {
    return await privateRequest.get(`/admin/cv/request`, {
        params: { ...reqParams }
    });
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/cv/request/${id}`)
}

/* resource show */
export const PaymentStatusUpdate = async (id) => {
    return await privateRequest.put(`/admin/cv/request/payment/status/${id}`)
}

