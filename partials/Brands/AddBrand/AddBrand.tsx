"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import { Loading, Message } from "@/components";
import { useFetchWithAuth } from "@/hooks";
import { AddBrandDialog } from "@/partials/Brands";
import { Brand } from "@/types";
import { useSession, signOut } from "next-auth/react";
import { BACKEND_URL } from "@/lib/Constants";
import { useBrandsStore } from "@/stores/useBrandsStore";

const AddBrand = ({ open, setOpen }: any) => {
  const session = useSession();
  const { fetchWithAuth } = useFetchWithAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { brands, setBrands } = useBrandsStore();
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
    const fileInput = document.querySelector<HTMLInputElement>("#image-upload");
    setBrandName("");
    setSelectedImage(null);
    if (fileInput) {
      fileInput.value = "";
    }
    setOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    if (!selectedImage || !brandName) {
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "warning",
        text: "Будь ласка, заповніть всі поля.",
      }));
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("brandName", brandName);
    const fileInput = document.querySelector<HTMLInputElement>("#image-upload");
    if (imageFile) {
      formData.append("file", imageFile);
    }
    try {
      const { data, error } = await fetchWithAuth("brand", {
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
      data.models = [];
      setBrands([...brands, data]);
      setBrandName("");
      setSelectedImage(null);
      if (fileInput) {
        fileInput.value = "";
      }
      setOpen(false);
      setLoading(false);
    } catch (error) {
      setMessage((prev) => ({
        ...prev,
        open: true,
        severity: "error",
        text: String(error),
      }));
      setBrandName("");
      setSelectedImage(null);
      if (fileInput) {
        fileInput.value = "";
      }
      setOpen(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetchWithAuth("brand", {
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
      setBrands(data);
      setLoading(false);
    };
    if (session.status === "authenticated") {
      const sessionWithError = session.data as typeof session.data & {
        error?: string;
      };
      if (sessionWithError?.error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: "/signin" });
      }
    }
    if (session.status === "authenticated") {
      fetchData();
    }
  }, [session]);

  let content = null;

  if (!loading) {
    content = (
      <>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          {brands?.length ? (
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
              }}
              elevation={24}
            >
              <List>
                {brands?.map((brand: Brand) => {
                  return (
                    <Link key={brand.id} href={`/admin/brands/${brand.id}`}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Image
                              src={`${BACKEND_URL}uploads/brands/${brand.fileName}`}
                              alt="brand_logo"
                              height={50}
                              width={50}
                            />
                          </ListItemIcon>
                          <ListItemText primary={brand.brandName} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Paper>
          ) : null}
        </Box>
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
        <AddBrandDialog
          open={open}
          handleClose={handleClose}
          brandName={brandName}
          setBrandName={setBrandName}
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
          handleSave={handleSave}
        />
      </>
    );
  }

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Loading loading={loading} />
      <Message message={message} setMessage={setMessage} />
      {content}
    </Box>
  );
};

export default AddBrand;
