import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)
  if(!totalCartQuantity) return;
  return (
    <div className="bg-stone-800 px-4 py-4 text-stone-200 p-4 uppercase sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="text-stone-300 space-x-4 font-semibold sm:space-x-6 ">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
