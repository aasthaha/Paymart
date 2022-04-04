import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import { cartEmpty,loadCart } from './helper/cartHelper'
import StripeCheckoutButton from 'react-stripe-checkout'
import { API } from '../backend'
import {createOrder} from "./helper/orderHelper"

 const StripeCheckout = ({products,setReload} = f => f) => {

const [data,setData] = useState({
    loading:"false",
    success:"false",
    error:"",
    address:""  
})
const token = isAutheticated() && isAutheticated().token
const userId = isAutheticated() && isAutheticated().user._id
const getFinalPrice = () => {
  let amount = 0;
  products.map(p=>{
      amount+=p.price
  })
  return amount
}

const makePayment = token => {
console.log(`${API}stripepayment`)
    const body = {
      token,
      products
    };
    console.log({
    body
    })

    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        //call further methods
        const {status} = response;
        console.log("STATUS",status)
        cartEmpty()
      })
      .catch(error => console.log(error));
  };


const showStripeButton = () => {
    return isAutheticated() ? (
        <StripeCheckoutButton
        stripeKey="pk_test_51KOKypSJFIOBfxgU1Mk4qj1cv0Or1mZtE01Mpjd4PSASR6zD5DLJLUdWcDTMlowX30oweRkTk6Z68MfjgEHy7kUK00c7O2as1H"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
        >
        <button className='btn btn-success'>Pay with Stripe</button>
        </StripeCheckoutButton>
    ) : (
        <Link to="/signin">
        <button className='btn btn-warning'>Signin </button>
        </Link>
    )
}
  return (
    <div>
        <h3 className='text-white'>Stripe Checkout ${getFinalPrice()}</h3>
        {showStripeButton()}
    </div>
  )
}
export default StripeCheckout