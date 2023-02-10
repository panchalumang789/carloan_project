import React, { useEffect, useState } from "react";

const DocumentModel = (props) => {
  const [display, setDisplay] = useState("hidden");

  useEffect(() => {
    setDisplay(props.display);
    return () => {};
  }, [props]);

  const closeModel = () => {
    props.setDisplay("hidden");
    setDisplay("hidden");
  };
  return (
    <div
      className={
        display +
        " inset-0 z-50 bg-black/50 fixed flex justify-center flex-col items-center"
      }
    >
      <div className="w-1/2 text-end -m-12 z-50 px-12 ">
        <button
          className="text-3xl px-3 ml-auto py-2 w-16 h-10 fa-solid fa-close text-black"
          onClick={closeModel}
        ></button>
      </div>
      <div className="w-2/3 flex justify-center">
        <input
          className="w-2/3 hover:cursor-default"
          type="image"
          src={props.image.link}
          alt={props.image.name}
        />
      </div>
    </div>
  );
};

export default DocumentModel;
