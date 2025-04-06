"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { AdminHeader, AppTitle } from "@/components";
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
            <AppTitle title="Бренди" />
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
