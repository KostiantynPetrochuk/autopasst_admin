import Link from "next/link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AppTitle } from "@/components";

import { AdminHeader } from "@/components";

const DashboardPage = () => {
  return (
    <>
      <AdminHeader />
      <Container component="main">
        <Box>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <AppTitle title="Домашня сторінка" />
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Paper
                sx={{
                  padding: 2,
                  textAlign: "center",
                  marginTop: 2,
                }}
                elevation={24}
              >
                <List>
                  <Link href="/admin/brands">
                    <ListItem key={"customers"} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Бренди"} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </List>
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
                <Button
                  variant="contained"
                  sx={{ marginTop: "12px", width: 100 }}
                  // onClick={signOut}
                  endIcon={<LogoutIcon />}
                >
                  Вихід
                </Button>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DashboardPage;
