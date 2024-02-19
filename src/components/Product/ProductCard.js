import React from 'react';
import Card from 'react-bootstrap/Card';
import './ProductCard.css';
import { Link } from 'react-router-dom';




const ProductCard = ({ product, onProductCartClick, productQuantity }) => {


  return (

    <>
      <Card style={{ width: '270px' }} className='product'>
        <Card.Img variant="top" className='product-image' src={product.thumbnail} />
        <Card.Body>
          <Card.Title className='product-title text-black-50'>{product.title}</Card.Title>
          <Card.Text>
            <span className='text-primary me-2'>${product.price}</span>
            <span className='text-danger'>{product.discountPercentage}% OFF</span>
            <span className='mainPrice'>${(product.price / (1 - (product.discountPercentage / 100))).toFixed(2)}</span>
          </Card.Text>
          <div className='d-flex justify-content-center justify-content-end'>
            <button type="button" className='btn btn-primary btn-sm mr-2' disabled={product.stock === productQuantity} onClick={() => onProductCartClick({ ...product })}><i className="fa fa-solid fa-cart-shopping"></i></button>
            <Link to={`/product/details/${product.id}`} className='btn btn-success btn-sm' ><i className="fa fa-solid fa-eye"></i></Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
