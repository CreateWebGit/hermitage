import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

import Dropdown from "../Dropdowns";
import Input from "../Input";

import { TbCategoryPlus } from "react-icons/tb";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdOutlineDescription } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { Trash2 } from "lucide-react";
import { ListPlus } from "lucide-react";
import { FoldVertical } from "lucide-react";
import ProductSection from "./ProductSection";

const FormSection = ({ field, categoryIndex, formField, setFormField }) => {
  const [isCollapsed, setCollapsed] = useState("haj");
  const [isAllCollapsed, setAllCollapsed] = useState(false);
  const [isSingelActive, setSingelActive] = useState(false);
  const [isActive, setActive] = useState({
    all: false,
    index: 100,
  });
  console.log(formField.categoryName);

  const updateProductsCollaps = () => {
    setActive({ all: true });
    //setAllCollapsed(collapsState);
  };

  const addNewFieldRow = (id) => {
    const index = formField.findIndex((product) => product.categoryID === id);
    console.log("index: ", index);
    console.log("id: ", id);
    console.log(formField);
    let _formField = [...formField];
    _formField[index].products.push({
      title: "",
      price: "",
      description: "",
      id: uuidv4(),
    });
    setFormField(_formField);
  };

  const removeNewFieldRow = (categoryID, myindex) => {
    const index = formField.findIndex(
      (category) => category.categoryID === categoryID
    );
    console.log(index);
    console.log(myindex.length);

    let _formField = [...formField];
    console.log(_formField);

    if (_formField[index].products.length > 1) {
      _formField[index].products.splice(myindex, 1);
      setFormField(_formField);
    }

    console.log(_formField[index].products.length);

    console.log(_formField);
  };

  const handleChangesCategory = (id, event) => {
    console.log("jaja");
    const index = formField.findIndex((product) => product.categoryID === id);
    console.log(index);
    let _formField = [...formField];

    _formField[index][event.target.name] = event.target.value;
    console.log("hahaha", _formField);
    setFormField(_formField);
  };

  const toggle = (id) => {
    console.log(id);
    const index = formField.findIndex((item) => item.categoryID === id);
    console.log(index);
    let _formField = [...formField];
    _formField[index].expanded = !_formField[index].expanded;
    setFormField(_formField);
  };

  return (
    <div>
      <Dropdown
        title={field?.categoryName}
        id={field?.categoryID}
        onClick={() => toggle(field?.categoryID)}
        expanded={field?.expanded}
        field={field}
        categoryIndex={categoryIndex}
        //draggableProvider={draggableProvider}

        // setAllActive={setCollapsed}
        // isAllActive={isCollapsed}
        // key={field?.categoryID}
        // isSingelActive={true}
        // draggableProvider={draggableProvider}
      >
        <div>
          <div className="relative flex flex-row items-end bg-slate-50 p-4 mb-4">
            <div className="grow">
              <div className="flex flex-col">
                <Input
                  name="categoryName"
                  label="Kategori"
                  type="text"
                  value={field?.categoryName}
                  onChange={(e) => {
                    //console.log(field.categoryID);
                    handleChangesCategory(field?.categoryID, e);
                  }}
                  placeholder="Produkt kategori"
                  icon={TbCategoryPlus}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    updateProductsCollaps();
                  }}
                >
                  <FoldVertical />
                </button>
              </div>
              {field?.products.map((product, index) => (
                <div
                  key={product.id}
                  className="flex flex-row items-end bg-white p-4 my-4 shadow-md"
                >
                  <div className="flex w-full">
                    <ProductSection
                      title={product.title}
                      categoryIndex={categoryIndex}
                      productIndex={index}
                      setAllActive={setAllCollapsed}
                      isAllActive={isAllCollapsed}
                      mykey={field.categoryID}
                      isSingelActive={isSingelActive}
                      isActive={isActive}
                      setActive={setActive}
                      formField={formField}
                      setFormField={setFormField}
                      field={field}
                      product={product}
                    />
                    <div className=" flex items-end w-[50px]">
                      <div className="flex gap-2 px-2">
                        {index > 0 ? (
                          <button
                            onClick={() =>
                              removeNewFieldRow(field.categoryID, index)
                            }
                          >
                            <Trash2 color="red" />
                          </button>
                        ) : (
                          ""
                        )}

                        <button
                          onClick={() => addNewFieldRow(field.categoryID)}
                        >
                          <ListPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default FormSection;
