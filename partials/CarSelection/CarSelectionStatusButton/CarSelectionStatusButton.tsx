import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useFetchWithAuth } from "@/hooks";
import { Message, Loading } from "@/components";
import { useCarSelectionsStore } from "@/stores/useCarSellectionsStore";

const CarSelectionStatusButton = ({ id }: { id: number }) => {
  const { fetchWithAuth } = useFetchWithAuth();
  const { setCarSelectionStatus } = useCarSelectionsStore();
  const [openReport, setOpenReport] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    open: false,
    severity: "error",
    text: "",
    variant: "filled",
    autoHideDuration: 6000,
    vertical: "top",
    horizontal: "center",
  });

  const handleClickOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const body = {
        id,
        status: "processed",
      };
      const { error } = await fetchWithAuth("/car-selection/status", {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      if (error) {
        setMessage((prev) => ({
          ...prev,
          open: true,
          severity: "error",
          text: "Не вдалось змінити статус заявки.",
        }));
        return;
      }
      setCarSelectionStatus(id, "processed");
      handleCloseReport();
    } catch (error) {
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "error",
        text: "Не вдалось змінити статус заявки.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Message message={message} setMessage={setMessage} />
      <Loading loading={loading} />
      <Button
        variant="contained"
        sx={{ flex: "1 1 auto", minWidth: "120px" }}
        onClick={handleClickOpenReport}
      >
        Опрацювати
      </Button>
      <Dialog
        open={openReport}
        onClose={handleCloseReport}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Відмітити, як опрацьовану?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseReport}>Повернутись</Button>
          <Button variant="contained" onClick={handleConfirm} autoFocus>
            Так
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CarSelectionStatusButton;
