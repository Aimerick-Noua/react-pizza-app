/* eslint-disable react/no-unescaped-entities */
 import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store"
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = navigation.state ==="submitting";
  const formErrors = useActionData();
  const {username,error:errorAddress,status:addressStatus,position,address} = useSelector((store)=>store.user);
  const isLoadingAddress = addressStatus === 'loading';

  if(!cart.length) return <EmptyCart/>
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl mb-8 font-semibold">Ready to order? Let's go!</h2>
      {/* <Form method="POST" action="order/new"> */}
      <Form method="POST" >
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer"   defaultValue={username} className="input w-full" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label  className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="number" name="phone" required 
            className="input w-full"/>
          {formErrors?.phone && <p className="mt-2 bg-red-100 text-xs text-red-700 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label  className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" defaultValue={address} disabled={isLoadingAddress} className="input w-full" required />
            {addressStatus==='error'&& <p className="mt-2 bg-red-100 text-xs text-red-700 p-2 rounded-md">{errorAddress}</p>}

          </div>
          {!position.latitude && !position.longitude &&
          <span className="absolute right-1 z-50 top-[3px] sm:top-[5px]">
          <Button type="small" onClick={(e)=>{
            e.preventDefault();
            dispatch(fetchAddress())
            }}
            disabled={isLoadingAddress}>Get Position</Button>
          </span>
          }
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-bold">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="position" value={
            position.longitude && position.latitude ? `${position.latitude},${position.longitude}`:''
          }/>
          <Button disabled={isLoading || isLoadingAddress} type="primary">
            {isLoading? "Placing order ...":`Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}


export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  const order = {...data, cart:JSON.parse(data.cart),priority:data.priority==='true'}
  console.log(order);
  const errors  = {};
  //form validation
  if(!isValidPhone(order.phone))  errors.phone="Please we need your correct phone number to contact you"
  if(Object.keys(errors).length>0) return errors;

  //if everything is okay, create a new order and redirect
  const newOder = await createOrder(order);
 store.dispatch(clearCart());
  return redirect(`/order/${newOder.id}`);
  // return null;
}

export default CreateOrder;
