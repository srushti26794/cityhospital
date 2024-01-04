import { deleteRequest, getRequest, postRequest } from "../request"



export const getAllMedicineAPI = () => {
    return getRequest('medicines');
}

export const postAllMedicineAPI = (data) => {
    return postRequest('medicines', data);
}

export const deleteAllMedicineAPI = (data) =>{
    return deleteRequest('medicines', data);
}
