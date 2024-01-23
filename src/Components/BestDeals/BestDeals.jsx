/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { useGetProductsQuery } from "../../redux/features/api/productsApi/productsApi";
import { Spinner } from "keep-react";
import CountDown from "../CountDown/CountDown";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BestDeals = () => {
  const dispatch = useDispatch();
  // Set your target date here
  const targetDate = new Date("2024-12-31T23:59:59").getTime();
  const { data, error, isLoading } = useGetProductsQuery("");

  const products = data?.data;
  //   console.log(products);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return (
      <Spinner
        className="flex justify-center items-center mx-auto my-12"
        color="failure"
        size="lg"
      />
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center  py-12 font-semibold text-2xl">
        Something went wrong!
      </div>
    );
  }
  return (
    <div>
      <section className="mt-[72px]">
        <div className="flex justify-between items-center">
          <h2 className="text-[#191C1F] font-semibold text-[22px] flex justify-between items-center gap-10">
            <span>Best Deals</span>
            <CountDown targetDate={targetDate}></CountDown>
          </h2>
          <Link className="flex items-center gap-2 text-[#2DA5F3]" to={"/shop"}>
            <span className="font-semibold text-sm capitalize">
              Browse all products
            </span>
            <HiMiniArrowLongRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-5 justify-between items-center gap-2 mt-[20px]">
          {products?.slice(0, 10)?.map((product) => (
            <>
              <div className="card w-[248px] h-[296px] bg-base-100 shadow-xl rounded-none">
                <img
                  className="w-[216px] h-[188px] mx-auto rounded-sm py-3"
                  src={product.image}
                  alt={product.model}
                />

                <div className="px-4 py-1">
                  <p className="font-semibold text-[14px]">
                    If a dog chews shoes whose shoes does he choose?
                  </p>
                  <div className="card-actions font-semibold justify-between items-center mt-2 flex  ">
                    <div className="badge badge-outline text-[#2DA5F3]">
                      ${product?.price}
                    </div>
                    <div
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-sm text-[#2DA5F3] px-3"
                    >
                      <FaCartShopping />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BestDeals;
