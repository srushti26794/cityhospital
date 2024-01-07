import { deleteAllDoctorDataAPI, getAllDoctorDataAPI, postAllDoctorDataAPI, updateAllDoctorDataAPI } from "../../common/api/doctors.api"
import { DELETE_MEDICINE, GET_DOCTORS, POST_DOCTORS, UPDATE_MEDICINE } from "../ActionType"


export const getDoctorData = () => (dispatch) => {
    getAllDoctorDataAPI()
        .then((response) => dispatch({ type: GET_DOCTORS, payload: (response.data) }))
}

export const postDoctorData = (data) => (dispatch) => {
    postAllDoctorDataAPI(data)
        .then((response) => dispatch({type: POST_DOCTORS, payload: (response.data)}))
}

export const deleteDoctorData = (id) => (dispatch) => {
    deleteAllDoctorDataAPI(id)
        .then( dispatch({type: DELETE_MEDICINE, payload: id}))
}

export const updateDoctorData = (data) => (dispatch) => {
    updateAllDoctorDataAPI(data)
        .then((response) => dispatch({type: UPDATE_MEDICINE, payload: (response.data)}))
}