import { getAllMedicineAPI } from "../../common/api/medicine.api";
import { GET_MEDICINES } from "../ActionType";


export const getMedicine = () => (dispatch) => {
    getAllMedicineAPI()
        .then((response) => dispatch({type: GET_MEDICINES, payload: (response.data)}));
}