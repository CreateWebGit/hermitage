"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import FormSection from "./FormSection";
import Dropdown from "../Dropdowns";
import Input from "../Input";
import ProductSection from "./ProductSection";

import { TbCategoryPlus } from "react-icons/tb";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdOutlineDescription } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { Trash2 } from "lucide-react";
import { ListPlus } from "lucide-react";
import { FoldVertical } from "lucide-react";
import { RiDraggable } from "react-icons/ri";

const MenuList = ({ data }) => {
  const productsData = data.productsList;
  console.log(productsData);

  const [isAllCollapsed, setAllCollapsed] = useState(false);
  const [isSingelActive, setSingelActive] = useState(false);
  const [isActive, setActive] = useState({
    all: false,
    index: 100,
  });

  const [formField, setFormField] = useState(
    productsData === undefined
      ? [
          {
            categoryName: "",
            categoryID: uuidv4(),
            extanded: true,
            products: [
              {
                title: "",
                price: "",
                description: "",
                id: uuidv4(),
              },
            ],
          },
        ]
      : productsData
  );
  const [isCollapsed, setCollapsed] = useState("haj");

  console.log(formField);

  const updateCollaps = (collapsState) => {
    setCollapsed(collapsState);
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

  useEffect(() => {}, []);

  const addNewFieldSection = (e) => {
    e.preventDefault();
    let _formField = [];
    if (formField) {
      _formField = [...formField];
    }
    _formField?.push({
      categoryName: "haha",
      categoryID: uuidv4(),
      products: [
        {
          title: "",
          price: "",
          description: "",
          id: uuidv4(),
        },
      ],
    });
    setFormField(_formField);
    console.log(formField);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formField !== undefined) {
        console.log(formField);
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formField,
            type: "productsList",
          }),
        });
        console.log("haha");
        if (res.ok) {
          console.log("ok");
        } else {
          console.log("not ok");
        }
      }
    } catch (error) {
      console.log("haha");
    }
  };

  const handleDragStart = () => {};

  const handleDragEnd = (result) => {
    /*
    const { destination, source, draggableId } = result;
    console.log(destination);
    console.log(source);
    console.log(draggableId);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const _formField = Array.from(formField);
    console.log(_formField);

    console.log(source.index);

    const [_formFieldCategory] = _formField.splice(source.index, 1);
    console.log(_formFieldCategory);

    _formField.splice(destination.index, 0, _formFieldCategory);

    setFormField(_formField);
    */
  };

  const toggleExppand = (expand) => {
    let _formField = [...formField];
    console.log(_formField);
    _formField.map((item) => {
      item.expanded = expand;
    });
    console.log(_formField);
    setFormField(_formField);
  };

  return (
    <div className="bg-slate-100 w-full min-h-full">
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className=" bg-slate-100 w-full min-h-full">
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col w-[70%] m-auto  gap-4 px-32 border">
              <button onClick={() => toggleExppand(false)}>Stäng alla</button>
              <Droppable droppableId="haha">
                {(droppableProvider, snapshot) => (
                  <div
                    className={
                      snapshot.isDraggingOver ? "bg-orange-300 px-8" : " px-8"
                    }
                    ref={droppableProvider.innerRef}
                    {...droppableProvider.droppableProps}
                  >
                    {formField?.map((field, categoryIndex, index) => (
                      <div key={index}>
                        {/*
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
                          */}

                        <Draggable
                          draggableId={`${categoryIndex}`}
                          index={categoryIndex}
                          key={categoryIndex}
                        >
                          {(draggableProvider) => (
                            <div
                              {...draggableProvider.draggableProps}
                              ref={draggableProvider.innerRef}
                            >
                              <div
                                className="p-2"
                                {...draggableProvider.dragHandleProps}
                              >
                                <RiDraggable />
                              </div>
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
                                        handleChangesCategory(
                                          field?.categoryID,
                                          e
                                        );
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
                                        {/*
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
                                        */}
                                        <div className=" flex items-end w-[50px]">
                                          <div className="flex gap-2 px-2">
                                            {index > 0 ? (
                                              <button
                                                onClick={() =>
                                                  removeNewFieldRow(
                                                    field.categoryID,
                                                    index
                                                  )
                                                }
                                              >
                                                <Trash2 color="red" />
                                              </button>
                                            ) : (
                                              ""
                                            )}

                                            <button
                                              onClick={() =>
                                                addNewFieldRow(field.categoryID)
                                              }
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
                          )}
                        </Draggable>
                        {/*</Dropdown>*/}
                      </div>
                    ))}
                    {droppableProvider.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="flex justify-end gap-4">
                <button
                  className=" bg-blue-600 rounded-md py-2 px-4 text-white"
                  type="button"
                  onClick={addNewFieldSection}
                >
                  Ny kategori
                </button>
                <button
                  className=" bg-blue-600 rounded-md py-2 px-4 text-white"
                  type="submit"
                >
                  Spara
                </button>
              </div>
            </div>
          </form>
        </div>
      </DragDropContext>
    </div>
  );
};

export default MenuList;
