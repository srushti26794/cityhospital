import { deleteAllMedicineAPI, getAllMedicineAPI, postAllMedicineAPI, updateAllMedicineAPI } from "../../common/api/medicine.api";
import { DELETE_MEDICINE, ERROR_MEDICINE, GET_MEDICINES, LOAD_MEDICINE, POST_MEDICINE, UPDATE_MEDICINE } from "../ActionType";

const loadingMedicine = () => (dispatch) => {
    dispatch({type: LOAD_MEDICINE})
}

const errorMedicine = (error) => (dispatch) => {
    dispatch({type: ERROR_MEDICINE, payload: error})
}

export const getMedicine = () => (dispatch) => {
    dispatch(loadingMedicine())

    setTimeout(() => {
        getAllMedicineAPI()
        .then((response) => dispatch({type: GET_MEDICINES, payload: (response.data)}))
        .catch((error) => dispatch(errorMedicine(error)))
    }, 2000)
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