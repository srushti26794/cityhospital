import React, { useEffect, useState } from 'react';

function AddToCart({cart,setCart}) {
    const [data, setData] = useState([])

    
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let response = await fetch("http://localhost:3004/data")
        let apiData = await response.json();

        setData(apiData)
    }
    return (
        <section id="doctors" className="doctors">
        <div className="container">
            <div className="section-title">
                <h2>My Cart</h2>
            </div>
        </div>
    </section >
    );
}

export default AddToCart;