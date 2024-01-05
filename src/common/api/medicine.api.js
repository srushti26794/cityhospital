import { deleteRquest, getRequest, postRequest, putRequest } from "../request"



export const getAllMedicineAPI = () => {
    return getRequest('medicines');
}

export const postAllMedicineAPI = (data) => {
    return postRequest('medicines', data);
}

export const deleteAllMedicineAPI = (id) => {
    return deleteRquest('medicines/',id)
}

