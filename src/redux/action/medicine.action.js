import { deleteAllMedicineAPI, getAllMedicineAPI, postAllMedicineAPI, updateAllMedicineAPI } from "../../common/api/medicine.api";
import { DELETE_MEDICINE, GET_MEDICINES, POST_MEDICINE, UPDATE_MEDICINE } from "../ActionType";


export const getMedicine = () => (dispatch) => {
    getAllMedicineAPI()
        .then((response) => dispatch({type: GET_MEDICINES, payload: (response.data)}));
}

export const postMedicine = (data) => (dispatch) => {
    postAllMedicineAPI(data)
        .then((response) => dispatch({type: POST_MEDICINE, payload: (response.data)}));
}

export const deleteMedicine = (id) => (dispatch) => {
    deleteAllMedicineAPI(id)
    .then(dispatch({type: DELETE_MEDICINE, payload: id}));
}

export const updateMedicine = (data) => (dispatch) => {
    console.log(data);
    updateAllMedicineAPI(data)
        .then((response) => dispatch({type: UPDATE_MEDICINE, payload: (response.data)}))
}