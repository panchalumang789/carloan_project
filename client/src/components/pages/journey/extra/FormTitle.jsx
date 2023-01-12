import React from "react";

const FormTitle = (props) => {
  return (
    <div>
      <p className="text-3xl after:w-0 font-semibold hover:after:w-full after:block after:h-1 after:bg-primary-color-1 dark:after:bg-primary-color-3 after:transition-all after:duration-700 after:rounded-xl after:mt-1.5">
        {props.formTitle}
      </p>
    </div>
  );
};

export default FormTitle;
