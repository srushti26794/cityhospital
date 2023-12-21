import React, { useEffect, useState } from 'react';

function Doctors(props) {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('doctors'))

        if (localData) {
            setData(localData)
        }
    }, [])

    const handleSearchSort = () => {
        console.log(data, search, sort);

        let fData = data.filter((v) =>
            v.name.toLowerCase().includes(search) ||
            v.designation.toLowerCase().includes(search) ||
            v.degree.toLowerCase().includes(search)
        )

        fData = fData.sort((a,b) => {
            if(sort === 'az'){
                return a.name.localeCompare(b.name);
            }else if(sort === 'za'){
                return b.name.localeCompare(a.name);
            }
        })

        console.log(fData);

        return fData
    }
    console.log(data);

    const finalData = handleSearchSort();

    console.log(finalData);

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
                    <input onChange={(event) => setSearch(event.target.value)} type='search' />

                    <select name='sort' onChange={(event) => setSort(event.target.value)}>
                        <option value="0">Sort by:</option>
                        <option value="az">A to Z</option>
                        <option value="za">Z to A</option>
                    </select>
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