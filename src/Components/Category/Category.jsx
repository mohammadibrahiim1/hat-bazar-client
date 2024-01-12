/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "keep-react";
import { CaretDown, Plus } from "phosphor-react";
import React, { useState } from "react";

const Category = ({ category, setSelectedCategory }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeChildIndex, setActiveChildIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const childAccordion = (i) => {
    setActiveChildIndex(activeChildIndex === i ? null : i);
  };

  console.log(category);

  const { name, _id, index, subCategories, i } = category;
  const handleCategory = (value) => {
    setSelectedCategory(value);
  };

  return (
    <div className="mt-3">
      <div key={_id}>
        <div
          type={"primary"}
          className={`flex items-center justify-between  font-semibold text-red-500 p-2 hover:bg-gray-100 rounded-sm cursor-pointer ${
            activeIndex === index ? "active" : ""
          }`}
          onClick={() => toggleAccordion(index)}
        >
          <div className="flex items-center gap-3">{name}</div>
          <CaretDown size={18} />
        </div>

        {activeIndex === i && (
          <div>
            {subCategories?.map((subItem, i) => (
              <>
                <div
                  type={"primary"}
                  className={`flex items-center justify-between  font-semibold text-red-500 p-2 hover:bg-gray-100 rounded-sm cursor-pointer ${
                    activeChildIndex === i ? "active" : ""
                  }`}
                  onClick={() => childAccordion(i)}
                >
                  <div className="flex items-center gap-3 ms-4">
                    -{subItem?.name}
                  </div>
                  <CaretDown size={18} />
                </div>

                {activeChildIndex === i && (
                  <div>
                    {subItem?.subCategories?.map((child, i) => (
                      <>
                        <div
                          type={"primary"}
                          className={`flex items-center justify-between  font-semibold text-red-500 p-2 hover:bg-gray-100 rounded-sm cursor-pointer ${
                            activeChildIndex === i ? "active" : ""
                          }`}
                          onClick={() => childAccordion(i)}
                        >
                          <div className="flex items-center gap-3 ms-4">
                            -{child?.name}
                          </div>

                          <CaretDown size={18} />
                        </div>

                        {activeChildIndex === i && (
                  <div>
                    {subItem?.subCategories?.map((child, i) => (
                      <>
                        <div
                          type={"primary"}
                          className={`flex items-center justify-between  font-semibold text-red-500 p-2 hover:bg-gray-100 rounded-sm cursor-pointer ${
                            activeChildIndex === i ? "active" : ""
                          }`}
                          onClick={() => childAccordion(i)}
                        >
                          <div className="flex items-center gap-3 ms-4">
                            -{child?.name}
                          </div>

                          <CaretDown size={18} />
                        </div>


                        
                      </>
                    ))}
                  </div>
                )}

                      </>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
