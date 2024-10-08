/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { usePostOrderMutation } from "../../redux/features/api/orderApi/orderApi";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";
import { IoReturnUpBack } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { loadStripe } from "@stripe/stripe-js";
import {
  clearCart,
  decrementQuantity,
  getTotal,
  incrementQuantity,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

// console.log(stripePromise);

const BillingDetails = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [selectedOption, setSelectedOption] = useState("");
  console.log(selectedOption);
  const [shippingCost, setShippingCost] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  // console.log(shippingCost);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = totalAmount + shippingCost;
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setPaymentMethod(e.target.value);
  };
  const handleShippingCost = (e) => {
    setShippingCost(parseInt(e.target.value));
  };

  const [postOrder, { isLoading, isError, error }] = usePostOrderMutation();

  const user = useSelector((state) => state?.auth?.user);

  const itemsInCart = useSelector((state) => state?.cart?.cartItems);
  // console.log(itemsInCart);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecrementQuantity = (cartItem) => {
    dispatch(decrementQuantity(cartItem));
  };

  const handleIncrementQuantity = (cartItem) => {
    dispatch(incrementQuantity(cartItem));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = user?.displayName || "unregistered";
    const email = user?.email || "unregistered";
    const address = form.address.value;
    const city = form.city.value;
    const country = form.country.value;
    const postalCode = form.postalCode.value;
    console.log(name, email, address, city, country, postalCode);

    const order = {
      name,
      email,
      address,
      city,
      country,
      postalCode,
      price: totalPrice,
      items: cart,
      paymentOption: selectedOption,
    };
    console.log(order);
    try {
      const response = await postOrder({ ...order, paymentMethod });
      console.log(response);
      if (paymentMethod === "COD" || paymentMethod === "creditCard") {
        toast.success(response.data.message);
      }
      setTimeout(() => {
        dispatch(clearCart());
      }, 2000);

      setTimeout(() => {
        navigate("/user/dashboard/myOrders");
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  return (
    <div>
      <section className="bg-[#F9FAFB]">
        <div>
          <div className="w-full max-w-xl max-lg:max-w-xl mx-auto">
            <div className="my-5 grid grid-cols-3 justify-between items-start gap-5">
              <div className="lg:col-span-2 max-lg:order-1 max-w-md">
                <div className="text-center max-lg:hidden">
                  <h2 className="text-md font-extrabold text-[#333] border-b border-[#333]">
                    Billing Information
                  </h2>
                </div>
                <form onSubmit={handlePlaceOrder} className="lg:mt-12 ">
                  <div>
                    <h2 className="text-md font-semibold text-[#191C1F]">
                      Shipping info
                    </h2>
                    <div className="grid grid-cols-2 gap-6 mt-5">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        defaultValue={user?.displayName}
                        disabled
                        className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#10B981] outline-none"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        required
                        defaultValue={user?.email}
                        disabled
                        className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#10B981] outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Street address"
                        name="address"
                        required
                        className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#10B981] outline-none"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        required
                        className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#10B981] outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        required
                        className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#10B981] outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Postal code"
                        name="postalCode"
                        required
                        className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#10B981] outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-12">
                    <h2 className="text-md font-semibold text-[#191C1F] border-b border-gray-200 pb-1">
                      Shipping Cost
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 mt-8">
                      <div className="form-control border border-1 border-[#059669] px-2 ">
                        <label className="label cursor-pointer">
                          <div className="label-text flex items-center gap-2">
                            <LiaShippingFastSolid className="h-8 w-8" />
                            <div className="font-semibold">
                              <h5>UPS</h5>
                              <h6>Delivery : Today Cost : $60.00 </h6>
                            </div>
                          </div>
                          <input
                            type="radio"
                            name="shipping"
                            id="60.00"
                            defaultValue={60}
                            onChange={handleShippingCost}
                            className="radio radio-accent radio-sm"
                          />
                        </label>
                      </div>
                      <div className="form-control border border-[#059669] rounded px-2">
                        <label className="label cursor-pointer">
                          <span className="label-text flex items-center gap-2">
                            <LiaShippingFastSolid className="h-8 w-8" />
                            <div className="font-semibold">
                              <h5>UPS</h5>
                              <h6>Delivery : 7days Cost : $20.00 </h6>
                            </div>
                          </span>
                          <input
                            type="radio"
                            name="shipping"
                            id="20.00"
                            defaultValue={20}
                            onChange={handleShippingCost}
                            className="radio radio-accent radio-sm"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h2 className="text-md font-semibold text-[#191C1F] border-b border-gray-200 pb-1">
                      Payment method
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 mt-8">
                      <div className="form-control border border-[#059669] p-2 rounded">
                        <label className="label cursor-pointer">
                          <div className="label-text flex items-center gap-2">
                            <BsCreditCard2FrontFill className="h-5 w-5" />
                            <span className="font-semibold">Credit Card</span>
                          </div>
                          <input
                            type="radio"
                            name="payment"
                            value={"creditCard"}
                            onChange={handleOptionChange}
                            className="radio radio-accent radio-sm"
                          />
                        </label>
                      </div>
                      <div className="form-control border border-[#059669] p-2 rounded">
                        <label className="label cursor-pointer">
                          <div className="label-text flex items-center gap-2">
                            <FaSackDollar className="h-5 w-5" />
                            <span className="font-semibold">
                              Cash on delivery
                            </span>
                          </div>
                          <input
                            type="radio"
                            name="payment"
                            value={"COD"}
                            onChange={handleOptionChange}
                            className="radio radio-accent radio-sm"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex  gap-4 mt-8">
                    <Link
                      to={"/shop"}
                      className="w-full flex justify-center items-center gap-2 px-6 py-3 text-md bg-gray-100 text-[#333] rounded-md hover:bg-gray-200 font-semibold duration-300"
                    >
                      <IoReturnUpBack className="h-5 w-5" />
                      <span>Continue Shopping</span>
                    </Link>
                    <button
                      type="submit"
                      disabled={!itemsInCart?.length}
                      className="w-full flex justify-center items-center gap-1 px-6  text-md bg-[#10B981] text-white rounded-md hover:bg-[#059669] font-semibold duration-300"
                    >
                      <span> Confirm Order</span>
                      <HiMiniArrowLongRight className=" h-5 w-5 mt-1" />
                    </button>
                  </div>
                </form>
              </div>
              <div className="lg:sticky lg:top-0">
                <div className="relative h-full">
                  <h2 className="text-md text-center font-extrabold text-[#333] border-b border-[#333] ">
                    Order Summary
                  </h2>

                  <div className=" lg:overflow-auto  max-lg:mb-8">
                    <div className="space-y-6 mt-10 h-[100px]">
                      {itemsInCart?.length ? (
                        <div className="space-y-6 ">
                          {itemsInCart?.map((item) => (
                            <>
                              <div className="flex items-center justify-between ">
                                <div className="flex items-center justify-between gap-5">
                                  <img
                                    src={item?.thumbnail}
                                    className="w-[60px] h-[60px] p-4  bg-gray-200 rounded-md object-contain"
                                  />
                                  <div className="text-xs font-semibold text-[#333] space-y-1">
                                    <h3>{item?.title}</h3>

                                    <h3 className="flex items-center gap-2">
                                      Quantity :
                                      <span className="text-[#059669]">
                                        {item?.cartQuantity}
                                      </span>
                                    </h3>

                                    <h3 className="flex flex-wrap gap-2">
                                      <span>Total Price :</span>
                                      <span className=" text-[#059669]">
                                        ${item?.price * item.cartQuantity}
                                      </span>
                                    </h3>
                                  </div>
                                </div>

                                <div className="flex items-center justify-center font-sans">
                                  <div className="border border-gray-400 rounded">
                                    <button
                                      onClick={() =>
                                        handleDecrementQuantity(item)
                                      }
                                      id="decreaseBtn"
                                      className=" px-3 py-0  text-gray-700 font-semibold "
                                    >
                                      -
                                    </button>
                                    <input
                                      id="quantityInput"
                                      type="text"
                                      value={item.cartQuantity}
                                      className="w-5 py-0 text-center"
                                    />
                                    <button
                                      onClick={() =>
                                        handleIncrementQuantity(item)
                                      }
                                      id="increaseBtn"
                                      className=" px-3 py-0   font-semibold"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <div className="px-5 py-5 border-gray-200  text-sm">
                                  <span
                                    onClick={() => handleRemoveFromCart(item)}
                                    className="relative inline-block p-2  font-semibold text-red-900 leading-tight cursor-pointer"
                                  >
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-red-400 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">
                                      <RxCross2 className="w-4 h-4" />
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center font-sans">
                          <span className="flex justify-center mx-auto text-gray-500 font-semibold text-4xl">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 512 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path>
                            </svg>
                          </span>
                          <h2 className="font-medium  text-sm pt-2 text-gray-600">
                            No Item Added Yet!
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full my-5">
                    <div className="flex justify-center items-center gap-2">
                      <input
                        type="text"
                        placeholder="Input your coupon code"
                        className="px-2 py-2 bg-white text-[#333] w-full text-sm border-2 rounded focus:border-[#10B981] outline-none"
                      />
                      <button className=" px-6 py-2  text-md bg-[#10B981] text-white rounded-md hover:bg-[#059669] font-semibold font-sans duration-300">
                        <span>Apply</span>
                      </button>
                    </div>

                    <div>
                      <h4 className="flex flex-wrap gap-4 text-sm py-2 text-gray-400 font-semibold font-sans">
                        Subtotal
                        <span className="ml-auto text-[#333333]">
                          ${totalAmount}
                        </span>
                      </h4>
                      <h4 className="flex flex-wrap gap-4 text-sm py-2 text-gray-400 font-semibold font-sans">
                        Shipping Cost
                        {shippingCost ? (
                          <span className="ml-auto text-[#333333]">
                            ${shippingCost}
                          </span>
                        ) : (
                          <span className="ml-auto text-[#333333]">$00.00</span>
                        )}
                      </h4>
                      <h4 className="flex flex-wrap gap-4 text-sm py-2 text-gray-400 font-semibold font-sans">
                        Discount
                        <span className="ml-auto text-[#FB923C]">$00.00</span>
                      </h4>
                    </div>

                    <h4 className="flex flex-wrap gap-4 text-md text-[#059669]  font-semibold border-t py-2 font-sans">
                      Total Cost <span className="ml-auto">${totalPrice}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#EEF2FF] mt-12">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-3 justify-center items-center gap-5 text-center py-8">
            <div className="w-[350px] h-[350px]">
              <img
                src="https://i.ibb.co/yfFZL9M/app-download-img-c7xqg4.webp"
                alt=""
              />
            </div>
            <div>
              <h1 className="font-bold text-4xl ">
                Shop Your Daily Needs From Our kiChai Store
              </h1>
              <h6 className="text-[17px] mt-2">
                There are many products you will find in our shop, Choose your
                daily necessary product from our kiChai shop and get some
                special offers.
              </h6>

              <div className="flex items-center gap-2 justify-center">
                <Link to={"https://www.apple.com/app-store/"}>
                  <img
                    src="https://i.ibb.co/4WZCRJ0/download-on-the-app-store-apple-logo-svgrepo-com.png "
                    alt=""
                    className="w-[140px]"
                  />
                </Link>
                <Link to={"https://play.google.com/store/games?hl=en&gl=US"}>
                  <img
                    src=" https://i.ibb.co/6nB6K9s/google-play-badge-logo-svgrepo-com.png "
                    alt=""
                    className="w-[140px]"
                  />
                </Link>
              </div>
            </div>
            <div className="w-[350px] h-[350px] mx-auto">
              <img
                src="https://i.ibb.co/HqpV2Jk/Pngtree-online-shopping-concept-for-landing-5347803.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BillingDetails;
