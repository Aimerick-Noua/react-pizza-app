/* eslint-disable react/prop-types */
import { formatCurrency } from '../../utilities/helpers'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addItem,  getCurrentQuantityById } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity>0;
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-semibold">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          
          {isInCart && 
          <div className='flex gap-4 items-center sm:gap-8'>
            <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
            <DeleteItem pizzaId={id}/>  
          </div>
            }

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
