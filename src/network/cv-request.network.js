import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get(`/admin/provider-cv-request/`);
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/provider-cv-request/${id}/`)
}

/* resource show */
export const PaymentStatusUpdate = async (id) => {
    return await privateRequest.put(`/admin/provider-cv-request-update/${id}`)
}