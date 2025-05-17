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
import { useFetchWithAuth } from "@/hooks";
import { AdminHeader, AppTitle, Loading, Message } from "@/components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Badge from "@mui/material/Badge";
import { useBrandsStore } from "@/stores/useBrandsStore";
import { useCarsStore } from "@/stores/useCarsStore";

import Grid from "@mui/material/Grid";
import { useSession, signOut } from "next-auth/react";
import { BODY_TYPES, CONDITION, FUEL_TYPES, TRANSMISSION } from "@/constants";
import { Car } from "@/types";
import Pagination from "@mui/material/Pagination";
import { BACKEND_URL } from "@/lib/Constants";

const LIMIT = 5;
type ConditionKey = keyof typeof CONDITION;
type BodyTypeKey = keyof typeof BODY_TYPES;
type FuelTypeKey = keyof typeof FUEL_TYPES;
type TransmissionTypeKey = keyof typeof TRANSMISSION;

const statusColorMap: Record<
  string,
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
  in_stock: "primary",
  sold_out: "success",
  //
  // active: "primary",
  // done: "success",
  // error: "error",
  // waiting: "warning",
  // default: "default",
};

const CarPage = () => {
  const session = useSession();
  const { fetchWithAuth } = useFetchWithAuth();
  const { brands, setBrands } = useBrandsStore();
  const { cars, setCars } = useCarsStore();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState({
    open: false,
    severity: "error",
    text: "",
    variant: "filled",
    autoHideDuration: 6000,
    vertical: "top",
    horizontal: "center",
  });

  const [selectedBrandId, setSelectedBrandId] = useState<Number>(0);
  const [selectedModelId, setSelectedModelId] = useState<Number>(0);
  const [selectedCondition, setSelectedCondition] = useState<string>("0");
  const [selectedStatus, setSelectedStatus] = useState<string>("0");
  const [selectedBodyType, setSelectedBodyType] = useState<string>("0");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("0");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("0");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        if (!brands || !brands.length) {
          const { data: brandsResult, error: brandsError } =
            await fetchWithAuth("brand", {
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
          setBrands(brandsResult.brands);
        }
        const params = new URLSearchParams({
          condition: selectedCondition !== "0" ? selectedCondition : "",
          brand: selectedBrandId ? String(selectedBrandId) : "",
          model: selectedModelId ? String(selectedModelId) : "",
          bodyType: selectedBodyType != "0" ? selectedBodyType : "",
          // mileageFrom
          // mileageTo
          fuelType: selectedFuelType != "0" ? selectedFuelType : "",
          transmission: selectedTransmission != "0" ? selectedTransmission : "",
          // priceFrom
          // priceTo
          // sortBy //
          status: selectedStatus !== "0" ? selectedStatus : "",
          offset: String((page - 1) * LIMIT),
          limit: String(LIMIT),
        });
        const url = `cars?${params.toString()}`;
        const { data: carsResult, error: carsError } = await fetchWithAuth(
          url,
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
        setCars(carsResult.data);
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
    if (session.status === "authenticated") {
      const sessionWithError = session.data as typeof session.data & {
        error?: string;
      };

      if (sessionWithError?.error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: "/signin" });
      }
    }
  }, [
    session,
    page,
    selectedBrandId,
    selectedModelId,
    selectedCondition,
    selectedStatus,
    selectedBodyType,
    selectedFuelType,
    selectedTransmission,
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
          let badgeContent = "Нова заявка";
          if (car.status === "sold_out") {
            badgeContent = "Продано";
          }
          return (
            <Link key={car.id} href={`/admin/car/${car.id}`}>
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
                  color={statusColorMap[car?.status] || "default"}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} md={3}>
                          <Image
                            src={`${BACKEND_URL}uploads/cars/${carImage}`}
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
                                CONDITION[
                                  car.condition as keyof typeof CONDITION
                                ].label.ua
                              }
                            </Typography>
                            <Typography variant="body1">
                              <strong>Пробіг:&nbsp;</strong> {car.mileage} км
                            </Typography>
                            <Typography variant="body1">
                              <strong>Паливо:&nbsp;</strong>
                              {
                                FUEL_TYPES[
                                  car.fuelType as keyof typeof FUEL_TYPES
                                ].label
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
                </Badge>
              </Paper>
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
            <AppTitle title="Автомобілі" />

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
                <InputLabel id="demo-simple-select-label">Марка</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedBrandId}
                  label="Марка"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedBrandId(Number(value));
                    setSelectedModelId(0);
                    setPage(1);
                  }}
                >
                  <MenuItem key={0} value={0}>
                    Всі автомобілі
                  </MenuItem>
                  {brands?.map((brand) => {
                    return (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand?.brandName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Модель</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedModelId}
                  label="Модель"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedModelId(Number(value));
                    setPage(1);
                  }}
                >
                  <MenuItem key={0} value={0}>
                    Всі автомобілі
                  </MenuItem>
                  {brands
                    ?.find((brand) => selectedBrandId === brand.id)
                    ?.models?.map((model) => {
                      return (
                        <MenuItem key={model?.id} value={model?.id}>
                          {model?.modelName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Стан</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCondition}
                  label="Стан"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedCondition(value);
                    setPage(1);
                  }}
                >
                  <MenuItem key={0} value={"0"}>
                    Всі автомобілі
                  </MenuItem>
                  {(Object.keys(CONDITION) as ConditionKey[]).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {CONDITION[key].label.ua}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Тип кузова
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedBodyType}
                  label="Тип кузова"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedBodyType(value);
                    setPage(1);
                  }}
                >
                  <MenuItem key={0} value={"0"}>
                    Всі автомобілі
                  </MenuItem>
                  {(Object.keys(BODY_TYPES) as BodyTypeKey[]).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {BODY_TYPES[key].label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Тип палива
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedFuelType}
                  label="Тип палива"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedFuelType(value);
                    setPage(1);
                  }}
                >
                  <MenuItem key={0} value={"0"}>
                    Всі автомобілі
                  </MenuItem>
                  {(Object.keys(FUEL_TYPES) as FuelTypeKey[]).map((key) => {
                    return (
                      <MenuItem key={key} value={key}>
                        {FUEL_TYPES[key].label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Тип КПП</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTransmission}
                  label="Тип КПП"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedTransmission(value);
                    setPage(1);
                  }}
                >
                  <MenuItem key={0} value={"0"}>
                    Всі автомобілі
                  </MenuItem>
                  {(Object.keys(TRANSMISSION) as TransmissionTypeKey[]).map(
                    (key) => {
                      return (
                        <MenuItem key={key} value={key}>
                          {TRANSMISSION[key].label}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
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
                    Всі автомобілі
                  </MenuItem>
                  <MenuItem key={1} value={"in_stock"}>
                    Доступні
                  </MenuItem>
                  <MenuItem key={2} value={"sold_out"}>
                    Продані
                  </MenuItem>
                </Select>
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
                  setSelectedBrandId(0);
                  setSelectedModelId(0);
                  setSelectedCondition("0");
                  setSelectedStatus("0");
                  setSelectedBodyType("0");
                  setSelectedFuelType("0");
                  setSelectedTransmission("0");
                  setPage(1);
                }}
              >
                Очистити
              </Button>
            </Paper>
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                paddingRight: 2,
              }}
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
                  page={page}
                  onChange={(_, page) => setPage(page)}
                />
              ) : null}
              <Link style={{ marginTop: 20 }} href={"/admin/car/new"}>
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
