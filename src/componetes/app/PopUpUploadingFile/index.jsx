import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { dispatch, useSelector } from "store";
import { useCallback, useEffect, useState, useMemo } from "react";
import ItemPopUpUploadingFile from "./Item";
import {
  changeStatusModalUpload,
  addMultipleUploading,
  removeUploadFile,
  updateUploading,
  removeUploading,
} from "store/slices/file";

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
  const { upload, uploading, showPopUp } = useSelector((state) => state.files);
  const [totalTime, setTotalTime] = useState(0);

  const handleAddNewUploads = useCallback(() => {
    let { data, idsRemove } = Array.from(upload || []).reduce(
      (a, b) => {
        !a.data[b.reference] && (a.data[b.reference] = { files: [] });
        a.data[b.reference].files.push(b.file);
        a.data[b.reference].orderId = b.orderId;
        a.idsRemove.push(b.id);
        return a;
      },
      { data: {}, idsRemove: [] }
    );
    console.log({ data, upload });
    dispatch(removeUploadFile(idsRemove));

    Object.keys(data).forEach((reference) => {
      dispatch(
        addMultipleUploading({
          files: data[reference].files,
          reference,
          orderId: data[reference].orderId,
        })
      );
    });
  }, [upload]);

  useEffect(() => {
    if (!Array.isArray(upload) || !upload.length) return;
    handleAddNewUploads(upload);
  }, [upload]);

  const handleClose = useCallback(() => {
    dispatch(changeStatusModalUpload(false));
    removeUploading(uploading.map((u) => u.id));
  }, [uploading]);

  const handleChangeTime = useCallback(
    (time) => {
      setTotalTime(totalTime + time);
    },
    [totalTime]
  );

  const { hours, minutes } = useMemo(
    () => convertSecondsToTime(totalTime),
    [totalTime]
  );
  const totalUploading = useMemo(
    () => uploading.filter((u) => !u.uploaded).length,
    [uploading]
  );

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
        <h3 style={{ fontSize: "1.1em" }}>
          Subiendo {totalUploading} elemento
        </h3>
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div onClick={handleClose} style={{ cursor: "pointer" }}>
            <ExpandMoreIcon style={{ fontSize: "1.8em", marginRight: 6 }} />
          </div>
          <div onClick={handleClose} style={{ cursor: "pointer" }}>
            <CloseIcon style={{ fontSize: "1.5em" }} />
          </div>
        </div>
      </div>
      {Array.from(uploading).length > 0 && totalUploading > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#edf2fc",
            padding: "10px 12px",
          }}
        >
          {totalTime > 0 ? (
            <span>
              Quedan {hours > 0 ? `${hours} h` : ""}{" "}
              {minutes > 0 ? `${minutes} min` : ""}
              {hours <= 0 && minutes <= 0 ? "Quedan unos segundos" : ""}...
            </span>
          ) : (
            <span>Calculando minutos...</span>
          )}
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
        {Array.from(uploading || []).map(
          ({ file, reference, orderId, id }, i) => (
            <ItemPopUpUploadingFile
              key={i}
              file={file}
              reference={reference}
              orderId={orderId}
              changeTime={handleChangeTime}
              onCompleted={() => {
                console.log("complete");
                dispatch(
                  updateUploading({
                    id,
                    uploaded: true,
                  })
                );
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default PopUpUploadingFile;
