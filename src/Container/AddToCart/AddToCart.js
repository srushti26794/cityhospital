import React, { useEffect, useState } from 'react';
import { CardSubtitle, Container } from 'reactstrap';
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap"

import { Link } from 'react-router-dom';
import { BsCurrencyRupee } from "react-icons/bs";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function AddToCart({ cart, setCart }) {
    const [data, setData] = useState([])
    // const [counter, setCounter] = useState(1);


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let response = await fetch("http://localhost:3004/data")
        let apiData = await response.json();

        setData(apiData)
    }

    let cartData = data.filter((f) => cart.find((v) => v.id === f.id))
    console.log(cartData);

    const handleRemove = (id) => {
        console.log(id);
        // if (cart.includes(id)) {
        let fdata = cart.filter((v) => v.id !== id)
        console.log(fdata);
        setCart(fdata)
        // }
    }

    const minus = (id) => {
        console.log(id);
        let index = cart.indexOf(cart.find((v) => v.id == id));
        if (index > -1 && cart[index].count > 1) {

            cart[index].count--;
            setCart([...cart]);
            // cart.map((v) => {
            //     if (v == id && counter > 1) {
            //         setCounter(counter - 1)
            //     }
            // })
            // return data.map((v) => {
            //     if (v.id == id && counter > 1) {
            //         setCounter(counter - 1)
            //     }
            // })
        }
    }

    const plus = (id) => {
        console.log(id);
        let item = cart.find((v) => v.id == id);
        item.count++;
        setCart([...cart])
        // cart.map((v) => {
        //     if (v == id) {
        //         setCounter(counter + 1)
        //     }
        // })
        // return data.map((v) => {
        //     if (v.id == id) {
        //         setCounter(counter + 1)
        //     }
        // })
    }


    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="add_card">
                    <div className="row">
                        <div className="col-lg-8 cart">
                            <div className="title">
                                <div className="row">
                                    <div className="col"><h4><b>Shopping Cart</b></h4></div>
                                    <div className="col align-self-center text-right text-muted">{cart.length} item</div>
                                </div>
                            </div>
                            {
                                cartData.map((v) => {
                                    return (
                                        <div className="row border-top border-bottom">
                                            <div className="row main align-items-center">
                                                <div className="col-2 cartImg"><img className='cart_img' src={require(`../../../public/assets/img/medicine/${v.image}`)} /></div>
                                                <div className="col">
                                                    <div className="row text-muted">{v.name}</div>
                                                    <div className="row">{v.expiry}</div>
                                                </div>
                                                <div className="col-4">
                                                    <button className='count' onClick={() => minus(v.id)} disabled={counter > 0 ? false : true}> - </button>
                                                    <span className='number'>{counter}</span>
                                                    <button className='count' onClick={() => plus(v.id)} disabled={counter < 10 ? false : true}> + </button>
                                                </div>
                                                <div className="col"><CurrencyRupeeIcon />{v.price}</div>
                                                <div className="col-2"><span onClick={() => handleRemove(v.id)} className='removeCart'>x</span></div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className="back-to-shop"><a href="./medicines">←</a><span className="text-muted">Back to shop</span></div>
                        </div>
                        <div className="col-lg-4 summary">
                            <div><h5><b>Summary</b></h5></div>
                            <hr />
                            <div className="row">
                                <div className="col" style={{ paddingLeft: 0 }}>ITEMS 3</div>
                                <div className="col text-right">€ 132.00</div>
                            </div>
                            <form>
                                <p>SHIPPING</p>
                                <select><option className="text-muted">Standard-Delivery- €5.00</option></select>
                                <p>GIVE CODE</p>
                                <input id="code" placeholder="Enter your code" />
                            </form>
                            <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                                <div className="col">TOTAL PRICE</div>
                                <div className="col text-right">€ 137.00</div>
                            </div>
                            <button className="cart_btn">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddToCart;