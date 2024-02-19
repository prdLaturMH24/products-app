import React from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
import { Image } from "react-bootstrap";
import { Link } from 'react-router-dom';


const getSingleProductDetails = async (id) => {
    try {
        const response = await axios.get('https://dummyjson.com/products/' + id);
        return response.data;
    } catch (err) {
        console.error('Error fetching products:', err);
    }
}

const Details = () => {
    const { productId } = useParams();
    const cartItems = localStorage.getItem('cartItems');
    const [product, setProduct] = React.useState(null);
    const [mainImage, setMainImage] = React.useState('');
    const [cartDetails, setCartDetails] = React.useState(null);
    const [productQuantity, setProductQuantity] = React.useState(1);
    const [isInCart, setIsInCart] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const isUserAuthenticated = React.useRef(false);



    React.useEffect(() => {
        if (!productId) {
            return;
        }

        const userDetails = localStorage.getItem('user');

        if (userDetails) {
            isUserAuthenticated.current = true;
            setUser(JSON.parse(userDetails));
        } else {
            isUserAuthenticated.current = false;
        }
        
        let details = JSON.parse(cartItems).find(item => item.id === parseInt(productId));
        // Fetch the data from the API
        getSingleProductDetails(productId).then((data) => {
            setProduct(data);
            setMainImage(data.thumbnail);
            if (cartItems && details) {
                setCartDetails(details);
                setProductQuantity(details.quantity);
                setIsInCart(true);
            }
        });
    }, [cartItems, productId]);


    const handleMainImageChange = (e) => {
        e.preventDefault();
        let img = e.target.src;
        setMainImage(img);
    };


    const handleProductQuantity = (action, limit) => {
        if (action === 'increment') {
            if(limit)
            {
                if(productQuantity < limit)
                {
                    setProductQuantity(prevProdQty => prevProdQty + 1);
                }
            }
        } else if (action === "decrement") {
            if (limit) {
                if (productQuantity > 0) {
                    setProductQuantity(prevProdQty => prevProdQty - 1);
                }
            } else {
                setProductQuantity(1);
            }
        }
    };

    const handleProductAddToCart = (item) => {
        if(!isInCart && item)
        {
           let items = JSON.parse(cartItems);
           items.push({...item, quantity: productQuantity});
           localStorage.setItem('cartItems', JSON.stringify(items));
           setIsInCart(true);
        }
    }

    return (
        <div className="container-fluid">
            <div className="layout">
                <div id="product">
                    <div id="images">
                        <Image id="mainImage" src={mainImage} alt="Not Availabel!" />
                        <div id="thumbnails">
                            {
                                product?.images?.length > 0 ?
                                    (
                                        product?.images?.map(
                                            (image, index) =>

                                                <Image
                                                    className="tmbnl"
                                                    style={{ width: '115px', height: '115px' }}
                                                    id={'t' + (index + 1)}
                                                    src={image}
                                                    alt="Not Availabel!"
                                                    onClick={(e) => handleMainImageChange(e)}
                                                />
                                        )
                                    )
                                    : (
                                        <>No Images</>
                                    )
                            }
                        </div>
                    </div>
                    <h2 id="title">{product?.title}</h2>
                    <h3 id="category">{product?.category}</h3>
                    <hr id="line1" />
                    <b id="price">${product?.price}</b>
                    <b id="mainPrice">${(product?.price / (1 - (product?.discountPercentage / 100))).toFixed(2)}</b>
                    <hr id="line2" />
                    <b id="discount">{product?.discountPercentage}% OFF</b>
                    <b id="stock">Stock: {Number(cartDetails?.stock - cartDetails?.quantity) || product?.stock} Left</b>
                    <div id="group13">
                        <div id="group11">
                            <span id="decrement" onClick={() => handleProductQuantity('decrement', 0)}>➖</span>
                            <span id="counter" class="counter">{productQuantity || 1}</span>
                            <span id="increment" onClick={() => handleProductQuantity('increment', Number(product?.stock))}>➕</span>
                        </div>
                        {
                            !isInCart ?
                                (
                                    <button id="rect12" disabled={product?.stock === productQuantity} onClick={() => handleProductAddToCart({...product})}>
                                        <i id="cart-icon" className="fa fa-shopping-cart" aria-hidden="true"></i>
                                        <small id="action">Add to Cart</small>
                                    </button>
                                )
                                :
                                (
                                    <Link id="rect12" to={`/cart/${user?.id}`} aria-disabled="true">
                                        <i id="cart-icon" className="fa fa-shopping-cart" aria-hidden="true"></i>
                                        <small id="action">Go To Cart</small>
                                    </Link>
                                )
                        }
                    </div>
                    <p id="message">
                        {
                            isInCart ? "This item has been added to your shopping cart." : ""
                        }
                    </p>
                    <hr id="line4" />
                    <p id="description">{product?.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Details;