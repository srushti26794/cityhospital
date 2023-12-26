import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function MyWishlist({ wishlist, setWishlist }) {
    const [data, setData] = useState([])

    console.log(wishlist);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let response = await fetch("https://fakestoreapi.com/products")
        let apiData = await response.json();

        console.log(apiData);

        setData(apiData)
    }

    console.log(data);

    console.log(wishlist);

    const handleWishlist = (id) => {
        console.log(id);

        // let fdata = wishlist.filter((v) => v.id !== id)
        // console.log(fdata);

        let item = data.map((v) => v.id === id)
        console.log(item);
        // setWishlist(data)

        // if (!wishlist.includes(id)) {
        //     setWishlist((prev) => [...prev, id])
        // } else {
        //     let fdata = wishlist.filter((v) => v !== id)
        //     console.log(fdata);
        //     setWishlist(fdata)
        // }
    }

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="row">
                    {/* <h1>WishList</h1> */}
                    {
                        wishlist.map((v) => {
                            const item = data.find((product) => product.id === v);
                            console.log(item);
                            if (item) {
                                return (
                                    < div className="col-lg-6 border">
                                        <IconButton className='icon' onClick={() => handleWishlist(v)} aria-label="delete" size="small">
                                            {/* {wishlist.includes(item.id) ? <FavoriteIcon /> : <FavoriteBorderIcon fontSize='large' />} */}
                                            <FavoriteIcon />
                                        </IconButton>
                                        <div className="pic text-center">
                                            <img src={item.image} className="img-doctor" alt />
                                        </div>
                                        <div className="member d-flex align-items-start">
                                            {/* <div className="pic"><img src={v.image} className="img-doctor" alt /></div> */}
                                            <div className="member-info">
                                                <h4>{item.title}</h4>
                                                <span>{item.category}</span>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })

                    }

                </div>
            </div>
        </section >
    );
}

export default MyWishlist;