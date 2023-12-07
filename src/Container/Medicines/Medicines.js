import React from 'react';
import { CardSubtitle, Container } from 'reactstrap';
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap"
import "./Medicines.css"
import { Link } from 'react-router-dom';
import { BsCurrencyRupee } from "react-icons/bs";

const data = [
    {
        "id": 1,
        "name": "Naproxen",
        "price": 85,
        "expiry": 2023,
        "desc": "Naproxen, sold under the brand name Aleve among others, is a nonsteroidal anti-inflammatory drug used to treat pain, menstrual cramps, inflammatory diseases such as rheumatoid arthritis, gout and fever.",
        "image": "naproxen.png"
    },
    {
        "id": 2,
        "name": "Jakafi",
        "price": 85,
        "expiry": 2023,
        "desc": "Ruxolitinib, sold under the brand name Jakafi among others, is a medication used for the treatment of intermediate or high-risk myelofibrosis, a type of myeloproliferative neoplasm that affects the bone.",
        "image": "jakafi.jpg"
    },
    {
        "id": 3,
        "name": "Hydrea",
        "price": 85,
        "expiry": 2023,
        "desc": "Hydrea (hydroxyurea) is an antineoplastic (anti-cancer) agent used to treat melanoma, resistant chronic myelocytic leukemia, and recurrent, metastatic, or inoperable carcinoma of the ovary and primary squamous cell (epidermoid) carcinomas of the head and neck.",
        "image": "hydrea.png"
    },
    {
        "id": 4,
        "name": "Hiprex",
        "price": 85,
        "expiry": 2023,
        "desc": "Hexamethylenetetramine, also known as methenamine, hexamine, or urotropin, is a heterocyclic organic compound with the formula (CH₂)₆N₄. This white crystalline compound is highly soluble in water and polar organic solvents. It has a cage-like structure similar to adamantane",
        "image": "hiprex.jpeg"
    },
    {
        "id": 5,
        "name": "Meftal",
        "price": 85,
        "expiry": 2023,
        "desc": "Meftal Spas tablet is an antispasmodic medicine. It contains a combination of dicyclomine and mefenamic acid. This medicine is used for relieving pain and spasm in the abdomen and during or before menses (periods).",
        "image": "meftal.jpg"
    },
    {
        "id": 6,
        "name": "Wegovy",
        "price": 85,
        "expiry": 2023,
        "desc": "WEGOVY® (semaglutide) injection 2.4 mg is an injectable prescription medicine that may help adults and children aged ≥12 years with obesity (BMI ≥30 for adults, BMI ≥ 95th percentile for age and sex for children), or some adults with excess weight (BMI ≥27) (overweight) who also have weight-related medical problems to help them lose weight and keep it off. Wegovy® should be used with a reduced calorie meal plan and increased physical activity",
        "image": "wegovy.jpg"
    },
    {
        "id": 7,
        "name": "Aripiprazole",
        "price": 85,
        "expiry": 2023,
        "desc": "Aripiprazole is used to treat certain mental/mood disorders (such as bipolar disorder, schizophrenia, Tourette's syndrome, and irritability associated with autistic disorder). It may also be used in combination with other medication to treat depression. Aripiprazole is known as an antipsychotic drug (atypical type).",
        "image": "aripiprazol.png"
    },
    {
        "id": 8,
        "name": "Orlistat",
        "price": 85,
        "expiry": 2023,
        "desc": "Orlistat, sold under the brand name Xenical among others, is a medication used to treat obesity. Its primary function is preventing the absorption of fats from the human diet by acting as a lipase inhibitor, thereby reducing caloric intake.",
        "image": "orlistat.jpeg"
    }
]

function Medicines(props) {
    return (
        <div>
            <Container className="bg-light border">
                <div className='medParent'>
                    {
                        data.map((v, i) => {
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
                                        </Card>
                                        {/* <Card
                                            body
                                            className="text-center"
                                            style={{
                                                width: '18rem'
                                            }}
                                        >   
                                            <CardTitle tag="h3">
                                                {v.name}
                                            </CardTitle>
                                            <CardText tag='h5'>
                                                Rs. {v.price}
                                            </CardText>
                                            <CardText tag='h6'>
                                                Expiry: {v.expiry}
                                            </CardText>
                                        </Card> */}
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