import { deleteRquest, getRequest, postRequest, updateRequest } from "../request"

export const getAllDoctorDataAPI = () => {
    return getRequest('doctors')
}

export const postAllDoctorDataAPI = (data) => {
    return postRequest('doctors', data);
}

export const deleteAllDoctorDataAPI = (id) => {
    return deleteRquest('doctors/',id)
}

export const updateAllDoctorDataAPI = (data) => {
    return updateRequest('doctors/', data)
}