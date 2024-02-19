import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get(`/admin/education-degree/`);
};

/* Search from resources */
// export const search = async (query) => {
//     return await privateRequest.get(
//         `/admin/degree?query=${query}`
//     );
// };

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/education-degree/', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/education-degree/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/education-degree/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/education-degree/${id}`)
}
