import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (reqParams) => {
    return await privateRequest.get(`/admin/degree`, {
        params: { ...reqParams },
    });
};

/* Search from resources */
export const search = async (query) => {
    return await privateRequest.get(
        `/admin/degree?query=${query}`
    );
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/degree', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/degree/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/degree/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/degree/${id}`)
}
