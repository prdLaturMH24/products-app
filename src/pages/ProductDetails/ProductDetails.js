import './ProductDetails.css';
import React from 'react';
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";


const ProductDetails = ({ product, onHide, show, onAddToCart }) => {


    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {product?.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className='d-lg-grid product-details'>
                    <p>Description: ${product?.description}</p>
                    <p>Price: ${product?.price}</p>
                    <p>Stock: {product?.stock}</p>
               </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={() => onAddToCart(product)}><i className='fa fa-shopping-cart'></i></Button>
                <Button variant='danger' onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

}
export default ProductDetails;

