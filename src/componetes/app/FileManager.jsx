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
import { useCallback, useEffect, useRef, useState } from "react";
import { formatFileSize } from "../../utils/size-file";
import MenuPanel from "./MenuPanel";
import DeleteIcon from "@mui/icons-material/Delete";

const FileManager = ({
  items = [],
  show = false,
  onDelete = () => {},
  handleSetListFiles = () => {},
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
      e.preventDefault();
      !inDrag && setInDrag(true);
    },
    [inDrag]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setInDrag(false);
      setFile([...files, ...e.dataTransfer.files]);
    },
    [files]
  );

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setInDrag(false);
  }, []);

  const handleChangeStatusView = useCallback(() => {
    setIsMosaic(!isMosaic);
  }, [isMosaic]);

  const handleClose = useCallback(() => {
    typeof handleSetListFiles == "function" && handleSetListFiles(files);
  }, [files]);

  const handleRemove = useCallback(
    (index, item) => {
      typeof onDelete == "function" && onDelete(item);
      setFile(files.filter((_, i) => index !== i));
    },
    [files]
  );

  const handleOpenFile = useCallback(() => {
    fileInputRef.current.click();
  }, [fileInputRef]);

  const handleChangeFile = useCallback(
    (e) => {
      let _files = e?.target?.files ? Array.from(e?.target?.files) : [];
      setFile([...files, ..._files]);
    },
    [files]
  );

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
      onDragEle
      onDrop={handleDrop}
    >
      <form method="post" enctype="multipart/form-data" style={{ opacity: 0 }}>
        <input
          type="file"
          name="files[]"
          multiple
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
          onChange={handleChangeFile}
        />
      </form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div onClick={handleClose} style={{ cursor: "pointer" }}>
          <ArrowBackIcon />
        </div>
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
                    <TableCell>
                      <MoreVertIcon />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ height: "100%" }}>
                  {files.map((file, i) => {
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
                        <TableCell>
                          <MenuPanel
                            buttonPoints
                            items={[
                              {
                                icon: { Component: DeleteIcon },
                                title: "Remove",
                                key: "remove",
                              },
                            ]}
                            handleClick={(key) => {
                              key == "remove" && handleRemove(i, file);
                            }}
                          />
                        </TableCell>
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
                {files.map((file, i) => {
                  const fileName = file.name;
                  const fileExtension = fileName.substring(
                    fileName.lastIndexOf(".") + 1
                  );
                  const isImage = ["jpg", "jpeg", "png"].includes(
                    fileExtension
                  );
                  const preview = isImage
                    ? file.src || URL.createObjectURL(file)
                    : null;

                  return (
                    <div className="card-file" style={{ height: 200 }} key={i}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingBottom: 3,
                        }}
                      >
                        <div className="truncate" style={{ maxWidth: "9rem" }}>
                          <span
                            style={{ fontWeight: "bold", fontSize: ".9em" }}
                          >
                            {fileName}
                          </span>
                        </div>

                        <div
                          style={{
                            flex: "1 1 auto",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <MenuPanel
                            buttonPoints
                            items={[
                              {
                                icon: { Component: DeleteIcon },
                                title: "Remove",
                                key: "remove",
                              },
                            ]}
                            handleClick={(key) => {
                              key == "remove" && handleRemove(i, file);
                            }}
                          />
                        </div>
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
                      >
                        {isImage ? (
                          <div style={{ width: "100%", height: "100%" }}>
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

      {!files.length ? (
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
    </div>
  );
};

export default FileManager;
