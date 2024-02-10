import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (reqParams) => {
    return await privateRequest.get(`/admin/institute`, {
        params: { ...reqParams },
    });
};

/* Search from resources */
export const search = async (query) => {
    return await privateRequest.get(
        `/admin/institute?query=${query}`
    );
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/institute', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/institute/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/institute/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/institute/${id}`)
}
