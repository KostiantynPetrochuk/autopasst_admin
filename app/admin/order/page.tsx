"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector, useFetchWithAuth } from "@/hooks";

import { AdminHeader, AppTitle, Loading, Message } from "@/components";
import { selectOrders, setOrders } from "@/store/features/orders/ordersSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";
import { Order } from "@/types";
import Pagination from "@mui/material/Pagination";
import { BACKEND_URL } from "@/lib/Constants";
import { ORDER_STATUSES } from "@/constants";

const LIMIT = 5;

const OrderPage = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { fetchWithAuth } = useFetchWithAuth();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("0");
  const orders = useAppSelector(selectOrders);
  const [message, setMessage] = useState({
    open: false,
    severity: "error",
    text: "",
    variant: "filled",
    autoHideDuration: 6000,
    vertical: "top",
    horizontal: "center",
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCountryOfExploitation, setSelectedCountryOfExploitation] =
    useState<string>("");
  const [byDate, setByDate] = useState<boolean>(true);
  const [inputCountry, setInputCountry] = useState("");

  const handleChangeDate = (date: Date) => setSelectedDate(date);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSelectedCountryOfExploitation(inputCountry);
      setPage(1);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputCountry]);

  useEffect(() => {
    const getData = async () => {
      if (session.status === "authenticated") {
        setLoading(true);
        try {
          const dateString = selectedDate.toISOString();
          const params = new URLSearchParams({
            status: selectedStatus !== "0" ? selectedStatus : "",
            offset: String((page - 1) * LIMIT),
            limit: String(LIMIT),
            countryOfExploitation:
              selectedCountryOfExploitation !== "0"
                ? selectedCountryOfExploitation
                : "",
            createdAt: byDate ? dateString : "",
          });
          const url = `/orders?${params.toString()}`;
          const { data, error } = await fetchWithAuth(url, {
            method: "GET",
          });
          if (error) {
            setMessage((prev) => ({
              ...prev,
              open: true,
              severity: "error",
              text: "Помилка завантаження замовлень.",
            }));
          }
          dispatch(setOrders(data.orders));
          setTotalPages(Math.ceil(data.total / LIMIT));
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    if (session.status === "authenticated") {
      getData();
    }
  }, [
    session,
    page,
    selectedStatus,
    selectedCountryOfExploitation,
    byDate,
    selectedDate,
  ]);

  let listContent = null;

  if (loading) {
    listContent = (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Завантаження...
        </Typography>
      </Box>
    );
  }

  if (!loading && !orders?.length) {
    listContent = (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: "grey.500" }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Поки нема доступних замовлень.
        </Typography>
      </Box>
    );
  }

  if (orders?.length) {
    listContent = (
      <List>
        {orders.map((order: Order) => {
          let image = "";
          if (order?.car?.imageNames && order?.car?.imageNames.length) {
            image = order?.car?.imageNames[0];
          }
          return (
            <Link key={order.id} href={`/admin/order/${order.id}`}>
              <ListItem key={order.id} disablePadding>
                <ListItemButton>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} md={3}>
                      <Image
                        src={`${BACKEND_URL}/uploads/cars/${image}`}
                        alt={`${order?.car?.brandName} logo`}
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
                          {order?.car?.brand?.brandName}{" "}
                          {order?.car?.model?.modelName}
                        </Typography>
                        <Typography variant="body1">
                          {new Intl.DateTimeFormat("uk-UA", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(order?.car?.firstRegistration))}
                        </Typography>
                        <Typography variant="body1">{order.name}</Typography>
                        <Typography variant="body1">{order.phone}</Typography>
                        <Typography variant="body1">
                          {new Intl.DateTimeFormat("uk-UA", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(order.createdAt))}
                        </Typography>
                        <Typography variant="body1">
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(order?.car?.price)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    );
  }

  return (
    <>
      <AdminHeader />
      <Loading loading={loading} />
      <Message message={message} setMessage={setMessage} />
      <Container component="main">
        <Box>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
          >
            <AppTitle title="Замовлення" />
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
              }}
              elevation={24}
            >
              <DateCalendar
                disabled={!byDate}
                value={selectedDate}
                showDaysOutsideCurrentMonth
                fixedWeekNumber={6}
                onChange={handleChangeDate}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={byDate}
                    onChange={(event: any) => setByDate(event.target.checked)}
                    name="byDate"
                    color="primary"
                  />
                }
                label="за датою"
              />
            </Paper>
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
              }}
              elevation={24}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedStatus}
                  label="Статус"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedStatus(value);
                    setPage(1);
                  }}
                >
                  <MenuItem key={0} value={"0"}>
                    Всі замовлення
                  </MenuItem>
                  {Object.keys(ORDER_STATUSES).map((key) => {
                    const statusKey = key as keyof typeof ORDER_STATUSES;
                    return (
                      <MenuItem key={statusKey} value={statusKey}>
                        {ORDER_STATUSES[statusKey]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="status-input"
                  value={inputCountry}
                  label="Країна експлуатації"
                  onChange={(event) => {
                    const value = event.target.value;
                    setInputCountry(value);
                    setPage(1);
                  }}
                />
              </FormControl>
            </Paper>
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
                marginBottom: 2,
              }}
              elevation={24}
            >
              <Button
                variant="contained"
                startIcon={<BackspaceIcon />}
                sx={{ flex: "1 1 auto", minWidth: "120px" }}
                onClick={() => {
                  setSelectedStatus("0");
                  setPage(1);
                }}
              >
                Очистити
              </Button>
            </Paper>

            <Box component="div" sx={{ width: "100%" }}>
              <Paper
                sx={{
                  padding: 2,
                  textAlign: "center",
                  marginTop: 2,
                  marginBottom: 2,
                }}
                elevation={24}
              >
                {listContent}
                {orders?.length ? (
                  <Pagination
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                    count={totalPages}
                    onChange={(_, page) => setPage(page)}
                  />
                ) : null}
              </Paper>
              {/* <Box display={"flex"} justifyContent={"center"}>
                <Link href={"/admin/car/new"}>
                  <Fab color="primary" aria-label="add">
                    <AddIcon />
                  </Fab>
                </Link>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default OrderPage;
