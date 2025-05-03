import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SellCarRequest } from "@/types";
import { red } from "@mui/material/colors";
import { BACKEND_URL } from "@/lib/Constants";

const OPTIONS = {
  email: "/img/gmail.svg",
  telegram: "/img/telegram.svg",
  viber: "/img/viber.svg",
  whatsapp: "/img/whatsApp.svg",
};

const statusColorMap: Record<
  string,
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
  new: "primary",
  processed: "success",
  //
  // active: "primary",
  // done: "success",
  // error: "error",
  // waiting: "warning",
  // default: "default",
};

const SellCarRequestItem = ({
  sellCarRequest,
}: {
  sellCarRequest: SellCarRequest;
}) => {
  let badgeContent = "Нова заявка";
  if (sellCarRequest.status === "processed") {
    badgeContent = "Опрацьована";
  }
  return (
    <Link
      key={sellCarRequest.id}
      href={`/admin/sell-car-request/${sellCarRequest.id}`}
    >
      <Paper
        sx={{
          padding: 2,
          textAlign: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
        elevation={24}
      >
        <Badge
          sx={{ width: "100%" }}
          badgeContent={badgeContent}
          color={statusColorMap[sellCarRequest?.status] || "default"}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4} md={3}>
                  <Image
                    src={`${BACKEND_URL}/uploads/sell_car_requests/${sellCarRequest?.imageNames[0]}`}
                    alt={""}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority={true}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={8} md={9}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 1,
                    }}
                  >
                    <Typography variant="body1">
                      <strong>Бренд:&nbsp;</strong>
                      {sellCarRequest?.brand}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Модель:&nbsp;</strong>
                      {sellCarRequest?.model}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Ціна:&nbsp;</strong>
                      {sellCarRequest?.price}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Пробіг:&nbsp;</strong>
                      {sellCarRequest?.mileage} км
                    </Typography>
                    <Typography variant="body1">
                      <strong>Рік:&nbsp;</strong>
                      {sellCarRequest?.year}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Дата створення:&nbsp;</strong>
                      {new Intl.DateTimeFormat("uk-UA", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(sellCarRequest.createdAt))}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItemButton>
          </ListItem>
        </Badge>
      </Paper>
    </Link>
  );
};

export default SellCarRequestItem;
