import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatFileSize } from "../../utils/size-file";
import MenuPanel from "./MenuPanel";
import DeleteIcon from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { url } from "../../api/Peticiones";

const FileManager = ({
  items = [],
  show = false,
  upload = true,
  onDelete = () => {},
  handleSetListFiles = () => {},
  itemSelect = () => {},
}) => {
  const fileInputRef = useRef(null);
  const [isMosaic, setIsMosaic] = useState(false);
  const [files, setFile] = useState([]);
  const [inDrag, setInDrag] = useState(false);

  useEffect(() => {
    setFile(items);
  }, [items]);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDragOver = useCallback(
    (e) => {
      if (!upload) return;
      e.preventDefault();
      !inDrag && setInDrag(true);
    },
    [inDrag, upload]
  );

  const handleDrop = useCallback(
    (e) => {
      if (!upload) return;
      e.preventDefault();
      setInDrag(false);
      setFile([
        ...files,
        ...Array.from(e.dataTransfer.files).map((file) => {
          return {
            file,
            customName: `${new Date().getTime()}----${file.name}`,
          };
        }),
      ]);
    },
    [files, upload]
  );

  const onDragLeave = useCallback(
    (e) => {
      if (!upload) return;
      e.preventDefault();
      setInDrag(false);
    },
    [upload]
  );

  const handleChangeStatusView = useCallback(() => {
    setIsMosaic(!isMosaic);
  }, [isMosaic]);

  const handleClose = useCallback(() => {
    typeof handleSetListFiles == "function" && handleSetListFiles(files);
  }, [files]);

  const handleRemove = useCallback(
    (index, item) => {
      if (!upload) return;
      typeof onDelete == "function" && onDelete(item);
      setFile(files.filter((_, i) => index !== i));
    },
    [files, upload]
  );

  const handleOpenFile = useCallback(() => {
    if (!upload) return;
    fileInputRef.current.click();
  }, [fileInputRef, upload]);

  const handleChangeFile = useCallback(
    (e) => {
      if (!upload) return;
      let _files = e?.target?.files ? Array.from(e?.target?.files) : [];

      setFile([
        ...files,
        ...Array.from(_files).map((file) => {
          return {
            file,
            customName: `${new Date().getTime()}----${file.name}`,
          };
        }),
      ]);
    },
    [files, upload]
  );

  const itemsMenu = useMemo(() => {
    let items = [
      {
        icon: { Component: RemoveRedEyeIcon },
        title: "Ver",
        key: "view",
      },
    ];

    if (upload) {
      items.push({
        icon: { Component: DeleteIcon },
        title: "Remover",
        key: "remove",
      });
    }

    items.push({
      icon: { Component: Download },
      title: "Descargar",
      key: "download",
    });

    return items;
  }, [upload]);

  const handleDownload = (file) => {
    console.log({ file });
    fetch(`${url}${file.src}/download`)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", file.name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error al descargar el archivo:", error);
      });
  };

  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        background: "white",
        zIndex: 10,
        padding: 24,
        display: show ? "flex" : "none",
        flexDirection: "column",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
    >
      {upload ? (
        <form
          method="post"
          encType="multipart/form-data"
          style={{ opacity: 0 }}
        >
          <input
            type="file"
            name="files[]"
            multiple
            accept=".jpg, .jpeg, .png"
            ref={fileInputRef}
            onChange={handleChangeFile}
          />
        </form>
      ) : (
        ""
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {upload ? (
          <div onClick={handleClose} style={{ cursor: "pointer" }}>
            <ArrowBackIcon />
          </div>
        ) : (
          <div></div>
        )}
        <div onClick={handleChangeStatusView} style={{ cursor: "pointer" }}>
          {isMosaic ? <FormatListBulletedIcon /> : <AutoAwesomeMosaicIcon />}
        </div>
      </div>

      {files.length ? (
        <div
          style={{
            flex: "1 1 auto",
            overflow: "hidden",
            overflowY: "auto",
            display: "flex",
          }}
        >
          {!isMosaic ? (
            <TableContainer component={Paper} style={{ height: "100%" }}>
              <Table
                sx={{ minWidth: 650 }}
                style={{ height: !files.length ? "100%" : "auto" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Tamaño de archivo</TableCell>
                    {upload ? (
                      <TableCell>
                        <MoreVertIcon />
                      </TableCell>
                    ) : (
                      ""
                    )}
                  </TableRow>
                </TableHead>
                <TableBody style={{ height: "100%" }}>
                  {files.map((data, i) => {
                    const file = data.file || data;
                    let etx = file.name.split(".").pop();
                    let isImage = ["jpg", "jpeg", "png"].includes(etx);
                    let _itemsMenu = itemsMenu.filter(
                      (item) =>
                        (item.key == "view" && isImage) || item.key != "view"
                    );

                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={i}
                        style={{ maxHeight: "50px", overflow: "auto" }}
                      >
                        <TableCell component="th" scope="row">
                          {file.name}
                        </TableCell>
                        <TableCell>{formatFileSize(file.size)}</TableCell>

                        {_itemsMenu.length ? (
                          <TableCell>
                            <MenuPanel
                              buttonPoints
                              items={_itemsMenu}
                              handleClick={(key) => {
                                key == "remove" && handleRemove(i, file);
                                key == "view" && itemSelect(file);
                                key == "download" && handleDownload(file);
                              }}
                            />
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div
              style={{
                flex: "1 1 auto",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div>
                <h6>Todos los elementos</h6>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridAutoRows: "13rem",
                  gridTemplateColumns: "repeat(auto-fill, minmax(7rem, 12rem))",
                  flex: "1 1 auto",
                  overflow: "hidden",
                  overflowY: "auto",
                }}
              >
                {files.map((data, i) => {
                  const file = data.file || data;
                  const fileName = file.name;
                  let etx = fileName.split(".").pop();
                  let isImage = ["jpg", "jpeg", "png"].includes(etx);
                  let _itemsMenu = itemsMenu.filter(
                    (item) =>
                      (item.key == "view" && isImage) || item.key != "view"
                  );

                  const preview = isImage
                    ? file.src
                      ? `${url}/${file.src}`
                      : URL.createObjectURL(file)
                    : null;

                  return (
                    <div
                      className="card-file"
                      style={{
                        height: 200,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        cursor: isImage ? "pointer" : "auto",
                      }}
                      key={i}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingBottom: 3,
                        }}
                      >
                        <div
                          className="truncate"
                          style={{ maxWidth: "9rem", overflow: "hidden" }}
                        >
                          <span
                            style={{ fontWeight: "bold", fontSize: ".9em" }}
                          >
                            {fileName}
                          </span>
                        </div>

                        {_itemsMenu.length ? (
                          <div
                            style={{
                              flex: "1 1 auto",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <MenuPanel
                              buttonPoints
                              items={_itemsMenu}
                              handleClick={(key) => {
                                key == "remove" && handleRemove(i, file);
                                key == "view" && itemSelect(file);
                                key == "download" && handleDownload(file);
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div
                        style={{
                          flex: "1 1 auto",
                          backgroundColor: "white",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                        onClick={() => {
                          isImage && itemSelect(file);
                        }}
                      >
                        {isImage ? (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={preview}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ) : (
                          <InsertDriveFileIcon style={{ fontSize: "4em" }} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {!files.length && upload ? (
        <div
          style={{
            flex: "1 1 auto",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={handleOpenFile}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 100,
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "50px 0",
              cursor: "pointer",
            }}
          >
            <InsertDriveFileIcon
              style={{ fontSize: "7em", marginBottom: 10, opacity: 0.4 }}
            />

            {inDrag ? (
              <div style={{ textAlign: "center" }}>
                <strong style={{ fontSize: "1.7em" }}>
                  Suelta el/los archivos para comenzar a subir
                </strong>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <strong style={{ fontSize: "1.7em" }}>
                  Suelta los archivos aqui
                </strong>
                <p style={{ color: "rgba(0,0,0,.4)" }}>
                  o haz click para agregar archivos
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {!files.length && !upload ? (
        <div
          style={{ padding: "50px 0", textAlign: "center", fontSize: "3em" }}
        >
          <p>No hay archivos que mostrar</p>
        </div>
      ) : null}
    </div>
  );
};

export default FileManager;
