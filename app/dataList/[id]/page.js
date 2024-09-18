"use client";

import "antd/dist/reset.css";
import "styles/globals.css";
import FormComponent from "../component/form";

export default function FormPage(params) {
  const id = params.params.id;
  const title_name = id ? "Edit Data" : "Add Data";

  return (
    <div className="container">
      <h1>{title_name}</h1>
      <FormComponent id={id} />
    </div>
  );
}
