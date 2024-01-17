import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
    isloding: false,
    medicines: [],
    error: null
}

export const addMedicine = createAsyncThunk(
    'medicines/add',

    async (data) => {
        try {
            const docRef = await addDoc(collection(db, "medicines"), data);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        return data;
    }
)

export const getMedicineData = createAsyncThunk(
    'medicines/get',

    async (data) => {
        console.log('aaaaa');
        const querySnapshot = await getDocs(collection(db, "medicines"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });

        return data;
    }
)

const medicinesSlice = createSlice({
    name: 'medicines',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addMedicine.fulfilled, (state, action) => {
                console.log(action);

                state.medicines.push(action.payload)
                state.isloding = false
            })
            .addCase(getMedicineData.fulfilled, (state, action) => {
                console.log(action);
            })

    }
})

export default medicinesSlice.reducer;