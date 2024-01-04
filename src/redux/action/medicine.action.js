import { response } from "express";
import { deleteAllMedicineAPI, getAllMedicineAPI, postAllMedicineAPI } from "../../common/api/medicine.api";
import { DELETE_MEDICINE, GET_MEDICINES, POST_MEDICINE } from "../ActionType";


export const getMedicine = () => (dispatch) => {
    getAllMedicineAPI()
        .then((response) => dispatch({type: GET_MEDICINES, payload: (response.data)}));
}

export const postMedicine = (data) => (dispatch) => {
    postAllMedicineAPI(data)
        .then((response) => dispatch({type: POST_MEDICINE, payload: (response.data)}));
}

export const deleteMedicine = (data) => (dispatch) => {
    deleteAllMedicineAPI()
    .then((response) => dispatch({type: DELETE_MEDICINE, payload:(response.data)}))
}