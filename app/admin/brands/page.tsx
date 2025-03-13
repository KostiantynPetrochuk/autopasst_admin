"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { AdminHeader } from "@/components";
import { AddBrand } from "@/partials/Brands";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminHeader />
      <Container component="main">
        <Box>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
              }}
              elevation={24}
            >
              <Typography variant="h5" component="h2">
                Бренди
              </Typography>
            </Paper>
            {/* upload brand modal + button */}
            <AddBrand open={open} setOpen={setOpen} />
            {/*  */}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DashboardPage;
