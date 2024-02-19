import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../../src/components/Product/ProductCard';
import Spinner from 'react-bootstrap/Spinner';
import './Home.css'
import Toast from 'react-bootstrap/Toast';

const Home = ({ searchKey }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchKey);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cartItems, setCartItems] = React.useState([]);



  const productQuantity = React.useRef(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term
    setSearchTerm(searchKey);
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter products based on price range
    const filteredByPrice = filtered.filter(product =>
      (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice)
    );

    setFilteredProducts(filteredByPrice);
  }, [products, searchTerm, minPrice, maxPrice, searchKey]);

  React.useEffect(() => {
    const cartItms = localStorage.getItem('cartItems');
    if (cartItms && cartItms.length !== 0) {
      setCartItems(JSON.parse(cartItms));
    } else {
      setCartItems([]);
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
  }, []);


  const handleMinPriceChange = (e) => {
    setMinPrice(parseFloat(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseFloat(e.target.value));
  };


  const handleProductAddToCart = (product) => {
    let _product = {};
    if (product.length !== 0 || product) {
      _product = product;
    }

    if (cartItems.length === 0) {
      setCartItems([{ ..._product, quantity: 1 }]);
      localStorage.setItem('cartItems', JSON.stringify([{ ..._product, quantity: 1 }]));
      productQuantity.current = 1;
      setToastMessage(`${_product.title} is Added in the cart!`);
      setShow(true);
    }
    else {
      let item = cartItems.find((item) => item.id === _product.id);
      if (item) {
        if (item.stock !== item.quantity) {
          productQuantity.current = item.quantity + 1;
          const updatedItems = cartItems.map((i) => {
            if (i.id === item.id) return { ...i, quantity: i.quantity + 1 };
            return i;
          });
          setCartItems(updatedItems);
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
          setToastMessage(`${_product.title} is Added in the cart!`);
          setShow(true);
        }
        else {
          productQuantity.current = item.stock;
          setToastMessage(`${item.title} is out of Stock!`);
          setShow(true);
        }
      }
      else {

        const newItems = [...cartItems, { ..._product, quantity: 1 }];
        setCartItems(newItems);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        productQuantity.current = 1;
        setToastMessage(`${_product.title} is Added in the cart!`);
        setShow(true);
      }
    }
  }


  return (
    <div>
      <div className='d-flex mt-2'>
        <h6 className='mr-2'>Filter by price:</h6>
        <input className='mr-2' type="number" placeholder="Min Price" value={minPrice} min={0} onChange={handleMinPriceChange} />
        <input className='mr-2' type="number" placeholder="Max Price" value={maxPrice} min={0} onChange={handleMaxPriceChange} />
      </div>
      <hr />
      <div className="product-list">
        {
          filteredProducts.length > 0 ?
            (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onProductCartClick={(item) => handleProductAddToCart(item)} productQuantity={productQuantity.current}></ProductCard>
              ))
            )
            :
            (
              <Spinner animation="grow" />
            )
        }
      </div>
      <div>
        <Toast
          style={{ position: 'absolute',bottom: '0', right: '0', zIndex: 1 }}
          onClose={() => setShow(!show)}
          show={show}
          delay={4000}
          autohide>
          <Toast.Header className='bg-success'>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto text-dark">Message</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default Home;
