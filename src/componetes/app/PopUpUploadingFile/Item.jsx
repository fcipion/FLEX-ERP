import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Base from "../../../providers/base";
import { url } from "../../../api/Peticiones";
import { useCallback, useEffect, useState } from "react";

class Provider extends Base {
  constructor() {
    super({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("serviceToken")}`,
      },
    });
  }
}

const provider = new Provider();

const ItemPopUpUploadingFile = ({
  file,
  reference,
  orderId,
  changeTime,
  onCompleted,
}) => {
  const [progress, setProgress] = useState(0);

  const handleUpload = useCallback(async () => {
    await provider.uploadFile(
      `/${orderId}/upload-file-orden-service/${reference}`,
      file,
      {
        setProgress: (progress) => {
          setProgress(progress);
          progress >= 100 && onCompleted();
        },
        setUploadSpeed: (speed) => {
          // console.log({ speed });
        },
        setRemainingTime: changeTime,
        setIsUploading: (uploading) => {
          // console.log({ uploading });
        },
      }
    );
  }, [file, reference, orderId]);

  useEffect(() => {
    handleUpload();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", paddingBottom: 8 }}>
      <div
        className="truncate"
        style={{
          flex: "1 1 auto",
          paddingRight: 20,
          fontSize: ".9em",
          fontWeight: "bold",
        }}
      >
        {file.name}
      </div>
      <div>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress variant="determinate" value={progress} size={35} />
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
            >{`${Math.round(progress)}% `}</Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ItemPopUpUploadingFile;
