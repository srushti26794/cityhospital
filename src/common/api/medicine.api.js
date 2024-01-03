import { getRequest } from "../request"



export const getAllMedicineAPI = () => {
    return getRequest('medicines');
}