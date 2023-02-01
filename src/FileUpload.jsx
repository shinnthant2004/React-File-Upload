import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
// iconify
import { AiOutlineUpload } from "react-icons/ai";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbForPropImg = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: -8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  objectFit: "cover",
};

const container = {
  width: "100%",
  height: "100%",
  border: "2px dashed #DFE3E8",
  color: "#637381",
  padding: "1rem",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const aligncenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default function FormUpload({ handleImageChange }) {
  const [image, setImage] = useState("");

  // instances

  const [files, setFiles] = useState(
    []
    // preview: URL.createObjectURL(new Blob([image], { type: "image/jpeg" })),
  );

  const { getRootProps, getInputProps } = useDropzone({
    Accpet: "image/*",
    maxFiles: 1,

    onDrop: (acceptedFiles) => {
      setImage(null);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      handleImageChange(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      // URL.revokeObjectURL(file.preview);
    },
    [files]
  );

  return (
    <section className="container" style={container}>
      <div {...getRootProps({ className: "dropzone" })} style={aligncenter}>
        <input {...getInputProps()} />

        <AiOutlineUpload width={40} height={40} />
      </div>
      {image != null ? (
        <aside style={thumbsContainer}>
          <div style={thumbForPropImg} key="propsImage">
            <div style={thumbInner}>
              <img src={image} style={img} alt={""} />
            </div>
          </div>
        </aside>
      ) : null}
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
