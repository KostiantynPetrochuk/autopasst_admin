"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { AdminHeader, AppTitle } from "@/components";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { AddModelDialog } from "@/partials/Brands";
import { useFetchWithAuth } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  selectBrands,
  setBrands,
  addModelToBrand,
  changeModelName,
} from "@/store/features/brands/brandsSlice";
import { Message, Loading } from "@/components";
import { BACKEND_URL } from "@/lib/Constants";

const BrandPage = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const dispatch = useAppDispatch();
  const { fetchWithAuth } = useFetchWithAuth();
  const [modelName, setModelName] = useState<string>("");
  const [modelId, setModelId] = useState<number>();
  const brands = useAppSelector(selectBrands);
  const brand = brands.find((brand) => brand.id == params.id);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    open: false,
    severity: "error",
    text: "",
    variant: "filled",
    autoHideDuration: 6000,
    vertical: "top",
    horizontal: "center",
  });

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setModelName("");
    setOpen(false);
  };
  const handleCloseEditModel = () => {
    setModelName("");
    setOpenEditModel(false);
  };

  const handleSave = async () => {
    setLoading(true);
    if (!modelName) {
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, вкажіть назву моделі.",
      }));
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await fetchWithAuth("/models", {
        method: "POST",
        body: JSON.stringify({ brandId: Number(params.id), modelName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (error) {
        setMessage((prev) => ({
          ...prev,
          open: true,
          severity: "error",
          text: String(error),
        }));
        setModelName("");
        setOpen(false);
        setLoading(false);
        return;
      }

      dispatch(
        addModelToBrand({
          brandId: params.id,
          model: {
            id: data.model.id,
            modelName: data.model.modelName,
          },
        })
      );
      setModelName("");
      setOpen(false);
      setLoading(false);
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "success",
        text: "Нову модель успішно додано.",
      }));
    } catch (error) {
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "error",
        text: String(error),
      }));
      setModelName("");
      setOpen(false);
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    if (!modelName) {
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, вкажіть назву моделі.",
      }));
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await fetchWithAuth("/models", {
        method: "PATCH",
        body: JSON.stringify({ modelId, modelName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (error) {
        setMessage((prev) => ({
          ...prev,
          open: true,
          severity: "error",
          text: String(error),
        }));
        setModelName("");
        setOpen(false);
        setLoading(false);
        return;
      }
      dispatch(
        changeModelName({
          brandId: brand?.id,
          modelId,
          modelName,
        })
      );
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "success",
        text: "Назву моделі успішно змінено.",
      }));
    } catch (error) {
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "error",
        text: String(error),
      }));
    } finally {
      setModelName("");
      setOpenEditModel(false);
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
      dispatch(setBrands(data.brands));
      setLoading(false);
    };

    if (!brands.length && session.status === "authenticated") {
      getBrands();
    }
  }, [session]);

  let content = null;

  if (!loading && brand) {
    content = (
      <Container component="main">
        <Box>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <AppTitle title={brand?.brandName} />
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}
          >
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                marginTop: 2,
                maxWidth: "300px",
                margin: "0 auto",
              }}
              elevation={24}
            >
              <Image
                src={`${BACKEND_URL}/uploads/brands/${brand?.fileName}`}
                alt="brand_logo"
                height={50}
                width={50}
              />
            </Paper>
          </Box>
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
                Моделі
              </Typography>

              <List
                sx={{
                  maxWidth: 300,
                  margin: "0 auto",
                }}
              >
                {brand?.models?.map((model) => {
                  return (
                    <ListItem
                      onClick={() => {
                        setOpenEditModel(true);
                        setModelName(model.modelName);
                        setModelId(model.id);
                      }}
                      key={model.id}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Typography>{model.id}.</Typography>
                        </ListItemIcon>
                        <ListItemText primary={model.modelName} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
              <AddModelDialog
                open={openEditModel}
                handleClose={handleCloseEditModel}
                modelId={modelId}
                modelName={modelName}
                setModelName={setModelName}
                handleSave={handleEdit}
                title={"Редагувати модель"}
              />
            </Paper>
            <Fab
              sx={{
                margin: "20px auto 0 auto",
              }}
              color="primary"
              aria-label="add"
              onClick={handleClickOpen}
            >
              <AddIcon />
            </Fab>
            <AddModelDialog
              open={open}
              handleClose={handleClose}
              modelName={modelName}
              setModelName={setModelName}
              handleSave={handleSave}
              title={"Нова модель"}
            />
          </Box>
        </Box>
      </Container>
    );
  }

  if (!loading && !brand) {
    content = (
      <Box component="div" sx={{ display: "flex", flexDirection: "column" }}>
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            marginTop: 2,
          }}
          elevation={24}
        >
          <Typography variant="h5" component="h2">
            Такого бренду не існує
          </Typography>
          <Link href="/admin/dashboard" passHref>
            <Button
              variant="contained"
              sx={{ marginTop: "12px", width: 160 }}
              endIcon={<HomeIcon />}
            >
              На головну
            </Button>
          </Link>
        </Paper>
      </Box>
    );
  }

  return (
    <>
      <AdminHeader />
      <Loading loading={loading} />
      <Message message={message} setMessage={setMessage} />
      {content}
    </>
  );
};

export default BrandPage;
