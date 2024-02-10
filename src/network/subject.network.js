import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (reqParams) => {
    return await privateRequest.get(`/admin/subject`, {
        params: { ...reqParams },
    });
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/subject', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/subject/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/subject/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/subject/${id}`)
}
