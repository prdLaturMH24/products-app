import React from 'react';
import './Cart.css'


const Cart = ({ cartItems, onDecrement, onIncrement, onRemoveCartItem }) => {
    const totalItems = cartItems.length;
    let totalBillAmount = 0;
    let totalDiscountPrice = 0;
    let mainBillAmount = 0;
    for (let i=0; i < totalItems; i++) {
        const retailPrice = (cartItems[i].price / (1 - (cartItems[i].discountPercentage / 100))).toFixed(2) ;
        mainBillAmount += Number( retailPrice * cartItems[i].quantity);
        totalDiscountPrice += Number( retailPrice - cartItems[i].price);
        totalBillAmount += Number(cartItems[i].price * cartItems[i].quantity);
    }

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            <div className='table'>
                {totalItems === 0 ? (
                    <div className="empty-cart">
                        Your shopping cart is empty!
                    </div>
                ) : (
                    <React.Fragment>
                        <table>
                            <thead>
                                <tr>
                                    <th>Total Items</th>
                                    <th>Main Bill Amount</th>
                                    <th>Total Discount Amount</th>
                                    <th>Total Bill Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{`${totalItems}`}</td>
                                    <td>$ {`${Number(mainBillAmount).toFixed(2)}`}</td>
                                    <td>- $ {`${Number(totalDiscountPrice).toFixed(2)}`}</td>
                                    <td>= $ {`${Number(totalBillAmount).toFixed(2)}`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </React.Fragment>)
                }
            </div>
            <div className='cart-items'>
                {cartItems.length !== 0 &&
                    <div className='d-flex row'>
                        {
                            cartItems.map(item =>
                                <div key={item.id} className='row mt-2 mb-2' id='productCard'>
                                    <div className='col col-2 img-container'>
                                        <img src={item.thumbnail} alt={item.title + 'Image'} className='img img-thumbnail rounded-circle' style={{ width: '200px', height: '200px' }} />
                                    </div>
                                    <div className='col col-8'>
                                        <ul>
                                            <li><h4 className='text-primary'>{item.title}</h4></li>
                                            <li><h5 className='text-secondary'>{item.description}</h5></li>
                                            <li className='text-success'><strong>Sale Price: </strong>${item.price}</li>
                                            <li className='text-info'>{item.discountPercentage}% off retail price</li>
                                            <li className='text-danger text-decoration-line-through'>${(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}</li>
                                            <li className='d-flex align-items-center'>
                                                <b>Qty: </b>
                                                <div className='quantity d-inline-block ms-3'>
                                                    <span className='decrement' onClick={() => onDecrement(item)}>➖</span>
                                                    <span className='bold'>{item.quantity}</span>
                                                    <span className='increment' onClick={() => onIncrement(item)}>➕</span>
                                                </div>
                                            </li>
                                            <li><b>Stock: </b>{item.stock}</li>
                                            <li><b>Stock left: </b>{item.stock - item.quantity}</li>
                                        </ul>
                                    </div>
                                    <div className='col col-1 d-flex justify-content-sm-around align-items-center'>
                                        <button className='btn btn-danger' onClick={() => onRemoveCartItem(item) } ><i className='fa fa-trash-o'></i></button>
                                        <button className='btn btn-success' disabled onClick={() => { console.log('buy', item) }} >Buy</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default Cart;