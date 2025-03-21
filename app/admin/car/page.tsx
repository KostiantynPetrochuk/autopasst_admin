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
import { format } from "date-fns";
import { useAppDispatch, useAppSelector, useFetchWithAuth } from "@/hooks";

import { AdminHeader, Loading, Message } from "@/components";
import { setBrands } from "@/store/features/brands/brandsSlice";
import { selectCars, setCars } from "@/store/features/cars/carsSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";
import { CONDITION, FUEL_TYPES } from "@/constants";
import { Car } from "@/types";
import Pagination from "@mui/material/Pagination";
import { BACKEND_URL } from "@/lib/Constants";
import { selectBrands } from "@/store/features/brands/brandsSlice";

const LIMIT = 5;

const CarPage = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { fetchWithAuth } = useFetchWithAuth();
  const brands = useAppSelector(selectBrands);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const cars = useAppSelector(selectCars);
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
      setLoading(true);
      try {
        if (!brands || !brands.length) {
          const { data: brandsResult, error: brandsError } =
            await fetchWithAuth("/brands", {
              method: "GET",
            });
          if (brandsError) {
            setMessage((prev) => ({
              ...prev,
              open: true,
              severity: "error",
              text: "Помилка завантаження брендів автомобілів.",
            }));
          }
          dispatch(setBrands(brandsResult.brands));
        }
        const { data: carsResult, error: carsError } = await fetchWithAuth(
          `/cars?offset=${(page - 1) * LIMIT}&limit=${LIMIT}`,
          {
            headers: {
              "X-Admin": "true",
            },
            method: "GET",
          }
        );
        if (carsError) {
          setMessage((prev) => ({
            ...prev,
            open: true,
            severity: "error",
            text: "Помилка завантаження автомобілів.",
          }));
        }
        dispatch(setCars(carsResult.cars));
        setTotalPages(Math.ceil(carsResult.total / LIMIT));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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

  if (!loading && !cars?.length) {
    listContent = (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: "grey.500" }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Поки нема доступних автомобілів.
        </Typography>
      </Box>
    );
  }

  if (cars?.length) {
    listContent = (
      <List>
        {cars.map((car: Car) => {
          let carImage = "";
          if (car?.imageNames?.length) {
            carImage = car?.imageNames[0];
          }
          return (
            <Link key={car.id} href={`/admin/car/${car.id}`}>
              <ListItem disablePadding>
                <ListItemButton>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} md={3}>
                      <Image
                        src={`${BACKEND_URL}/uploads/cars/${carImage}`}
                        alt={`${car.brandName} logo`}
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
                          {car.brandName}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Модель:&nbsp;</strong>
                          {car.modelName}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Стан:&nbsp;</strong>
                          {
                            CONDITION[car.condition as keyof typeof CONDITION]
                              .label.ua
                          }
                        </Typography>
                        <Typography variant="body1">
                          <strong>Пробіг:&nbsp;</strong> {car.mileage} км
                        </Typography>
                        <Typography variant="body1">
                          <strong>Паливо:&nbsp;</strong>
                          {
                            FUEL_TYPES[car.fuelType as keyof typeof FUEL_TYPES]
                              .label
                          }
                        </Typography>
                        <Typography variant="body1">
                          <strong>Дата створення:&nbsp;</strong>
                          {new Intl.DateTimeFormat("uk-UA", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(car.createdAt))}
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
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
              }}
              elevation={24}
            >
              <Typography variant="h5" component="h2">
                Автомобілі
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
                {cars?.length ? (
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

export default CarPage;
