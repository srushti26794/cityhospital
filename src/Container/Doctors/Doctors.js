import { BorderAll } from '@mui/icons-material';
import { colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { set } from 'date-fns';

function Doctors(props) {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setcategory] = useState([])
    const [selectCat, setSelectCat] = useState('')
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        getData()
        // handleWishlist()
        // let localData = JSON.parse(localStorage.getItem('doctors'))

        // if (localData) {
        //     setData(localData)
        // }
    }, [])

    const getData = async () => {
        let response = await fetch("https://fakestoreapi.com/products")
        let apiData = await response.json();

        // console.log(apiData);

        let uniqueCat = [];

        apiData.map((a) => {
            if (!uniqueCat.includes(a.category)) {
                uniqueCat.push(a.category)
            }
        })
        // console.log(uniqueCat);

        setcategory(uniqueCat)

        setData(apiData)
    }

    const handleWishlist = (id) => {
        console.log(id);
        let index = wishlist.indexOf(id);
        console.log(index);

        if (index === -1) {
            wishlist.push(id)
            setWishlist(wishlist);
        } else {
            wishlist.splice(index, 1);
            setWishlist(wishlist);
        }    

        setWishlist(wishlist)

        console.log(wishlist);
    }


    const handleSearchSort = () => {
        // console.log(data, search, sort);

        let fData = data.filter((v) =>
            v.title.toLowerCase().includes(search) ||
            v.category.toLowerCase().includes(search)
            // v.name.toLowerCase().includes(search) ||
            // v.designation.toLowerCase().includes(search) ||
            // v.degree.toLowerCase().includes(search)
        )

        if (selectCat !== '') {
            fData = fData.filter((v) => v.category === selectCat)
        }

        fData = fData.sort((a, b) => {
            if (sort === 'az') {
                return a.title.localeCompare(b.title);
            } else if (sort === 'za') {
                return b.title.localeCompare(a.title);
            }
        })

        // console.log(fData);

        return fData
    }
    // console.log(data);

    const finalData = handleSearchSort();

    // console.log(finalData);

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <h2>Doctors</h2>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                </div>

                <div className='text-center'>
                    {
                        category.map((v) => (
                            <button onClick={() => setSelectCat(v)} className="appointment-btn scrollto" id='doc-cat-but'>
                                <span className="d-none d-md-inline">{v}</span>
                            </button>
                        ))
                    }
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
                                <span className='icon' onClick={() => handleWishlist(v.id)}><FavoriteBorderIcon /></span>
                                <div className="pic text-center">
                                    <img src={v.image} className="img-doctor" alt />
                                </div>
                                <div className="member d-flex align-items-start">
                                    {/* <div className="pic"><img src={v.image} className="img-doctor" alt /></div> */}
                                    <div className="member-info">
                                        <h4>{v.title}</h4>
                                        <span>{v.category}</span>
                                        <p>{v.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="row">
                    <h1>WishList</h1>
                    {
                        wishlist.map((v) => (
                            <div className="col-lg-6">
                                <span className='icon' onClick={() => handleWishlist(v)}><FavoriteBorderIcon /></span>
                                <div className="pic text-center">
                                    <img src={v.image} className="img-doctor" alt />
                                </div>
                                <div className="member d-flex align-items-start">
                                    {/* <div className="pic"><img src={v.image} className="img-doctor" alt /></div> */}
                                    <div className="member-info">
                                        <h4>{v.title}</h4>
                                        <span>{v.category}</span>
                                        <p>{v.description}</p>
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