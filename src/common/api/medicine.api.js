import { deleteRquest, getRequest, postRequest, updateRequest } from "../request"

export const getAllMedicineAPI = () => {
    return getRequest('medicines');
}

export const postAllMedicineAPI = (data) => {
    return postRequest('medicines', data);
}

export const deleteAllMedicineAPI = (id) => {
    return deleteRquest('medicines/',id)
}

export const updateAllMedicineAPI = (data) => {
    return updateRequest('medicines/', data)
}