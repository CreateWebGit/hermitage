"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/utils/utils";
import AnimateHeight from "react-animate-height";
import { Draggable } from "@hello-pangea/dnd";
import { RiDraggable } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Trash2 } from "lucide-react";

const Dropdown = ({ title, onClick, children, expanded, categoryIndex }) => {
  console.log("haha", categoryIndex);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    console.log("haha");
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <Draggable
      draggableId={`${categoryIndex}`}
      index={categoryIndex}
      key={categoryIndex}
    >
      {(draggableProvider) => (
        <div className="m-0 p-0">
          <div
            className=" border-r border-l border-t border-t-gray-150 border-l-gray-150 border-r-gray-150 py-2 px-4  cursor-pointer flex justify-between items-center bg-white hover:bg-slate-200"
            onClick={onClick}
            {...draggableProvider.draggableProps}
            ref={draggableProvider.innerRef}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className="p-2" {...draggableProvider.dragHandleProps}>
              <RiDraggable />
            </div>
            <div
              className={
                title === "Ny sektion" ? "text-gray-300" : "text-black"
              }
            >
              {title}
            </div>
            <div className=" relative">
              <div
                className={cn(
                  " text-black absolute right-8",
                  isHovering ? "flex" : "hidden"
                )}
              >
                <button type="button">
                  <CiEdit size={26} />
                </button>
                <button type="button">
                  <Trash2 color="red" />
                </button>
              </div>
              <IoIosArrowDown
                className={cn(
                  "transition-all duration-300",
                  expanded ? "rotate-360" : "rotate-180"
                )}
              />
            </div>
          </div>
          <div className={cn("default", expanded ? "open" : "close")}>
            {children}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Dropdown;
