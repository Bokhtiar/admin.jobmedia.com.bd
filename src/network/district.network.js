import { privateRequest } from '../config/axios.config'

/* list of resource */
// export const index = async (reqParams) => {
//     return await privateRequest.get(`/admin/district`, {
//         params: { ...reqParams },
//     });
// };

export const index = async () => {
    return await privateRequest.get(`/admin/district`);
};

/* Search from resources */
// export const search = async (query) => {
//     return await privateRequest.get(
//         `/admin/district?query=${query}`
//     );
// };

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/district/', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/district/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/district/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/district/${id}`)
}
