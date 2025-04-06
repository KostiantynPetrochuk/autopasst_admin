import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { BACKEND_URL } from "@/lib/Constants";
import { Car } from "@/types";

const Specification = ({ car }: { car: Car }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        textAlign: "center",
        marginTop: 2,
      }}
      elevation={24}
    >
      <Typography
        sx={{
          marginBottom: 2,
        }}
        variant="h6"
      >
        Специфікація
      </Typography>
      <Button
        variant="contained"
        endIcon={<PictureAsPdfIcon />}
        component="label"
        onClick={async () => {
          try {
            const fileUrl = `${BACKEND_URL}/uploads/cars/${car.specFilename}`;
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "document.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Завантажити
      </Button>
    </Paper>
  );
};

export default Specification;
