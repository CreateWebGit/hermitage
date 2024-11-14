"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import FormSection from "./FormSection";
import { BsArrowsCollapse } from "react-icons/bs";
import { CgReorder } from "react-icons/cg";
import { cn } from "@/utils/utils";
import CategoryNamePopup from "./CategoryNamePopup";

useEffect(() => {
  document.documentElement.requestFullscreen();
}, []);

const MenuList = ({ data }) => {
  const productsData = data?.productsList;
  console.log(productsData);

  const [formField, setFormField] = useState(productsData);
  const [isOpen, setOpen] = useState(false);
  const [isCategoryName, setCategoryName] = useState("");
  const [isEditWindow, setEditWindow] = useState(false);
  const [isSortable, setSortable] = useState(false);

  console.log(isSortable);

  console.log(formField);

  const handleDragStart = () => {
    toggleExpand(false);
  };

  const handleDragEnd = async (result) => {
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

  const toggleExpand = (expand) => {
    let _formField = [...formField];
    console.log(_formField);
    _formField.map((item) => {
      item.expanded = expand;
    });
    console.log(_formField);
    setFormField(_formField);
  };

  const handleSort = () => {
    toggleExpand();
    setSortable((prevCheck) => !prevCheck);
  };

  const handleNewSectionSubmit = async (e) => {
    e.preventDefault();

    let _formField = [];
    if (formField) {
      _formField = [...formField];
    }
    console.log(isCategoryName);
    _formField.push({
      categoryName: isCategoryName,
      categoryID: uuidv4(),
      expanded: true,
      products: [],
    });

    setFormField(_formField);
    console.log(_formField);

    try {
      if (formField !== undefined) {
        console.log(_formField);
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
          setOpen(false);
        } else {
          console.log("not ok");
        }
      }
    } catch (error) {
      console.log("haha");
    }
  };

  return (
    <div className="bg-slate-100 w-full h-full relative ">
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className=" bg-slate-100 min-h-full px-8">
          <form>
            <div className="flex flex-col m-auto pt-8 ">
              <div className="flex justify-end gap-5 mb-4">
                <button
                  className=" flex items-center gap-2 bg-blue-600 px-2 py-1 rounded-md text-white shadow-lg"
                  type="button"
                  onClick={() => handleSort()}
                >
                  Sortera <CgReorder />
                </button>
                <button
                  className=" flex items-center gap-2 bg-blue-600 px-2 py-1 rounded-md text-white shadow-lg"
                  type="button"
                  onClick={() => toggleExpand(false)}
                >
                  Kollapsa <BsArrowsCollapse />
                </button>
              </div>
              <Droppable droppableId="haha">
                {(droppableProvider, snapshot) => (
                  <div
                    className={snapshot.isDraggingOver ? "" : ""}
                    ref={droppableProvider.innerRef}
                    {...droppableProvider.droppableProps}
                  >
                    {formField?.map((field, categoryIndex, index) => (
                      <div key={index}>
                        <FormSection
                          isSortable={isSortable}
                          setSortable={setSortable}
                          field={field}
                          categoryIndex={categoryIndex}
                          index={index}
                          formField={formField}
                          setFormField={setFormField}
                          isEditWindow={isEditWindow}
                          setEditWindow={setEditWindow}
                          isOpen={isOpen}
                          setOpen={setOpen}
                        />
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
                  onClick={() => setOpen(true)}
                >
                  Ny kategori
                </button>
              </div>
            </div>
          </form>
        </div>
      </DragDropContext>
      {isOpen && (
        <CategoryNamePopup
          isOpen={isOpen}
          setOpen={setOpen}
          isCategoryName={isCategoryName}
          setCategoryName={setCategoryName}
          handleNewSectionSubmit={handleNewSectionSubmit}
        />
      )}
    </div>
  );
};

export default MenuList;
