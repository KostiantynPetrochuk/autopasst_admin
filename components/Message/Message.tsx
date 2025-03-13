import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Message = ({ message, setMessage }: any) => {
  const handleClose = () => {
    setMessage((prev: any) => ({
      ...prev,
      open: false,
    }));
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: message.vertical,
        horizontal: message.horizontal,
      }}
      open={message.open}
      autoHideDuration={message.autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={message.severity}
        variant={message.variant}
        sx={{ width: "100%" }}
      >
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default Message;
