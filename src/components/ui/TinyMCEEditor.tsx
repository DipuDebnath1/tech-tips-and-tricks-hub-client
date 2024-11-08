/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = ({
  value,
  onChange,
  height = 150,
  toolbar = "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
  apiKey = "0c045137f3yeeksdlll1a5w8y6iqxwhx1e85yyr88z0iy5yz",
  ...props
}: any) => {
  const handleEditorChange = (content: any) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Editor
      apiKey={apiKey}
      init={{
        placeholder: "enter description here . . .",
        height,
        menubar: false,
        branding: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar,
      }}
      value={value}
      onEditorChange={handleEditorChange}
      {...props}
    />
  );
};

export default TinyMCEEditor;
