import React, { useEffect, useState } from 'react';
import { CardSubtitle, Container } from 'reactstrap';
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap"
// import "./Medicines.css"
import { Link } from 'react-router-dom';
import { BsCurrencyRupee } from "react-icons/bs";

function AddToCart({ cart, setCart }) {
    const [data, setData] = useState([])
    const [counter, setCounter] = useState(1);


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let response = await fetch("http://localhost:3004/data")
        let apiData = await response.json();

        setData(apiData)
    }

    let cartData = data.filter((f) => cart.find((v) => v === f.id))
    console.log(cartData);

    const handleRemove = (id) => {
        if (cart.includes(id)) {
            let fdata = cart.filter((v) => v !== id)
            console.log(fdata);
            setCart(fdata)
        }
    }

    const minus = (id) => {
        console.log(id);
        // cart.map((v) => {
        //     if (v == id && counter > 1) {
        //         setCounter(counter - 1)
        //     }
        // })
        return data.map((v) => {
            if (v.id == id && counter > 1) {
                setCounter(counter - 1)
            }
        })
    }

    const plus = (id) => {
        console.log(id);
        // cart.map((v) => {
        //     if (v == id) {
        //         setCounter(counter + 1)
        //     }
        // })
        return data.map((v) => {
            if (v.id == id) {
                setCounter(counter + 1)
            }
        })
    }


    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <h2>My Cart</h2>
                </div>

                <div className='medParent'>
                    {
                        cartData.map((v, i) => {
                            return (
                                <div>
                                    <Link to={`/medicines/${v.id}`}>
                                        <Card
                                            style={{
                                                width: '18rem'
                                            }}
                                        >
                                            {/* <div className='medImage'>
                                                <img
                                                    className='med-img'
                                                    alt="Sample"
                                                    src={require(`../../../public/assets/img/medicine/${v.image}`)}
                                                />
                                            </div> */}

                                            <CardBody>
                                                <CardTitle tag="h5">
                                                    {v.name}
                                                </CardTitle>
                                                <CardSubtitle
                                                    className="mb-2"
                                                    tag="h6"
                                                >
                                                    <BsCurrencyRupee />{v.price}
                                                </CardSubtitle>
                                                <CardSubtitle
                                                    className="mb-2"
                                                    tag="h6"
                                                >
                                                    Expiry : {v.expiry}
                                                </CardSubtitle>


                                            </CardBody>
                                        </Card>
                                    </Link>
                                    <Button onClick={() => handleRemove(v.id)} className='add-to-cart'>
                                        Remove
                                    </Button>
                                    <button className='count' onClick={() => minus(v.id)} disabled={counter > 0 ? false : true}> - </button>
                                    <span className='number'>{counter}</span>
                                    <button className='count' onClick={() => plus(v.id)} disabled={counter < 10 ? false : true}> + </button>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section >
    );
}

export default AddToCart;