import { privateRequest } from '../config/axios.config'

/* list of resource */
// export const index = async (reqParams) => {
//     return await privateRequest.get(`/admin/upazila`, {
//         params: { ...reqParams },
//     });
// };

export const index = async () => {
    return await privateRequest.get(`/admin/education-board/`);
};

/* Search from resources */
// export const search = async (query) => {
//     return await privateRequest.get(
//         `/admin/upazila?query=${query}`
//     );
// };

/* resource store */
export const store = async (data) => {
    return await privateRequest.post('/admin/education-board/', data)
}

/* resource show */
export const show = async (id) => {
    return await privateRequest.get(`/admin/education-board/${id}`)
}

/* reosurce update */
export const update = async (id, data) => {
    return await privateRequest.put(`/admin/education-board/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/education-board/${id}`)
}


