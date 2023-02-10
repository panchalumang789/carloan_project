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
        " inset-0 z-10 bg-black/50 fixed flex justify-center flex-col items-center"
      }
    >
      <div className="w-1/2 text-end -m-12 z-10 px-12 ">
        <button
          className="text-3xl px-3 ml-auto py-2 w-16 h-10 fa-solid fa-close"
          onClick={closeModel}
        ></button>
      </div>
      <div className="w-2/3 flex justify-center">
        {/* <input className="w-2/3" type="image" src={props.image.link} alt={props.image.name} /> */}
        <input
          className="w-2/3 hover:cursor-default"
          type="image"
          src="https://car-loan-project.s3.ap-south-1.amazonaws.com/948a6804d572351519d4874258e79c63.jpg"
          alt={props.image.name}
        />
      </div>
    </div>
  );
};

export default DocumentModel;
