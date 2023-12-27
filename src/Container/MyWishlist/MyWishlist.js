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

        if (wishlist.includes(id)) {
            let fdata = wishlist.filter((v) => v !== id)
            console.log(fdata);
            setWishlist(fdata)
        }
    }

    let wishData = data.filter((f) => wishlist.find((v) => v === f.id))
    console.log(wishData);

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="row">
                    {/* <h1>WishList</h1> */}
                    {
                        wishData && wishData.map((v) => {
                            // const item = data.find((product) => product.id === v);
                            // console.log(item);
                            // if (item) {
                                return (
                                    < div className="col-lg-6 border">
                                        <IconButton className='icon' onClick={() => handleWishlist(v.id)} aria-label="delete" size="small">
                                            {/* {wishlist.includes(item.id) ? <FavoriteIcon /> : <FavoriteBorderIcon fontSize='large' />} */}
                                            <FavoriteIcon />
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
                                )
                            // }
                        })

                    }

                </div>
            </div>
        </section >
    );
}

export default MyWishlist;