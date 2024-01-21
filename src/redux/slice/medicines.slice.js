import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const initialState = {
    isloading: false,
    medicines: [],
    error: null
}

export const addMedicine = createAsyncThunk(
    'medicines/add',

    async (data) => {
        try {
            const rNo = Math.floor(Math.random() * 10000)
            const storageRef = ref(storage, 'medicines/' + rNo + '_' + data.file.name);

            let newData = {}
            // 'file' comes from the Blob or File API
            await uploadBytes(storageRef, data.file)
                .then(async (snapshot) => {
                    await getDownloadURL(storageRef)
                        .then(async (url) => {
                            console.log(url);
                            const docRef = await addDoc(collection(db, "medicines"), { ...data, file: url, fileName: rNo + '_' + data.file.name });
                            console.log("Document written with ID: ", docRef.id);

                            newData = { id: docRef.id, ...data, file: url }
                        });
                })
            console.log(newData);

            return newData;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
)

export const getMedicineData = createAsyncThunk(
    'medicines/get',

    async () => {
        console.log('aaaaa');
        const querySnapshot = await getDocs(collection(db, "medicines"));

        let data = [];

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(`${doc.id} => ${doc.data()}`);
        });
        console.log(data);
        return data;
    }
)

export const updateMedicine = createAsyncThunk(
    'medicines/update',
    async (data) => {
        let newData = {};
        console.log(data);

        if (typeof data.file === 'string') {
            const medicineRef = doc(db, "medicines", data.id);
            console.log(medicineRef);

            let newData = { ...data };
            delete newData.id;

            await updateDoc(medicineRef, newData);
        } else {
            const medicineRef = ref(storage, 'medicines/' + data.fileName);

            //1. delete old image
            deleteObject(medicineRef).then(async () => {
                //2. upload image and get url
                const rNo = Math.floor(Math.random() * 10000)
                const storageRef = ref(storage, 'medicines/' + rNo + '_' + data.file.name);
                
                await uploadBytes(storageRef, data.file)
                    .then(async (snapshot) => {
                        await getDownloadURL(storageRef)
                            .then(async (url) => {
                                //3. update in cloud store
                                const medicineRef = doc(db, "medicines", data.id);
                                console.log(medicineRef);

                                newData = { ...data, file: url, fileName: rNo + '_' + data.file.name};
                                delete newData.id;

                                await updateDoc(medicineRef, newData);

                                newData.id = data.id;
                            });
                    })
            }).catch((error) => {
                console.log(error);
            });
        }

        return newData;
    }
)

export const deleteMedicine = createAsyncThunk(
    'medicines/delete',

    async (data) => {
        // Create a reference to the file to delete
        const medicineRef = ref(storage, 'medicines/' + data.fileName);

        // Delete the file
        deleteObject(medicineRef).then(async () => {
            await deleteDoc(doc(db, "medicines", data.id));
        }).catch((error) => {
            console.log(error);
        });

        return data.id;
    }
)

const handleLoading = (state, action) => {
    state.isloading = true;
    state.error = null;
}

const handleError = (state, action) => {
    state.isloading = false;
    state.error = action.payload;
}

const medicinesSlice = createSlice({
    name: 'medicines',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addMedicine.pending, handleLoading)
        builder.addCase(addMedicine.fulfilled, (state, action) => {
            console.log(action);
            state.isloading = false;
            state.medicines.push(action.payload)
            state.error = null;
        })
        builder.addCase(addMedicine.rejected, handleError)

        builder.addCase(getMedicineData.pending, handleLoading)
        builder.addCase(getMedicineData.fulfilled, (state, action) => {
            console.log(action);
            state.isloading = false;
            state.medicines = action.payload;
            state.error = null;
        })
        builder.addCase(getMedicineData.rejected, handleError)

        builder.addCase(updateMedicine.fulfilled, (state, action) => {
            console.log(action);
            state.isloading = false;
            state.medicines = state.medicines.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
            state.error = null;
        })
        builder.addCase(deleteMedicine.fulfilled, (state, action) => {
            console.log(action);
            state.isloding = false;
            state.medicines = state.medicines.filter((v) => v.id !== action.payload)
            state.error = null;
        })
    }
})

export default medicinesSlice.reducer;