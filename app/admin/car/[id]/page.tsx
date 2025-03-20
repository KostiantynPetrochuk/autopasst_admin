"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AdminHeader } from "@/components";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useFetchWithAuth } from "@/hooks";
import { Message, Loading } from "@/components";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Grid from "@mui/material/Grid";
import { Car } from "@/types";
import { overviewData } from "./constants";
import { LABELS } from "@/constants";
import { BACKEND_URL } from "@/lib/Constants";

const CarPage = ({ params }: { params: { id: string } }) => {
  const theme = useTheme();
  const session = useSession();
  const { fetchWithAuth } = useFetchWithAuth();
  const [car, setCar] = useState<Car>();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

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

  useEffect(() => {
    const getData = async () => {
      if (session.status === "authenticated") {
        setLoading(true);
        try {
          const { data, error } = await fetchWithAuth(`/cars/${params.id}`, {
            method: "GET",
          });
          if (error) {
            setMessage((prev) => ({
              ...prev,
              open: true,
              severity: "error",
              text: error,
            }));
            setLoading(false);
            return;
          }
          setCar(data.car);
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
  }, [session, fetchWithAuth, params.id]);

  if (!car) {
    return <Loading loading={true} />;
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
                {car.brandName} {car.modelName}
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
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
                style={{
                  aspectRatio: "16/9",
                  maxWidth: "100%",
                }}
              >
                {car?.imageNames?.map((image) => (
                  <SwiperSlide key={image}>
                    <Image
                      src={`${BACKEND_URL}/uploads/cars/${image}`}
                      alt={`${image} logo`}
                      width={300}
                      height={300}
                      priority={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      quality={100}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={(swiper: SwiperClass) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
                style={{
                  marginTop: 10,
                  maxWidth: "100%",
                  maxHeight: 200,
                }}
              >
                {car?.imageNames?.map((image) => (
                  <SwiperSlide key={image}>
                    <Image
                      src={`${BACKEND_URL}/uploads/cars/${image}`}
                      alt={`${image} logo`}
                      height={200}
                      width={200}
                      priority={true}
                      quality={100}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Paper>
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
              >
                Основні характеристики
              </Typography>
              <Box>
                <Grid container spacing={2}>
                  {overviewData.map((item, index) => {
                    const type = item.value as keyof Car;
                    let currentTitle = car[type] as string;
                    if (item.translate) {
                      currentTitle = (
                        LABELS[type as keyof typeof LABELS] as Record<
                          string,
                          { ua: string }
                        >
                      )[currentTitle]?.ua;
                    }
                    if (
                      type === "maintenance" ||
                      type === "firstRegistration"
                    ) {
                      currentTitle = new Intl.DateTimeFormat("uk-UA", {
                        // day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(currentTitle));
                    }
                    if (type === "vin" && currentTitle === "") {
                      currentTitle = "не вказано";
                    }
                    return (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: 2,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {item.label}&nbsp;
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {currentTitle as string}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Paper>
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
              >
                Специфікація
              </Typography>
              <Button
                variant="contained"
                endIcon={<PictureAsPdfIcon />}
                component="label"
                onClick={async () => {
                  try {
                    const fileUrl = `${BACKEND_URL}/uploads/cars/${car.specFilename}`;
                    const response = await fetch(fileUrl);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "document.pdf";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Завантажити
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CarPage;
