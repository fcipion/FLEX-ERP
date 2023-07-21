import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { dispatch, useSelector } from "store";
import { useCallback, useEffect, useState, useMemo } from "react";
import ItemPopUpUploadingFile from "./Item";
import { changeStatusModalUpload } from "store/slices/file";

import { FILE_STATUS } from "./utils";

function convertSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return {
    hours: hours || 0,
    minutes: minutes || 0,
    seconds: remainingSeconds || 0,
  };
}

const PopUpUploadingFile = () => {
  const { upload, showPopUp = true } = useSelector((state) => state.files);
  const [totalTime, setTotalTime] = useState(0);

  const totalUploading = useMemo(
    () =>
      upload.filter(
        (u) =>
          u.status == FILE_STATUS.PENDING || u.status == FILE_STATUS.UPLOADING
      ).length,
    [upload]
  );

  const totalFailed = useMemo(
    () => upload.filter((u) => u.status == FILE_STATUS.FAILED).length,
    [upload]
  );

  const totalPaused = useMemo(
    () => upload.filter((u) => u.status == FILE_STATUS.PAUSED).length,
    [upload]
  );

  const message = useMemo(() => {
    let mUpl = `Subiendo ${totalUploading} elemento${
      totalUploading > 1 ? "s" : ""
    }`;
    let mFail = `${totalFailed} fallado${totalFailed > 1 ? "s" : ""}`;
    let mPa = `${totalPaused} pausado${totalPaused > 1 ? "s" : ""}`;

    if (totalUploading && totalFailed && totalPaused) {
      return `${mUpl}, ${mFail} y ${mPa}`;
    } else if (totalUploading && totalFailed) {
      return `${mUpl} y ${mFail}`;
    } else if (totalUploading && totalPaused) {
      return `${mUpl} y ${mPa}`;
    } else if (totalUploading) {
      return mUpl;
    } else if (totalFailed && totalPaused) {
      return `${mFail} y ${mPa}`;
    } else if (totalFailed) {
      return mFail.replace("fallado", "archivo fallado");
    } else {
      return mPa.replace("pausado", "archivo pausado");
    }
  }, [totalUploading, totalFailed, totalPaused]);

  const handleClose = useCallback(() => {
    dispatch(changeStatusModalUpload(false));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 20,
        background: "white",
        width: 420,
        maxHeight: 180,
        borderRadius: "18px 18px 0 0",
        zIndex: 1000,
        display: showPopUp ? "flex" : "none",
        flexDirection: "column",
        padding: "8px 0",
        boxShadow: "0px 1px 4px rgb(0 0 0 / 30%)",
      }}
    >
      <div style={{ display: "flex", padding: "0px 12px" }}>
        <h3 style={{ fontSize: "1.1em" }}>{message} </h3>
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <ExpandMoreIcon style={{ fontSize: "1.8em", marginRight: 6 }} />
          </div>
          <div onClick={handleClose} style={{ cursor: "pointer" }}>
            <CloseIcon style={{ fontSize: "1.5em" }} />
          </div>
        </div>
      </div>
      {totalUploading > 0 ? (
        <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   background: "#edf2fc",
        //   padding: "10px 12px",
        // }}
        >
          {/* {totalTime > 0 ? (
            <span>
              Quedan {0 > 0 ? `${0} h` : ""}{" "}
              {0 > 0 ? `${0} min` : ""}
              {0 <= 0 && 0 <= 0 ? "Quedan unos segundos" : ""}...
            </span>
          ) : (
            <span>Calculando minutos...</span>
          )} */}
          {/* <div style={{ cursor: "pointer", color: "blue" }}>Cancelar</div> */}
        </div>
      ) : null}

      <div
        style={{
          padding: "0px 12px",
          flex: "1 1 auto",
          overflow: "hidden",
          overflowY: "auto",
          paddingTop: 8,
        }}
      >
        {Array.from(upload || []).map((data, i) => (
          <ItemPopUpUploadingFile key={i} data={data} />
        ))}
      </div>
    </div>
  );
};

export default PopUpUploadingFile;
