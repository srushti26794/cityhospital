import React, { useEffect, useState } from 'react';
import { CardSubtitle, Container } from 'reactstrap';
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap"
import "./Medicines.css"
import { Link } from 'react-router-dom';
import { BsCurrencyRupee } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getMedicine } from '../../redux/action/medicine.action';
import { handleCartData } from '../../redux/slice/addToCart.slice';

// const data = [
//     {
//         "id": 1,
//         "name": "Naproxen",
//         "price": 85,
//         "expiry": 2023,
//         "desc": "Naproxen, sold under the brand name Aleve among others, is a nonsteroidal anti-inflammatory drug used to treat pain, menstrual cramps, inflammatory diseases such as rheumatoid arthritis, gout and fever.",
//         "image": "naproxen.png"
//     },
//     {
//         "id": 2,
//         "name": "Jakafi",
//         "price": 85,
//         "expiry": 2023,
//         "desc": "Ruxolitinib, sold under the brand name Jakafi among others, is a medication used for the treatment of intermediate or high-risk myelofibrosis, a type of myeloproliferative neoplasm that affects the bone.",
//         "image": "jakafi.jpg"
//     },
//     {
//         "id": 3,
//         "name": "Hydrea",
//         "price": 85,
//         "expiry": 2023,
//         "desc": "Hydrea (hydroxyurea) is an antineoplastic (anti-cancer) agent used to treat melanoma, resistant chronic myelocytic leukemia, and recurrent, metastatic, or inoperable carcinoma of the ovary and primary squamous cell (epidermoid) carcinomas of the head and neck.",
//         "image": "hydrea.png"
//     },
//     {
//         "id": 4,
//         "name": "Hiprex",
//         "price": 85,
//         "expiry": 2023,
//         "desc": "Hexamethylenetetramine, also known as methenamine, hexamine, or urotropin, is a heterocyclic organic compound with the formula (CH₂)₆N₄. This white crystalline compound is highly soluble in water and polar organic solvents. It has a cage-like structure similar to adamantane",
//         "image": "hiprex.jpeg"
//     },
//     {
//         "id": 5,
//         "name": "Meftal",
//         "price": 85,
//         "expiry": 2023,
//         "desc": "Meftal Spas tablet is an antispasmodic medicine. It contains a combination of dicyclomine and mefenamic acid. This medicine is used for relieving pain and spasm in the abdomen and during or before menses (periods).",
//         "image": "meftal.jpg"
//     },
//     {
//         "id": 6,
//         "name": "Wegovy",
//         "price": 85,
//         "expiry": 2023,
//         "desc": "WEGOVY® (semaglutide) injection 2.4 mg is an injectable prescription medicine that may help adults and children aged ≥12 years with obesity (BMI ≥30 for adults, BMI ≥ 95th percentile for age and sex for children), or some adults with excess weight (BMI ≥27) (overweight) who also have weight-related medical problems to help them lose weight and keep it off. Wegovy® should be used with a reduced calorie meal plan and increased physical activity",
//         "image": "wegovy.jpg"
//     },
//     {
//         "id": 7,
//         "name": "Aripiprazole",
//         "price": 85,
//         "expiry": 2023,
//         "desc": "Aripiprazole is used to treat certain mental/mood disorders (such as bipolar disorder, schizophrenia, Tourette's syndrome, and irritability associated with autistic disorder). It may also be used in combination with other medication to treat depression. Aripiprazole is known as an antipsychotic drug (atypical type).",
//         "image": "aripiprazol.png"
//     },
//     {
//         "id": 8,
//         "name": "Orlistat",
//         "price": 85,
//         "expiry": 2023,
//         "desc": "Orlistat, sold under the brand name Xenical among others, is a medication used to treat obesity. Its primary function is preventing the absorption of fats from the human diet by acting as a lipase inhibitor, thereby reducing caloric intake.",
//         "image": "orlistat.jpeg"
//     }
// ]

function Medicines() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [searchData, setSearchData] = useState([]);

    const dispatch = useDispatch();

    const medicine = useSelector(state => state.medicines)
    console.log(medicine.medicines);

    const cart = useSelector(state => state.cart)
    console.log(cart.cart);

    useEffect(() => {
        dispatch(getMedicine());
    }, [])

    // const getData = async () => {
    //     let response = await fetch("http://localhost:3004/medicines")
    //     let apiData = await response.json();

    //     setData(apiData)
    // }

    console.log(data);

    const handleSearchSort = () => {
        // console.log(data, search, sort);

        let fData = data.filter((v) =>
            v.name.toLowerCase().includes(search) ||
            v.price.toString().includes(search) ||
            v.expiry.toString().includes(search) ||
            v.description.toLowerCase().includes(search)
        )

        fData = fData.sort((a, b) => {
            if (sort === 'az') {
                return a.name.localeCompare(b.name);
            } else if (sort === 'za') {
                return b.name.localeCompare(a.name);
            } else if (sort === 'lh') {
                return a.price - b.price;
            } else if (sort === 'hl') {
                return b.price - a.price;
            }
        })


        // console.log(fData);

        return fData;
    }
    const handleCart = (event, id) => {
        event.preventDefault();
        dispatch(handleCartData(id))
        
        
        // const data = cart.find((v) => v.id === id)

        // console.log(data);

        // if (data) {
        //     let allData = [...cart];

        //     let index = allData.findIndex((v) => v.id === id);

        //     allData[index].qty++;

        //     setCart(allData);
        // } else {
        //     setCart((prev) => [...prev, { id: id, qty: 1 }])
        // }

    }

    console.log(cart);

    const finalData = handleSearchSort();


    return (
        <div className='medicines'>
            <Container className="bg-light border">
                <div className='search_bar'>
                    <input className='input' onChange={(event) => setSearch(event.target.value)} type='search' />
                    <select className='select' name='sort' onChange={(event) => setSort(event.target.value)}>
                        <option value="0">--Select--</option>
                        <option value="az">A to Z</option>
                        <option value="za">Z to A</option>
                        <option value="lh">Low to High</option>
                        <option value="hl">High to Low</option>
                    </select>
                </div>

                <div className='medParent'>
                    {
                        medicine.medicines.map((v, i) => {
                            return (
                                <div>
                                    <Link to={`/medicines/${v.id}`}>
                                        <Card
                                            style={{
                                                width: '18rem'
                                            }}
                                        >
                                            <div className='medImage'>
                                                <img
                                                    className='med-img'
                                                    alt="Sample"
                                                    src={require(`../../../public/assets/img/medicine/${v.image}`)}
                                                />
                                            </div>

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
                                            <button onClick={(event) => handleCart(event, v.id)} className='add-to-cart'>
                                                Add to cart
                                            </button>
                                        </Card>
                                    </Link>

                                </div>
                            )
                        })
                    }
                </div>
            </Container >
        </div >
    );
}

export default Medicines;