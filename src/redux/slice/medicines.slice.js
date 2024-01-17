import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase";

const initialState = {
    isloding : false,
    medicines : [],
    error : null
}

export const addMedicine = createAsyncThunk (
    'medicines/add',

    async(data) => {
        try {
            const docRef = await addDoc(collection(db, "medicines"), data);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

        return data;
    }
)

const medicinesSlice = createSlice ({
    name : 'medicines',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder.addCase(addMedicine.fulfilled, (state, action) => {
            console.log(action);
        })
    }
})

export default medicinesSlice.reducer;