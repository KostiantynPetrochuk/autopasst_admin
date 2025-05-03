"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarRentalIcon from "@mui/icons-material/CarRental";
import CarRepairIcon from '@mui/icons-material/CarRepair';

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { signOut } from "next-auth/react";

const AdminHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <AdminDrawer open={open} setOpen={setOpen} />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Autopasst
            </Typography>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

// === Admin Drawer === //
function AdminDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setOpen(false)}
      >
        <List>
          <Link href="/admin/dashboard">
            <ListItem key={1} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Домашня сторінка" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/admin/brands">
            <ListItem key={2} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Бренди" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/admin/car">
            <ListItem key={3} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DirectionsCarIcon />
                </ListItemIcon>
                <ListItemText primary="Автомобілі" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/admin/order">
            <ListItem key={4} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Замовлення" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/admin/car-selection">
            <ListItem key={5} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CarRentalIcon />
                </ListItemIcon>
                <ListItemText primary="Заявки на підбір" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/admin/sell-car-request">
            <ListItem key={6} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CarRepairIcon />
                </ListItemIcon>
                <ListItemText primary="Заявки на продаж" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    </Drawer>
  );
}
// ====== //

export default AdminHeader;
