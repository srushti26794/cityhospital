import { getRequest, postRequest } from "../request"



export const getAllMedicineAPI = () => {
    return getRequest('medicines');
}

export const postAllMedicineAPI = (data) => {
    return postRequest('medicines', data);
}