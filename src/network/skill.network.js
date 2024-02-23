import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (reqParams) => {
    return await privateRequest.get(`/admin/skill/`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/skill/', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/skill/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/skill/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/skill/${id}`)
}
