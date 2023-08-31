import Button from '../button/button.component.jsx'
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.component.jsx'
import { CartContext } from '../../contexts/cart.context.jsx'
import { useContext, useState } from 'react'


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'> 
                {cartItems.map((item)=> {
                    <CartItem key={item.id} cartItem={item}/>
                })}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;