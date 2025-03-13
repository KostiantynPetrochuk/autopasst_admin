import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const AddModelDialog = ({
  open,
  handleClose,
  modelName,
  setModelName,
  handleSave,
}: any) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Нова модель"}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginTop: "10px" }}
          id="brand-name"
          label="Назва"
          variant="outlined"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Скасувати</Button>
        <Button onClick={handleSave} autoFocus>
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModelDialog;
