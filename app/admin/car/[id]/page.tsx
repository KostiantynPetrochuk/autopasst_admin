"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useFetchWithAuth } from "@/hooks";
import { Message, Loading } from "@/components";
import { AppTitle } from "@/components";
import { Car } from "@/types";
import { CarSwiper, MainCharacteristics, Specification } from "@/partials/Car";

const CarPage = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  const { fetchWithAuth } = useFetchWithAuth();
  const [car, setCar] = useState<Car>();
  const [loading, setLoading] = useState(true);
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
    };
    if (session.status === "authenticated") {
      getData();
    }
  }, [session]);

  if (loading) {
    return <Loading loading={true} />;
  }

  if (!loading && !car) {
    return redirect("/admin/car");
  }

  if (!loading && car) {
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
              <AppTitle title={`${car.brandName} ${car.modelName}`} />
              <CarSwiper car={car} />
              <MainCharacteristics car={car} />
              <Specification car={car} />
            </Box>
          </Box>
        </Container>
      </>
    );
  }

  return null;
};

export default CarPage;
