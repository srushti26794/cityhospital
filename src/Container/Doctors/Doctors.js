import React, { useEffect, useState } from 'react';

function Doctors(props) {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('doctors'))

        if (localData) {
            setData(localData)
        }
    }, [])

    const handleSearch = (val) => {
        setSearch(val)

        let fData = data.filter((v) =>
            v.name.toLowerCase().includes(val.toLowerCase()) ||
            v.designation.toLowerCase().includes(val.toLowerCase()) ||
            v.degree.toLowerCase().includes(val.toLowerCase())
        )
        console.log(fData);

        setSearchData(fData);
    }
    console.log(search);

    const finalData = searchData.length > 0 ? searchData : data


    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <h2>Doctors</h2>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                </div>
                <div className='search_bar'>
                    <input onChange={(event) => handleSearch(event.target.value)} type='search' />
                </div>
                <div className="row">
                    {
                        finalData.map((v) => (
                            <div className="col-lg-6">
                                <div className="member d-flex align-items-start">
                                    <div className="pic"><img src="../assets/img/doctors/doctors-1.jpg" className="img-doctor" alt /></div>
                                    <div className="member-info">
                                        <h4>{v.name}</h4>
                                        <span>{v.designation}</span>
                                        <p>{v.degree}</p>
                                        <div className="social">
                                            <a href><i className="ri-twitter-fill" /></a>
                                            <a href><i className="ri-facebook-fill" /></a>
                                            <a href><i className="ri-instagram-fill" /></a>
                                            <a href> <i className="ri-linkedin-box-fill" /> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>

    );
}

export default Doctors;