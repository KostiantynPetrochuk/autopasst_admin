import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Order } from "@/types";
import { useFetchWithAuth } from "@/hooks";
import { Message, Loading } from "@/components";
import { ORDER_STATUSES } from "@/constants";

type OrderStatusPropTypes = {
  order: Order;
  handleSetOrder: (order: Order) => void;
  selectedStatus: string;
  handleSetSelectedStatus: (status: string) => void;
};

type OrderStatusesKey = "new" | "canceled" | "confirmed" | "completed";

const OrderStatus = ({
  order,
  handleSetOrder,
  selectedStatus,
  handleSetSelectedStatus,
}: OrderStatusPropTypes) => {
  const { fetchWithAuth } = useFetchWithAuth();
  const [open, setOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
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
    handleSetSelectedStatus(order?.status);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (
        selectedStatus === "canceled" &&
        (!cancelReason.length || cancelReason.length < 3)
      ) {
        setMessage((prev) => ({
          ...prev,
          open: true,
          severity: "warning",
          text: "Будь ласка, вкажіть причину скасування.",
        }));
        return;
      }
      const body = {
        id: order?.id,
        status: selectedStatus,
        cancelReason: "",
      };
      if (selectedStatus === "canceled") {
        body.cancelReason = cancelReason;
      }
      const { error } = await fetchWithAuth("order/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (error) {
        setMessage((prev) => ({
          ...prev,
          open: true,
          severity: "error",
          text: "Не вдалось змінити статус замовлення.",
        }));
        return;
      }
      const newOrder = { ...order };
      newOrder.status = selectedStatus;
      if (selectedStatus === "canceled") {
        newOrder.cancellationReason = cancelReason;
      }
      handleSetOrder(newOrder);
      handleToggleDialog();
    } catch (error) {
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "error",
        text: "Не вдалось змінити статус замовлення.",
      }));
    } finally {
      setLoading(false);
    }
  };

  if (order?.status === "canceled" || order?.status === "completed") {
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
        Змінити
      </Button>
      <Dialog
        open={open}
        onClose={handleToggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {ORDER_STATUSES[order?.status as OrderStatusesKey]}
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
              {Object.keys(ORDER_STATUSES).map((key) => {
                let isDisabled = true;
                // new
                if (order?.status === "new" && key === "confirmed") {
                  isDisabled = false;
                }
                if (order?.status === "new" && key === "canceled") {
                  isDisabled = false;
                }
                // confirmed
                if (order?.status === "confirmed" && key === "canceled") {
                  isDisabled = false;
                }
                if (order?.status === "confirmed" && key === "completed") {
                  isDisabled = false;
                }
                return (
                  <MenuItem disabled={isDisabled} key={key} value={key}>
                    {ORDER_STATUSES[key as OrderStatusesKey]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {selectedStatus === "canceled" ? (
            <TextField
              sx={{ marginTop: "10px", marginBottom: "20px", width: "100%" }}
              id="cancel-reason"
              label="Причина скасування"
              variant="outlined"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleDialog}>Скасувати</Button>
          <Button
            onClick={handleConfirm}
            autoFocus
            disabled={order?.status === selectedStatus}
          >
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderStatus;
