"use client";
import Image from "next/image";
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFetchWithAuth } from "@/hooks";

import { AdminHeader, Loading, Message } from "@/components";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { selectBrands, setBrands } from "@/store/features/brands/brandsSlice";

import {
  BODY_TYPES,
  CONDITION,
  DRIVE_TYPE,
  FUEL_TYPES,
  TRANSMISSION,
  LABELS,
} from "@/constants";

import { useSession } from "next-auth/react";

const CAR_COLORS = LABELS.Color;

const NewCarPage = () => {
  const session = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { fetchWithAuth } = useFetchWithAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(Array(3).fill(null));
  const brands = useAppSelector(selectBrands);
  const [message, setMessage] = useState({
    open: false,
    severity: "error",
    text: "",
    variant: "filled",
    autoHideDuration: 6000,
    vertical: "top",
    horizontal: "center",
  });
  // Form state
  const [form, setForm] = useState({
    vin: "",
    brandId: brands[0]?.id ?? "",
    modelId: "",
    body: "",
    mileage: 0,
    year: 0,
    fuel_type: "",
    transmission: "",
    drive_type: "",
    condition: "",
    engine_size: 0,
    door_count: 0,
    price: 0,
    color: "",
  });
  const [errors, setErrors] = useState({
    vin: false,
    brandId: false,
    modelId: false,
    body: false,
    mileage: false,
    year: false,
    fuel_type: false,
    transmission: false,
    drive_type: false,
    condition: false,
    engine_size: false,
    door_count: false,
    price: false,
    color: false,
  });

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleImageChange = (event: any, index: any) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const handleAddImage = () => {
    setImages([...images, null]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const {
      vin,
      brandId,
      modelId,
      body,
      fuel_type,
      year,
      transmission,
      drive_type,
      condition,
      engine_size,
      door_count,
      price,
      color,
      mileage,
    } = form;

    if (vin.length !== 17) {
      setErrors((prev) => ({
        ...prev,
        vin: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "VIN повинен містити 17 символів!",
      }));
      return;
    }

    if (!brandId) {
      setErrors((prev) => ({
        ...prev,
        brandId: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть бренд автомобіля!",
      }));
      return;
    }

    if (!modelId) {
      setErrors((prev) => ({
        ...prev,
        modelId: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть модель автомобіля!",
      }));
      return;
    }

    if (!body) {
      setErrors((prev) => ({
        ...prev,
        body: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть тип кузова автомобіля!",
      }));
      return;
    }

    if (mileage <= 0) {
      setErrors((prev) => ({
        ...prev,
        mileage: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Пробіг не може бути від'ємним або дорівнювати нулю!",
      }));
      return;
    }

    if (!fuel_type) {
      setErrors((prev) => ({
        ...prev,
        fuel_type: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть тип пального автомобіля!",
      }));
      return;
    }

    if (year < 1900 || year > new Date().getFullYear()) {
      setErrors((prev) => ({
        ...prev,
        year: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Рік випуску автомобіля не коректний!",
      }));
      return;
    }

    if (!transmission) {
      setErrors((prev) => ({
        ...prev,
        transmission: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть тип коробки передач автомобіля!",
      }));
      return;
    }

    if (!drive_type) {
      setErrors((prev) => ({
        ...prev,
        drive_type: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть тип приводу автомобіля!",
      }));
      return;
    }

    if (!condition) {
      setErrors((prev) => ({
        ...prev,
        condition: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть стан автомобіля!",
      }));
      return;
    }

    if (engine_size <= 0) {
      setErrors((prev) => ({
        ...prev,
        engine_size: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Об'єм двигуна не може бути від'ємним!",
      }));
      return;
    }

    if (door_count <= 0) {
      setErrors((prev) => ({
        ...prev,
        door_count: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Кількість дверей не може бути від'ємною!",
      }));
      return;
    }

    if (price <= 0) {
      setErrors((prev) => ({
        ...prev,
        price: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Ціна не може бути від'ємною або дорівнювати нулю!",
      }));
      return;
    }

    if (!color) {
      setErrors((prev) => ({
        ...prev,
        color: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть колір автомобіля!",
      }));
      return;
    }

    if (
      !vin ||
      !brandId ||
      !modelId ||
      !body ||
      !fuel_type ||
      !year ||
      !transmission ||
      !drive_type ||
      !condition ||
      !engine_size ||
      !door_count ||
      !price ||
      !color ||
      !mileage
    ) {
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, перевірте правильність введення даних!",
      }));
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key as keyof typeof form] as string);
    });

    const filesInputs =
      document.querySelectorAll<HTMLInputElement>(".fileInput");
    filesInputs.forEach((input) => {
      if (input.files && input.files.length > 0) {
        formData.append("files", input.files[0]);
      }
    });

    try {
      const { error } = await fetchWithAuth("/cars", {
        method: "POST",
        body: formData,
      });
      if (error) {
        setMessage((prev) => ({
          ...prev,
          open: true,
          severity: "error",
          text: String(error),
        }));
        setLoading(false);
        return;
      }

      setForm({
        vin: "",
        brandId: brands[0]?.id ?? "",
        modelId: "",
        body: "",
        mileage: 0,
        year: 0,
        fuel_type: "",
        transmission: "",
        drive_type: "",
        condition: "",
        engine_size: 0,
        door_count: 0,
        price: 0,
        color: "",
      });
      setImages(Array(3).fill(null));
      router.push("/admin/car");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getBrands = async () => {
      if (session.status === "authenticated") {
        setLoading(true);
        const { data, error } = await fetchWithAuth("/brands", {
          method: "GET",
        });
        if (error) {
          setMessage((prev) => ({
            ...prev,
            open: true,
            severity: "error",
            text: String(error),
          }));
          setLoading(false);
          return;
        }
        dispatch(setBrands(data.brands));
        setLoading(false);
      }
    };
    if (session.status === "authenticated") {
      getBrands();
    }
  }, [session]);

  const currentBrand = brands.find(
    (currentBrand) => currentBrand.id == form.brandId
  );

  let modelsItems: any = [];

  if (currentBrand?.models) {
    modelsItems = currentBrand.models;
  }

  return (
    <>
      <Loading loading={loading} />
      <Message message={message} setMessage={setMessage} />
      <AdminHeader />
      <Container component="main">
        <Box>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column" }}
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
                Новий автомобіль
              </Typography>
            </Paper>

            {/* Grid for form inputs */}
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
              }}
              elevation={24}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.vin}
                    helperText={errors.vin ? "не коректні дані" : ""}
                    value={form.vin}
                    onChange={handleChange}
                    name="vin"
                    fullWidth
                    label="VIN"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Марка</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Бренд"
                      value={form.brandId}
                      onChange={handleChange}
                      name="brandId"
                      error={errors.brandId}
                    >
                      {brands.map((brand) => {
                        return (
                          <MenuItem key={brand.id} value={brand.id}>
                            {brand.brandName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Модель
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Модель"
                      value={form.modelId}
                      onChange={handleChange}
                      name="modelId"
                      error={errors.modelId}
                    >
                      {modelsItems?.map((model: any) => {
                        return (
                          <MenuItem key={model.ID} value={model.ID}>
                            {model.ModelName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Тип кузова
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Тип кузова"
                      id="demo-simple-select"
                      value={form.body}
                      onChange={handleChange}
                      name="body"
                      error={errors.body}
                    >
                      {Object.keys(BODY_TYPES).map((model: any, index) => {
                        return (
                          <MenuItem key={index} value={model}>
                            {model}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Пробіг"
                    type="number"
                    value={form.mileage}
                    onChange={handleChange}
                    name="mileage"
                    error={errors.mileage}
                    helperText={errors.mileage ? "не коректні дані" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Тип пального
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Тип пального"
                      value={form.fuel_type}
                      onChange={handleChange}
                      name="fuel_type"
                      error={errors.fuel_type}
                    >
                      {Object.keys(FUEL_TYPES).map((value) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {FUEL_TYPES[value as keyof typeof FUEL_TYPES].label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Рік"
                    type="number"
                    value={form.year}
                    onChange={handleChange}
                    name="year"
                    error={errors.year}
                    helperText={errors.year ? "не коректні дані" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Коробка передач
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Коробка передач"
                      value={form.transmission}
                      onChange={handleChange}
                      name="transmission"
                      error={errors.transmission}
                    >
                      {Object.keys(TRANSMISSION).map((value, index) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {
                              TRANSMISSION[value as keyof typeof TRANSMISSION]
                                .label
                            }
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Привід
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Привід"
                      value={form.drive_type}
                      onChange={handleChange}
                      name="drive_type"
                      error={errors.drive_type}
                    >
                      {Object.keys(DRIVE_TYPE).map((value, index) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {DRIVE_TYPE[value as keyof typeof DRIVE_TYPE].label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Стан</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Стан"
                      value={form.condition}
                      onChange={handleChange}
                      name="condition"
                      error={errors.condition}
                    >
                      {Object.keys(CONDITION).map((value) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {
                              CONDITION[value as keyof typeof CONDITION].label
                                .en
                            }
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Об'єм двигуна"
                    type="number"
                    value={form.engine_size}
                    onChange={handleChange}
                    name="engine_size"
                    error={errors.engine_size}
                    helperText={errors.engine_size ? "не коректні дані" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={form.door_count}
                    onChange={handleChange}
                    fullWidth
                    label="Кількість дверей"
                    type="number"
                    name="door_count"
                    error={errors.door_count}
                    helperText={errors.door_count ? "не коректні дані" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={form.price}
                    onChange={handleChange}
                    name="price"
                    fullWidth
                    label="Ціна"
                    type="number"
                    error={errors.price}
                    helperText={errors.price ? "не коректні дані" : ""}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    value={form.color}
                    onChange={handleChange}
                    name="color"
                    fullWidth
                    label="Колір"
                    type="text"
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Колір</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Колір"
                      value={form.color}
                      onChange={handleChange}
                      name="color"
                      error={errors.color}
                    >
                      {Object.keys(CAR_COLORS).map((value) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {CAR_COLORS[value as keyof typeof CAR_COLORS].ua}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* Image upload */}
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
              }}
              elevation={24}
            >
              <Typography variant="h6" component="h3">
                Завантаження фото
              </Typography>
            </Paper>
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
              }}
              elevation={24}
            >
              <Grid container spacing={2}>
                {images.map((image, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                    <Box
                      sx={{
                        width: "100%",
                        paddingTop: "100%",
                        position: "relative",
                        backgroundColor: "#f0f0f0",
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {images[index] && (
                        <Image
                          src={images[index]}
                          alt={`Фото ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          style={{
                            display: images[index] ? "block" : "none",
                          }}
                        />
                      )}
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <input
                          className="fileInput"
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                        <PhotoCamera sx={{ fontSize: 40 }} />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Box
                    sx={{
                      width: "100%",
                      paddingTop: "34%",
                      paddingBottom: "34%",
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="add picture"
                      onClick={handleAddImage}
                      sx={{ zIndex: 1 }}
                    >
                      <AddCircleIcon sx={{ fontSize: 60 }} />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
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
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: 2,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<HighlightOffIcon />}
                  color="error"
                >
                  Скасувати
                </Button>
                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                  color="success"
                  onClick={handleSubmit}
                >
                  Зберегти
                </Button>
              </Stack>
            </Paper>
            {/*  */}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default NewCarPage;
