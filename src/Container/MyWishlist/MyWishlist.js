import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function MyWishlist({ wishlist, setWishlist }) {
    const [data, setData] = useState([])

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
        console.log(wishlist.includes(id));

        if (!wishlist.includes(id)) {
            setWishlist((prev) => [...prev, id])
        } else {
            let fdata = wishlist.filter((v) => v !== id)
            console.log(fdata);
            setWishlist(fdata)
        }
    }

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="row">
                    <h1>WishList</h1>
                    {
                        data.map((v) => (
                            wishlist.map((v1) => (
                                <div className="col-lg-6">
                                <IconButton className='icon' onClick={() => handleWishlist(v.id)} aria-label="delete" size="small">
                                    {wishlist.includes(v.id) ? <FavoriteBorderIcon /> : <FavoriteIcon fontSize="inherit" />}
                                </IconButton>
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
                        ))
                    }
                </div>
            </div>
        </section >
    );
}

export default MyWishlist;