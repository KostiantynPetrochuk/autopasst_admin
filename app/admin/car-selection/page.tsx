"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFetchWithAuth } from "@/hooks";

import { AdminHeader, AppTitle, Loading, Message } from "@/components";
import List from "@mui/material/List";
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
import { useCarSelectionsStore } from "@/stores/useCarSellectionsStore";

import { useSession, signOut } from "next-auth/react";
import { CarSelection } from "@/types";
import Pagination from "@mui/material/Pagination";
import { CAR_SELECTION_STATUSES } from "@/constants";
import CarSelectionItem from "@/partials/CarSelection/CarSelectionItem";

const LIMIT = 5;

const CarSelectionsPage = () => {
  const session = useSession();
  const { fetchWithAuth } = useFetchWithAuth();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("new");
  const { carSelections, setCarSelections } = useCarSelectionsStore();
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
          const url = `car-selection?${params.toString()}`;
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
          setCarSelections(data.carSelections);
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

  if (!loading && !carSelections?.length) {
    listContent = (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: "grey.500" }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Поки нема доступних замовлень.
        </Typography>
      </Box>
    );
  }

  if (carSelections?.length) {
    listContent = (
      <List>
        {carSelections.map((carSelection: CarSelection) => {
          return (
            <CarSelectionItem
              key={carSelection.id}
              carSelection={carSelection}
            />
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
            <AppTitle title="Заявки на підбір" />
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
                  {Object.keys(CAR_SELECTION_STATUSES).map((key) => {
                    const statusKey =
                      key as keyof typeof CAR_SELECTION_STATUSES;
                    return (
                      <MenuItem key={statusKey} value={statusKey}>
                        {CAR_SELECTION_STATUSES[statusKey]}
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
          </Box>
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingRight: 6,
            marginBottom: 2,
          }}
        >
          {listContent}
          {carSelections?.length ? (
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
        </Box>
      </Container>
    </>
  );
};

export default CarSelectionsPage;
