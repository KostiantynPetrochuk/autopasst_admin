"use client";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from "date-fns";
import { useFetchWithAuth } from "@/hooks";

import { AdminHeader, AppTitle, Loading, Message } from "@/components";

import {
  BODY_TYPES,
  CONDITION,
  ECO_CLASS,
  FUEL_TYPES,
  KEYS,
  TRANSMISSION,
} from "@/constants";

import { useSession, signOut } from "next-auth/react";
import { useBrandsStore } from "@/stores/useBrandsStore";

const NewCarPage = () => {
  const session = useSession();
  const router = useRouter();
  const { fetchWithAuth } = useFetchWithAuth();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState(Array(3).fill(null));
  const { brands, setBrands } = useBrandsStore();
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
    info: "",
    condition: "",
    body: "",
    firstRegistration: "",
    mileage: 0,
    fuel_type: "",
    transmission: "",
    maintenance: "", // техобслуговування до
    ecoClass: "",
    keys: "1",
    price: 0,
  });
  const [errors, setErrors] = useState({
    vin: false,
    brandId: false,
    modelId: false,
    info: false,
    condition: false,
    body: false,
    firstRegistration: false,
    mileage: false,
    fuel_type: false,
    transmission: false,
    maintenance: false,
    ecoClass: false,
    keys: false,
    price: false,
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

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files) {
      const newImages = [...images];
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      newImages.splice(index, 1, ...newImageUrls);
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
      info,
      condition,
      body,
      firstRegistration,
      mileage,
      fuel_type,
      transmission,
      maintenance,
      ecoClass,
      keys,
      price,
    } = form;

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
        text: "Будь ласка, вкажіть стан автомобіля!",
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

    if (!firstRegistration) {
      setErrors((prev) => ({
        ...prev,
        firstRegistration: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть дату першої  реєстрації!",
      }));
      return;
    }

    if (mileage < 0) {
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

    if (!maintenance) {
      setErrors((prev) => ({
        ...prev,
        maintenance: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, вкажіть дату завершення техобслуговування!",
      }));
      return;
    }

    if (!ecoClass) {
      setErrors((prev) => ({
        ...prev,
        ecoClass: true,
      }));
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, оберіть еко клас!",
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

    if (
      !brandId ||
      !modelId ||
      !info ||
      !condition ||
      !body ||
      !firstRegistration ||
      !mileage ||
      !fuel_type ||
      !transmission ||
      !maintenance ||
      !ecoClass ||
      !keys ||
      !price
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

    if (selectedFile) {
      formData.append("specification", selectedFile);
    }

    const filesInputs =
      document.querySelectorAll<HTMLInputElement>(".fileInput");
    filesInputs.forEach((input) => {
      if (input.files && input.files.length > 0) {
        Array.from(input.files).forEach((file) => {
          formData.append("files", file);
        });
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
        info: "",
        condition: "",
        body: "",
        firstRegistration: "",
        mileage: 0,
        fuel_type: "",
        transmission: "",
        maintenance: "", // техобслуговування до
        ecoClass: "",
        keys: "1",
        price: 0,
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
      setBrands(data.brands);
      setLoading(false);
    };
    if (session.status === "authenticated") {
      getBrands();
    }
    if (session.status === "authenticated") {
      const sessionWithError = session.data as typeof session.data & {
        error?: string;
      };

      if (sessionWithError?.error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: "/signin" });
      }
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
            <AppTitle title="Новий автомобіль" />
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
                      value={String(form.brandId)}
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
                          <MenuItem key={model.id} value={model.id}>
                            {model.modelName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Інфо"
                    type="text"
                    value={form.info}
                    onChange={handleChange}
                    name="info"
                    error={errors.info}
                    helperText={errors.info ? "не коректні дані" : ""}
                  />
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
                                .ua
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
                      {Object.keys(BODY_TYPES).map((value) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {BODY_TYPES[value as keyof typeof BODY_TYPES].label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Перша реєстрація"
                    name="firstRegistration"
                    views={["year", "month"]}
                    value={
                      form.firstRegistration
                        ? parseISO(form.firstRegistration)
                        : null
                    }
                    onChange={(date) => {
                      if (!date || isNaN(date.getTime())) {
                        setErrors((prev) => ({
                          ...prev,
                          firstRegistration: true,
                        }));
                        return;
                      }
                      const updatedDate = setMilliseconds(
                        setSeconds(setMinutes(setHours(date, 12), 0), 0),
                        0
                      );
                      setErrors((prev) => ({
                        ...prev,
                        firstRegistration: false,
                      }));
                      if (updatedDate && !isNaN(updatedDate.getTime())) {
                        setForm((prev) => ({
                          ...prev,
                          firstRegistration: updatedDate.toISOString(),
                        }));
                      }
                    }}
                    onError={(error) => {
                      if (error) {
                        setErrors((prev) => ({
                          ...prev,
                          firstRegistration: true,
                        }));
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Пробіг"
                    type="text"
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
                  <DatePicker
                    sx={{ width: "100%" }}
                    views={["year", "month"]}
                    label="Техобслуговування до"
                    name="maintenance"
                    value={form.maintenance ? parseISO(form.maintenance) : null}
                    onChange={(date) => {
                      if (!date || isNaN(date.getTime())) {
                        setErrors((prev) => ({
                          ...prev,
                          maintenance: true,
                        }));
                        return;
                      }
                      const updatedDate = setMilliseconds(
                        setSeconds(setMinutes(setHours(date, 12), 0), 0),
                        0
                      );
                      setErrors((prev) => ({
                        ...prev,
                        maintenance: false,
                      }));
                      if (updatedDate && !isNaN(updatedDate.getTime())) {
                        setForm((prev) => ({
                          ...prev,
                          maintenance: updatedDate.toISOString(),
                        }));
                      }
                    }}
                    onError={(error) => {
                      if (error) {
                        setErrors((prev) => ({
                          ...prev,
                          maintenance: true,
                        }));
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Еко клас
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Еко клас"
                      value={form.ecoClass}
                      onChange={handleChange}
                      name="ecoClass"
                      error={errors.ecoClass}
                    >
                      {Object.keys(ECO_CLASS).map((value, index) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {ECO_CLASS[value as keyof typeof ECO_CLASS].label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Кількість ключів
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Кількість ключів"
                      value={form.keys}
                      onChange={handleChange}
                      name="keys"
                      error={errors.keys}
                    >
                      {Object.keys(KEYS).map((value, index) => {
                        return (
                          <MenuItem key={value} value={value}>
                            {KEYS[value as keyof typeof KEYS].label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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
              </Grid>
            </Paper>
            {/* .pdf upload */}
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
              }}
              elevation={24}
            >
              <Typography
                sx={{
                  marginBottom: 2,
                }}
                variant="h6"
                component="h3"
              >
                Додати специфікацію
              </Typography>
              {!selectedFile ? (
                <Button
                  variant="contained"
                  endIcon={<PictureAsPdfIcon />}
                  component="label"
                >
                  Вибрати файл
                  <input
                    type="file"
                    hidden
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                      }
                    }}
                    accept=".pdf"
                  />
                </Button>
              ) : null}
              {selectedFile && (
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Вибраний файл: {selectedFile.name}
                </Typography>
              )}
              {selectedFile && (
                <Button
                  variant="contained"
                  endIcon={<HighlightOffIcon />}
                  color="error"
                  sx={{
                    marginTop: 1,
                  }}
                  onClick={() => setSelectedFile(null)}
                >
                  Видалити
                </Button>
              )}
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
              <Typography
                sx={{
                  marginBottom: 2,
                }}
                variant="h6"
                component="h3"
              >
                Завантаження фото
              </Typography>
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
                      {image && (
                        <Image
                          src={image}
                          alt={`Фото ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
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
                          multiple
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
