"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector, useFetchWithAuth } from "@/hooks";

import { AdminHeader, Loading, Message } from "@/components";
import { selectOrders, setOrders } from "@/store/features/orders/ordersSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";
import { Order } from "@/types";
import Pagination from "@mui/material/Pagination";
import { BACKEND_URL } from "@/lib/Constants";

const LIMIT = 5;

const OrderPage = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { fetchWithAuth } = useFetchWithAuth();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    const getData = async () => {
      if (session.status === "authenticated") {
        setLoading(true);
        try {
          const { data, error } = await fetchWithAuth(
            `/orders?offset=0&limit=${LIMIT}`,
            {
              method: "GET",
            }
          );
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
  }, [session, page]);

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
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
              }}
              elevation={24}
            >
              <Typography variant="h5" component="h2">
                Замовлення
              </Typography>
            </Paper>
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
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

              <Link href={"/admin/car/new"}>
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default OrderPage;
