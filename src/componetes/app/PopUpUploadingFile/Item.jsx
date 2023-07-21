import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { dispatch } from "store";
import { updateFile } from "store/slices/file";
import { url } from "../../../api/Peticiones";
import { FILE_STATUS } from "./utils";

const ItemPopUpUploadingFile = ({ data }) => {
  const { file, percentage, uploadedChunkSize, orderId } = data;
  const _file = file.file;
  const rootPetition = `${url}/${orderId}/upload-file-orden-service/${file.customName}`;
  const [hover, setHover] = useState(false);
  const [request, setRequest] = useState();

  useEffect(() => {
    uploadFile();
  }, []);

  const uploadFile = () => {
    return fetch(`${rootPetition}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("serviceToken")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        uploadFileChunks(0);
      })
      .catch((e) => {
        console.log("error", { e });
      });
  };

  const uploadFileChunks = (startingByte) => {
    const formData = new FormData();
    const req = new XMLHttpRequest();
    const chunk = _file.slice(startingByte);

    formData.append("chunk", chunk, _file.name);

    req.open("POST", rootPetition, true);
    req.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("serviceToken")}`
    );
    req.setRequestHeader(
      "Content-Range",
      `bytes=${startingByte}-${startingByte + chunk.size}/${_file.size}`
    );

    req.onload = (e) => {
      if (req.status === 200) {
        dispatch(
          updateFile({
            id: data.id,
            status: FILE_STATUS.COMPLETED,
          })
        );
      } else {
        dispatch(
          updateFile({
            id: data.id,
            status: FILE_STATUS.FAILED,
          })
        );
      }
    };

    req.upload.onprogress = (e) => {
      const loaded = e.loaded + uploadedChunkSize;
      const percentage = (loaded * 100) / _file.size;

      dispatch(
        updateFile({
          id: data.id,
          status:
            percentage > 100 ? FILE_STATUS.COMPLETED : FILE_STATUS.UPLOADING,
          percentage: percentage > 100 ? 100 : percentage,
          uploadedChunkSize: loaded,
        })
      );
    };

    req.ontimeout = () => {
      dispatch(
        updateFile({
          id: data.id,
          status: FILE_STATUS.FAILED,
        })
      );
    };

    req.onabort = () => {
      dispatch(
        updateFile({
          id: data.id,
          status: FILE_STATUS.PAUSED,
        })
      );
    };

    req.onerror = () => {
      dispatch(
        updateFile({
          id: data.id,
          status: FILE_STATUS.FAILED,
        })
      );
    };

    setRequest(req);

    req.send(formData);
  };

  const retryFileUpload = () => {
    return fetch(`${rootPetition}/status`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("serviceToken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        uploadFileChunks(Number(res.totalChunkUploaded));
      })
      .catch(() => {
        uploadFileChunks(Number(uploadedChunkSize || 0));
      });
  };

  const handleChangeStatus = (status) => {
    if (status == FILE_STATUS.PAUSED) {
      request.abort();
    }

    if (status == FILE_STATUS.UPLOADING) {
      retryFileUpload();
    }

    dispatch(
      updateFile({
        id: data.id,
        status,
      })
    );
  };

  useEffect(() => {
    window.addEventListener("online", function () {
      retryFileUpload();
      dispatch(
        updateFile({
          id: data.id,
          status: FILE_STATUS.UPLOADING,
        })
      );
    });

    window.addEventListener("offline", function () {
      dispatch(
        updateFile({
          id: data.id,
          status: FILE_STATUS.PAUSED,
        })
      );
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 52,
        maxHeight: 52,
        minHeight: 52,
      }}
    >
      <div
        className="truncate"
        style={{
          flex: "1 1 auto",
          paddingRight: 20,
          fontSize: ".9em",
          fontWeight: "bold",
        }}
      >
        {_file.name}
      </div>
      <div>
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            cursor: "pointer",
          }}
        >
          <div
            onMouseLeave={() => setHover(false)}
            onMouseOver={() => setHover(true)}
            style={{
              position: "relative",
              height: 41,
              width: 41,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.status == FILE_STATUS.PENDING ||
            data.status == FILE_STATUS.UPLOADING ? (
              hover ? (
                <span height={35} style={{ fontSize: "2em" }}>
                  <PauseCircleIcon
                    onClick={() => handleChangeStatus(FILE_STATUS.PAUSED)}
                  />
                </span>
              ) : (
                <React.Fragment>
                  <CircularProgress
                    variant="determinate"
                    value={percentage}
                    size={35}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >{`${Math.round(percentage)}% `}</Typography>
                  </Box>
                </React.Fragment>
              )
            ) : (
              ""
            )}

            {data.status == FILE_STATUS.PAUSED ? (
              <PlayCircleIcon
                onClick={() => handleChangeStatus(FILE_STATUS.UPLOADING)}
              />
            ) : (
              ""
            )}

            {data.status == FILE_STATUS.FAILED ? <WarningIcon /> : ""}

            {data.status == FILE_STATUS.COMPLETED ? <CheckCircleIcon /> : ""}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ItemPopUpUploadingFile;
