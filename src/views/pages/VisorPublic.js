import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import orderProvider from "../../providers/server/order";
import MaintenanceError from "../pages/maintenance/Error";
import Container from "@mui/material/Container";
import { url } from "../../api/Peticiones";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileManager from "../../componetes/app/FileManager";
import VisorImage from "../../componetes/app/VisorImage";

const VisorPublic = () => {
  const { uuid } = useParams();
  const [password, setPassword] = useState("");
  const [isLock, setIsLock] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [showVisor, setShowVisor] = useState(false);
  const [srcImg, setSrcImg] = useState("");

  const handleValidatePassword = async () => {
    setError("");
    const resp = await orderProvider.getFileOrderSession({
      password,
      uuid,
    });
    if (resp.error) {
      return setError(resp?.error?.message || "");
    }

    if (resp.token) {
      localStorage.setItem("orderSessionToken", resp.token);
    }

    setData(resp.order);
    setIsLock(false);
  };

  useEffect(() => {
    orderProvider
      .getFileOrderSession({
        password,
        uuid,
        token: localStorage.getItem("orderSessionToken") || "",
      })
      .then((resp) => {
        let error = resp.error;
        setLoadingPage(false);

        if (error) {
          if (error.type == "notFound") {
            return setPageNotFound(true);
          }

          if (error.type == "invalidPasswordOrToken") {
            return setIsLock(true);
          }
        }

        setData(resp.order);
      })
      .catch(() => {});
  }, []);

  const handleItemSelect = (item) => {
    setSrcImg(`${url}${item.src}`);
    setShowVisor(true);
  };

  const handleCloseVisor = () => {
    setShowVisor(false);
    setSrcImg("");
  };

  if (loadingPage) return null;
  if (pageNotFound) return <MaintenanceError />;

  return (
    <React.Fragment>
      <link rel="stylesheet" href="/css/global.css" />
      <Container maxWidth="lg" style={{ paddingTop: 100 }}>
        {isLock ? (
          <Dialog open={true}>
            <DialogTitle>Archivo bloqueado</DialogTitle>
            <DialogContent>
              <p>Introduce tu contraseña para ver el archivo</p>
              <TextField
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.currentTarget.value)}
                sx={{
                  width: "100%",
                  fontSize: "14px",
                  backgroundColor: "#f5f5f5",
                  margin: "10px 0",
                }}
              />
              <p
                className="text-error"
                style={{ color: "red", margin: 0, fontSize: ".8em" }}
              >
                {error || ""}
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleValidatePassword}>Validar</Button>
            </DialogActions>
          </Dialog>
        ) : (
          <div>
            <h2>Visor de archivos</h2>
            <div>
              {Array.from(data.detalles || []).map((detail, i) => {
                return (
                  <Accordion key={i}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        <strong>Detalle {i + 1}</strong>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{ height: 400, position: "relative" }}>
                        <FileManager
                          show
                          upload={false}
                          items={detail.galeria || []}
                          itemSelect={handleItemSelect}
                        />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </div>
        )}
      </Container>
      <VisorImage
        handleClose={handleCloseVisor}
        show={showVisor}
        src={srcImg}
      />
    </React.Fragment>
  );
};

export default VisorPublic;
