import React from 'react';
import { useParams } from 'react-router-dom';

function MedicineData(props) {

    const {id} = useParams()

    console.log(id);

    return (
        <div>
            
        </div>
    );
}

export default MedicineData;