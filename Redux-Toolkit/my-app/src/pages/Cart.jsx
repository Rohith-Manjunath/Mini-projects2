import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../Redux/Slice";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const cart = useSelector((state) => state.cart); // Update this line
  console.log(cart);
  const dispatch = useDispatch();

  const Price = cart.reduce((a, item) => a + item.price * item.quantity, 0);

  const IncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };
  const DecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };
  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="p-5 flex gap-2 flex-col">
      {cart.map((item) => {
        return (
          <div
            key={item.id}
            className="flex justify-between items-center border border-gery p-2 rounded-md"
          >
            <div className="flex gap-5 items-center justify-start font-semibold text-slate-600 flex-wrap">
              <img src={item.image} alt="" className="w-[5rem]" />
              <h3>{item.title}</h3>
            </div>
            <div className="flex gap-5 items-center justify-center">
              <button
                onClick={() => IncreaseQuantity(item.id)}
                className="bg-red-600 text-white px-2 rounded-md py-1 border shadow-md active:translate-x-1 active:translate-y-1 transition-all duration-100"
              >
                +
              </button>
              <p className="font-bold text-green-800">{item.quantity}</p>
              <button
                onClick={() => DecreaseQuantity(item.id)}
                className="bg-red-600 text-white px-2 rounded-md py-1 border shadow-md active:translate-x-1 active:translate-y-1 transition-all duration-100"
              >
                -
              </button>
              <MdDelete
                className="text-red-500 text-2xl shadow-md active:translate-x-1 active:translate-y-1 transition-all duration-100 hover:cursor-pointer"
                onClick={() => removeItem(item.id)}
              />
            </div>
          </div>
        );
      })}

      <h2 className="self-end font-bold text-green-600">
        Total - {Price.toFixed(2)} $
      </h2>
    </div>
  );
};

export default Cart;
