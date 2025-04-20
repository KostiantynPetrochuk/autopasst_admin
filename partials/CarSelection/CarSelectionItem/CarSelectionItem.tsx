import React, { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";
import { CarSelection } from "@/types";
import { red } from "@mui/material/colors";
import CarSelectionStatusButton from "../CarSelectionStatusButton";

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

const CarSelectionItem = ({ carSelection }: { carSelection: CarSelection }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  let badgeContent = "Нова заявка";
  let badgeColor = "primary";
  if (carSelection.status === "processed") {
    badgeContent = "Опрацьована";
    badgeColor = "success";
  }
  const itemColor = carSelection.status === "deleted" ? red[100] : "white";

  return (
    <Paper
      key={1}
      sx={{
        padding: 2,
        textAlign: "center",
        marginTop: 2,
        width: "100%",
        backgroundColor: itemColor,
      }}
      elevation={24}
    >
      <Badge
        sx={{ width: "100%" }}
        badgeContent={badgeContent}
        color={statusColorMap[carSelection?.status] || "default"}
      >
        <List key={1} sx={{ width: "100%" }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>{1}</ListItemIcon>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1.45fr 0.55fr",
                },
              }}
            >
              <ListItemText
                sx={{ marginRight: 2, flexGrow: 10 }}
                primary={carSelection.brand}
                secondary={carSelection.model}
              />
              <ListItemText
                sx={{ marginRight: 2 }}
                primary={"Рік"}
                secondary={carSelection?.year}
              />
            </Box>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{
                  pl: 9,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1.4fr 0.6fr",
                  },
                }}
              >
                <ListItemText
                  sx={{ marginRight: 2, flexGrow: 10 }}
                  primary={"Пробіг"}
                  secondary={carSelection?.mileage}
                />
                <ListItemText
                  sx={{ marginRight: 4 }}
                  primary={"Ціна"}
                  secondary={carSelection?.price}
                />
              </ListItem>
              <ListItem
                sx={{
                  pl: 9,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1.4fr 0.6fr",
                  },
                }}
              >
                <ListItemText
                  sx={{ marginRight: 2, flexGrow: 10 }}
                  primary={"Клієнт"}
                  secondary={carSelection?.name}
                />
                <ListItemText
                  sx={{ marginRight: 3 }}
                  primary={"Телефон"}
                  secondary={carSelection?.phone}
                />
              </ListItem>
              <ListItem
                sx={{
                  pl: 9,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1.4fr 0.6fr",
                  },
                }}
              >
                <ListItemText
                  sx={{ marginRight: 2, flexGrow: 10 }}
                  primary={"Засіб отримання інформації"}
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Image
                        src={
                          OPTIONS[
                            carSelection?.infoMethod as keyof typeof OPTIONS
                          ]
                        }
                        alt="client phone logo"
                        width={30}
                        height={30}
                        priority
                        style={{ marginRight: 2 }}
                      />
                      <Typography variant="body2">
                        {carSelection?.contact}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemText
                  sx={{ marginRight: 3 }}
                  primary={"Країна експлуатації"}
                  secondary={carSelection?.countryOfExploitation}
                />
              </ListItem>
            </List>
            {carSelection?.status === "new" ? (
              <CarSelectionStatusButton id={carSelection?.id} />
            ) : null}
          </Collapse>
        </List>
      </Badge>
    </Paper>
  );
};

export default CarSelectionItem;
