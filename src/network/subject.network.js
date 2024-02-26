import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (reqParams) => {
    return await privateRequest.get(`/admin/education-subjects/${reqParams}/`);
};

/* resource store */
export const store = async (reqParams, data) => {
    return await privateRequest.post(`/admin/education-subjects/${reqParams}/`, data)
}
 
/* resource show */
export const show = async (id, reqParams) => {
    return await privateRequest.get(`/admin/education-subjects/${reqParams}/${id}/`)
}

/* reosurce update */
export const update = async (id, data, reqParams) => {
    return await privateRequest.put(`/admin/education-subjects/${reqParams}/${id}/`, data)
}

/* resource destory */
export const destroy = async (reqParams,id) => {
    return await privateRequest.delete(`/admin/education-subjects/${reqParams}/${id}`)
}
