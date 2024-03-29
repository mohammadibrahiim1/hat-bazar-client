/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
// import { addToWishList } from "../../redux/features/wishList/wishListSlice";
import "./Product.css";
// import { FaCartShopping } from "react-icons/fa6";
import { BsBagPlusFill } from "react-icons/bs";
// import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { model, image, price, _id, status } = product;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  // const handleAddToWishList = () => {
  //   dispatch(addToWishList(product));
  // };

  return (
    <div>
      <div>
        <div className="card w-[296px] h-[320px] bg-base-100 shadow-xl rounded-none">
          <button className="text-start p-1  font-semibold text-[#10B981]">
            Stock : <span className="text-orange-500">{status}</span>
          </button>
          <Link to={`/productDetails/${_id} `}>
            <img
              className="w-[217px] h-[189px] mx-auto rounded-sm py-3"
              src={image}
              alt={model}
            />
          </Link>

          <div className="px-4 py-1">
            <h4 className="font-semibold text-[14px] text-[#10B981] duration-300">
              {model.slice(0, 27)}...
            </h4>
            <div className="card-actions font-semibold justify-between items-center mt-5 flex  ">
              <div className=" text-lg text-orange-500">${price}</div>
              <div className="flex justify-between items-center gap-1">
                {/* <div
                  onClick={handleAddToWishList}
                  className="btn btn-sm text-[#2DA5F3] px-3"
                >
                  <FaHeart />
                </div> */}
                <div
                  onClick={handleAddToCart}
                  className="cursor-pointer border rounded p-2 text-[#10B981] hover:bg-[#10B981] hover:text-[#FFF] duration-300"
                >
                  <BsBagPlusFill className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
