import { getAllMedicineAPI, postAllMedicineAPI } from "../../common/api/medicine.api";
import { GET_MEDICINES, POST_MEDICINE } from "../ActionType";


export const getMedicine = () => (dispatch) => {
    getAllMedicineAPI()
        .then((response) => dispatch({type: GET_MEDICINES, payload: (response.data)}));
}

export const postMedicine = (data) => (dispatch) => {
    postAllMedicineAPI(data)
        .then((response) => dispatch({type: POST_MEDICINE, payload: (response.data)}));
}