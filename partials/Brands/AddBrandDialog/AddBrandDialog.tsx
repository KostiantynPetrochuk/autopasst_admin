import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Upload } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const AddBrandDialog = ({
  open,
  handleClose,
  brandName,
  setBrandName,
  selectedImage,
  handleImageChange,
  handleSave,
}: any) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Новий бренд"}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginTop: "10px" }}
          id="brand-name"
          label="Назва"
          variant="outlined"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <label
            htmlFor="image-upload"
            style={{
              cursor: "pointer",
              border: "2px dashed #ccc",
              borderRadius: 5,
              padding: 20,
              textAlign: "center",
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            ) : (
              <>
                <Upload style={{ fontSize: 40, color: "#ccc" }} />
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Вибрати логотип
                </Typography>
              </>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>
        </Box>
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

export default AddBrandDialog;
