import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const AppTitle = ({ title }: { title: string }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        textAlign: "center",
        marginTop: 2,
      }}
      elevation={24}
    >
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
    </Paper>
  );
};

export default AppTitle;
