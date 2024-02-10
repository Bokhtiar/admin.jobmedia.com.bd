import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (reqParams) => {
    return await privateRequest.get(`/admin/job`, {
        params: { ...reqParams },
    });
};

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/job/${id}`)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/job/${id}`)
}
