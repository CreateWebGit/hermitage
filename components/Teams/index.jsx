"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select, { components } from "react-select";

import { FileUpload } from "../file-upload";
import StyledInput from "../StyledInput";
import FileUploader from "../FileUploader";
import { ImageForm } from "../image-form";
import { uuid } from "uuidv4";
import DropdownStuff from "../DropdownStuff";
import Input from "../Input";

import { GoPersonAdd } from "react-icons/go";
import { MdWorkspacePremium, MdOutlineDescription } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Tagfield from "../Tagfield";

const msgStyles = {
  background: "skyblue",
  color: "white",
};

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span className="custom-css-class">Empty Record Option Message!</span>
    </components.NoOptionsMessage>
  );
};

const Teams = ({ data, id }) => {
  const [isData, setData] = useState(data?.stuff);
  const [name, setName] = useState();
  const [myimage, setMyImage] = useState();

  const [description, setDescription] = useState();
  const [isResetImage, setResetImage] = useState(false);
  const [isAllActive, setAllActive] = useState(false);
  const [image, setImage] = useState();
  const [isEditing, setEditing] = useState(false);

  const [isChangesPerson, setChangesPerson] = useState(false);
  const [isChangesPersonID, setChangesPersonID] = useState("");
  const [isChangesPersonINDEX, setChangesPersonINDEX] = useState();

  const [speciality, setSpeciality] = useState(["Frisör"]);
  const [userInput, setUserInput] = useState("");

  console.log(isChangesPersonID);

  const handleDragStart = () => {};

  const handleDragEnd = (result) => {
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

    const _isData = Array.from(isData);
    const [_isDataPerson] = _isData.splice(source.index, 1);
    _isData.splice(destination.index, 0, _isDataPerson);
    setData(_isData);
  };

  const notify = () =>
    toast.success(
      "Ny personal är registrerad!",
      {
        position: "top-center",
      },
      { autoClose: 1000 }
    );

  function handleDataFromChild(data) {
    console.log(data);
    setMyImage(data);
  }

  const handleCreate = () => {
    setResetImage(false);
    setChangesPerson(false);
    setEditing(true);
    setAllActive(true);
  };

  const addNewStuff = () => {
    let _isData = [...isData];
    _isData.push({
      name: name,
      img: image,
      speciality: speciality,
      despcription: description,
    });
    setData(_isData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("haha");
    const id = uuid();

    try {
      console.log(name);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          description,
          speciality,
          myimage,
          type: "stuff",
        }),
      });

      if (res.ok) {
        addNewStuff();
        notify();
        setAllActive(false);
        setImage("");
        document.getElementById("create-course-form").reset();
      } else {
        console.log("User registration failed: ");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const handleDeletePerson = async (id, index) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          type: "delete-person",
        }),
      });

      if (res.ok) {
        const _isData = Array.from(isData);
        _isData.splice(index, 1);
        setData(_isData);
      } else {
        console.log("User registration failed: ");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const handleChangesPerson = async (
    id,
    image,
    name,
    speciality,
    description,
    index
  ) => {
    setAllActive(true);
    setChangesPerson(true);
    setChangesPersonID(id);
    setChangesPersonINDEX(index);
    setImage(image);
    setName(name);
    setSpeciality(speciality);
    setDescription(description);
    //setEditing(true);
  };

  const handleSubmitChangesPerson = async (e) => {
    e.preventDefault;
    console.log("hej");

    let id = isChangesPersonID;
    console.log(id);

    try {
      console.log(name);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          description,
          speciality,
          image,
          type: "stuffChanges",
        }),
      });

      if (res.ok) {
        // notify();
        setAllActive(false);
        // setImage("");
        // document.getElementById("create-course-form").reset();
        let _isData = isData;
        _isData[isChangesPersonINDEX].img = image;
        _isData[isChangesPersonINDEX].name = name;
        _isData[isChangesPersonINDEX].despcription = description;
        _isData[isChangesPersonINDEX].speciality = speciality;
        setData(_isData);

        console.log("jajjja", _isData);
        console.log(isChangesPersonINDEX);
      } else {
        console.log("User registration failed: ");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <>
      <DropdownStuff isAllActive={isAllActive} setAllActive={setAllActive}>
        <div className="w-[80%] h-[400px] m-auto border rounded-md p-4 flex gap-8 items-center relative">
          <div className="absolute top-4 right-4">
            <button onClick={() => setAllActive(false)}>
              <IoCloseCircleOutline size={22} />
            </button>
          </div>
          <div className="">
            <FileUploader
              width="w-[300px]"
              height="h-[280px]"
              imageUrl={(url) => handleDataFromChild(url)}
              aspect=""
              isResetImage={isResetImage}
              setResetImage={setResetImage}
              image={image}
              setImage={setImage}
              isEditing={isEditing}
              setEditing={setEditing}
            />
          </div>

          <form
            id="create-course-form"
            onSubmit={handleFormSubmit}
            className="w-full"
          >
            <div className="">
              <Input
                name="name"
                icon={<GoPersonAdd />}
                onChange={(e) => setName(e.target.value)}
                placeholder="Namn"
                value={name}
              />

              <Tagfield
                tags={speciality}
                setTags={setSpeciality}
                userInput={userInput}
                setUserInput={setUserInput}
              />

              <Input
                name="description"
                icon={<MdOutlineDescription />}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Personbeskrivning"
                type="textarea"
                value={description}
              />
            </div>

            <div className="absolute right-4 bottom-4">
              {isChangesPerson ? (
                <button
                  type="button"
                  onClick={(e) => handleSubmitChangesPerson(e)}
                >
                  Uppdatera
                </button>
              ) : (
                <button type="submit">Registrera</button>
              )}
            </div>
          </form>
        </div>
      </DropdownStuff>
      <div className="w-[80%] m-auto border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between border-b p-b-2">
          <div className="text-xl font-extralight">Vår Personal</div>
          <button onClick={handleCreate}>Lägg till</button>
        </div>
        <div className="bg-white py-4">
          <DragDropContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <div className="flex border-t border-b">
              <div className="ml-[132px] w-[250px] border">Namn</div>
              <div className="w-[300px] border">Personalbeskrivning</div>
              <div className="border">Kompetens</div>
            </div>
            <Droppable droppableId="haha">
              {(droppableProvider, snapshot) => (
                <div
                  ref={droppableProvider.innerRef}
                  {...droppableProvider.droppableProps}
                >
                  {isData?.map((stuff, index) => (
                    <Draggable
                      draggableId={`${index}`}
                      index={index}
                      key={index}
                    >
                      {(draggableProvider) => (
                        <div
                          className="flex items-center py-4 border-b bg-white"
                          {...draggableProvider.draggableProps}
                          ref={draggableProvider.innerRef}
                        >
                          <div
                            className="p-2"
                            {...draggableProvider.dragHandleProps}
                          >
                            <RiDraggable />
                          </div>
                          <div className="w-[100px]">
                            <Image
                              src={stuff?.img}
                              width={80}
                              height={120}
                              className=" rounded-md"
                            />
                          </div>
                          <div className="w-[250px] border text-2xl">
                            {stuff.name}
                          </div>
                          <div className="w-[300px] border">
                            {stuff.despcription}
                          </div>
                          <div className="w-[300px] border">
                            {stuff.speciality.map((item, i, { length }) => {
                              if (i + 1 === length) {
                                return (
                                  <div className=" inline-block">{item}</div>
                                );
                              }
                              return (
                                <div className=" inline-block">
                                  {item},&nbsp;
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleChangesPerson(
                                  stuff._id,
                                  stuff.img,
                                  stuff.name,
                                  stuff.speciality,
                                  stuff.despcription,
                                  index
                                )
                              }
                            >
                              <CiEdit />
                            </button>
                            <button
                              onClick={() =>
                                handleDeletePerson(stuff._id, index)
                              }
                            >
                              <MdOutlineDelete />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvider.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Teams;
