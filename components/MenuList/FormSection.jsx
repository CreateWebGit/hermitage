import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

import Dropdown from "../Dropdowns";
import Input from "../Input";
import { cn } from "@/utils/utils";

import { IoPricetagsOutline } from "react-icons/io5";
import { HandPlatter, Trash2 } from "lucide-react";
import { BsInfoLg } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { RiDraggable } from "react-icons/ri";

const FormSection = ({
  field,
  categoryIndex,
  formField,
  setFormField,
  setEditWindow,
  isEditWindow,
}) => {
  const [isCategoryID, setCategoryID] = useState("");
  const [isProductTitle, setProductTitle] = useState("");
  const [isProductPrice, setProductPrice] = useState("");
  const [isProductDescription, setProductDescription] = useState("");
  const [isProductVegan, setProductVegan] = useState(false);
  const [isEditProductWindow, setEditProductWindow] = useState(false);

  const saveCatID = async (id) => {
    await setCategoryID(id);
    console.log(isCategoryID);
  };

  const removeNewFieldRow = (categoryID, myindex) => {
    const index = formField.findIndex(
      (category) => category.categoryID === categoryID
    );

    let _formField = [...formField];

    _formField[index].products.splice(myindex, 1);
    setFormField(_formField);
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

  const handleNewProductSubmit = async (id, i) => {
    const index = formField.findIndex((product) => product.categoryID === id);

    let _formField = [...formField];
    _formField[index].products.push({
      id: uuidv4(),
      title: isProductTitle,
      price: isProductPrice,
      description: isProductDescription,
      vegan: isProductVegan,
    });

    setFormField(_formField);

    setCategoryID("");
    setProductDescription("");
    setProductPrice("");
    setProductTitle("");
    setProductVegan(false);

    try {
      if (formField !== undefined) {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _formField,
            type: "productsList",
          }),
        });

        if (res.ok) {
          console.log("ok");
          setEditWindow(false);
        } else {
          console.log("not ok");
        }
      }
    } catch (error) {
      console.log("haha");
    }
  };

  const handleChangesProduct = (categoryID, id, event) => {
    const categoryIndex = formField.findIndex(
      (category) => category.categoryID === categoryID
    );
    console.log(categoryIndex);
    console.log(id);
    let _formField = [...formField];

    const productIndex = formField[categoryIndex].products.findIndex(
      (product) => product.id === id
    );
    console.log(id);

    _formField[categoryIndex].products[productIndex][event.target.name] =
      event.target.value;

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

  const handleDragStart = () => {};

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const _formField = formField;
    console.log(_formField[source.droppableId].products);
    const [_isDataPerson] = _formField[source.droppableId].products.splice(
      source.index,
      1
    );
    _formField[source.droppableId].products.splice(
      destination.index,
      0,
      _isDataPerson
    );
    console.log(_formField);
    setFormField(_formField);

    try {
      if (formField !== undefined) {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _formField,
            type: "productsList",
          }),
        });

        if (res.ok) {
          console.log("ok");
          setEditWindow(false);
        } else {
          console.log("not ok");
        }
      }
    } catch (error) {
      console.log("haha");
    }
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
      >
        <div className="flex flex-row items-end bg-white p-4 mb-4 mt-0 border-r border-l border-b border-b-gray-150 border-l-gray-150 border-r-gray-150">
          <div
            className={cn(
              " fixed top-0 left-[200px] right-0  bottom-0 bg-slate-500/90  h-full justify-center items-center",
              isEditWindow && isCategoryID === field.categoryID
                ? "flex"
                : "hidden"
            )}
          >
            <div className=" bg-white w-10/12 h-5/6 pt-32 px-16 pb-4 relative ">
              <div
                className=" absolute top-2 right-2"
                onClick={() => {
                  setEditWindow(false);
                  setCategoryID("");
                }}
              >
                X
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col grow ">
                  <Input
                    name="title"
                    label="Titel"
                    type="text"
                    value={isProductTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    placeholder="Titel på maträtt"
                    Icon={HandPlatter}
                  />
                </div>
                <div className="flex flex-col grow-0 w-1/4">
                  <Input
                    name="price"
                    label="Pris"
                    type="text"
                    value={isProductPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Pris"
                    Icon={IoPricetagsOutline}
                  />
                </div>
              </div>
              <div>
                <Input
                  name="price"
                  label="Beskrivning"
                  type="textarea"
                  value={isProductDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Kort beskrivning"
                  Icon={BsInfoLg}
                />
              </div>
              <div className="allergiesContainer">
                <input
                  type="checkbox"
                  id="veganskt"
                  name="alergier"
                  value={isProductVegan}
                  onChange={(e) => setProductVegan(e.target.value)}
                />
                <label htmlFor="veganskt">Veganskt</label>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleNewProductSubmit(field.categoryID, categoryIndex)
                }
              >
                Registrera
              </button>
            </div>
          </div>
          <div className="grow">
            <DragDropContext
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
            >
              <Droppable droppableId={`${categoryIndex}`}>
                {(droppableProvider, snapshot) => (
                  <div
                    ref={droppableProvider.innerRef}
                    {...droppableProvider.droppableProps}
                  >
                    {field?.products.map((product, index) => (
                      <div>
                        <Draggable
                          draggableId={`${index}`}
                          index={index}
                          key={index}
                        >
                          {(draggableProvider) => (
                            <div
                              key={product.id}
                              className="flex flex-row items-end bg-slate-400 p-4 my-4 ml-6 "
                              {...draggableProvider.draggableProps}
                              ref={draggableProvider.innerRef}
                            >
                              <div
                                className="p-2"
                                {...draggableProvider.dragHandleProps}
                              >
                                <RiDraggable />
                              </div>
                              <div className=" relative flex w-full">
                                <div className=" flex justify-between w-full  ">
                                  <div>{product.title}</div>

                                  <div className="flex gap-2 px-2">
                                    <button
                                      type="button"
                                      onClick={
                                        () => setEditProductWindow(true)
                                        // editFieldRow(field.categoryID, product.id)
                                      }
                                    >
                                      <CiEdit size={26} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeNewFieldRow(
                                          field.categoryID,
                                          index
                                        )
                                      }
                                    >
                                      <Trash2 color="red" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      </div>
                    ))}
                    {droppableProvider.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditWindow(true);
                    saveCatID(field.categoryID);
                    // setCategoryID(field.categoryID);
                  }}
                >
                  Lägg till
                </button>
              </div>
            </DragDropContext>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default FormSection;
