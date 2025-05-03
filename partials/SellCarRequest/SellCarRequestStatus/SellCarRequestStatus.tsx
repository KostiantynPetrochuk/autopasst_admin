import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { SellCarRequest } from "@/types";
import { useFetchWithAuth } from "@/hooks";
import { Message, Loading } from "@/components";
import { CAR_SELECTION_STATUSES } from "@/constants";

type SellCarRequestStatusPropTypes = {
  sellCarRequest: SellCarRequest;
  handleSetSellCarRequest: (sellCarRequest: SellCarRequest) => void;
  selectedStatus: string;
  handleSetSelectedStatus: (status: string) => void;
};

type SellCarRequestStatusesKey = "new" | "processed";

const SellCarRequestStatus = ({
  sellCarRequest,
  handleSetSellCarRequest,
  selectedStatus,
  handleSetSelectedStatus,
}: SellCarRequestStatusPropTypes) => {
  const { fetchWithAuth } = useFetchWithAuth();
  const [open, setOpen] = useState(false);
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

  const handleToggleDialog = () => {
    setOpen((prev) => !prev);
    handleSetSelectedStatus(sellCarRequest?.status);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const body = {
        id: sellCarRequest?.id,
        status: selectedStatus,
      };
      const { error } = await fetchWithAuth("/sell-car-request/status", {
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
      const newSellCarRequest = { ...sellCarRequest };
      newSellCarRequest.status = selectedStatus;
      handleSetSellCarRequest(newSellCarRequest);
      handleToggleDialog();
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

  if (sellCarRequest?.status === "processed") {
    return null;
  }

  return (
    <>
      <Message message={message} setMessage={setMessage} />
      <Loading loading={loading} />
      <Button
        variant="contained"
        component="label"
        onClick={handleToggleDialog}
      >
        Опрацювати
      </Button>
      <Dialog
        open={open}
        onClose={handleToggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {
            CAR_SELECTION_STATUSES[
              sellCarRequest?.status as SellCarRequestStatusesKey
            ]
          }
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="demo-simple-select-label">
              змінити статус
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="змінити статус"
              value={selectedStatus}
              onChange={(event) => {
                handleSetSelectedStatus(event.target.value);
              }}
              name="status"
              error={false}
            >
              {Object.keys(CAR_SELECTION_STATUSES).map((key) => {
                let isDisabled = true;
                // new
                if (sellCarRequest?.status === "new") {
                  isDisabled = false;
                }
                // processed
                if (sellCarRequest?.status === "processed") {
                  isDisabled = false;
                }
                return (
                  <MenuItem disabled={isDisabled} key={key} value={key}>
                    {CAR_SELECTION_STATUSES[key as SellCarRequestStatusesKey]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleDialog}>Скасувати</Button>
          <Button
            onClick={handleConfirm}
            autoFocus
            disabled={sellCarRequest?.status === selectedStatus}
          >
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SellCarRequestStatus;
