"use client";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useFetchWithAuth } from "@/hooks";
import { Message, Loading } from "@/components";
import { Order } from "@/types";
import { AppTitle } from "@/components";
import { CarSwiper, MainCharacteristics, Specification } from "@/partials/Car";
import { OrderInfo } from "@/partials/Order";

const OrderPage = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  const { fetchWithAuth } = useFetchWithAuth();
  const [order, setOrder] = useState<Order>();
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "new");
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

  const handleSetOrder = (order: Order) => setOrder(order);
  const handleSetSelectedStatus = (status: string) => setSelectedStatus(status);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data, error } = await fetchWithAuth(`order/${params.id}`, {
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
        setOrder(data.order);
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
  }, [session]);

  if (loading) {
    return <Loading loading={true} />;
  }

  if (!loading && !order) {
    return redirect("/admin/order");
  }

  if (!loading && order) {
    const title = `Замовлення - ${order?.car?.brand?.brandName} ${order?.car?.model?.modelName}`;
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
              <AppTitle title={title} />
              <CarSwiper car={order?.car} />
              <MainCharacteristics car={order?.car} />
              <Specification car={order?.car} />
              <OrderInfo
                order={order}
                handleSetOrder={handleSetOrder}
                selectedStatus={selectedStatus}
                handleSetSelectedStatus={handleSetSelectedStatus}
              />
            </Box>
          </Box>
        </Container>
      </>
    );
  }

  return null;
};

export default OrderPage;
