"use client";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useFetchWithAuth } from "@/hooks";
import { Message, Loading } from "@/components";
import { AppTitle } from "@/components";
import { SellCarRequest } from "@/types";
import {
  SellCarRequestMainCharacteristics,
  SellCarRequestSwiper,
} from "@/partials/SellCarRequest";

const SellCarRequestPage = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  const { fetchWithAuth } = useFetchWithAuth();
  const [sellCarRequest, setSellCarRequest] = useState<SellCarRequest>();
  const [selectedStatus, setSelectedStatus] = useState(
    sellCarRequest?.status || "new",
  );
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

  const handleSetSellCarRequest = (sellCarRequest: SellCarRequest) =>
    setSellCarRequest(sellCarRequest);
  const handleSetSelectedStatus = (status: string) => setSelectedStatus(status);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data, error } = await fetchWithAuth(
          `/sell-car-request/${params.id}`,
          {
            method: "GET",
          },
        );
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
        setSellCarRequest(data.sellCarRequest);
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

  if (!loading && !sellCarRequest) {
    return redirect("/admin/sell-car-request");
  }

  if (!loading && sellCarRequest) {
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
              <AppTitle
                title={`${sellCarRequest.brand} ${sellCarRequest.model}`}
              />
              <SellCarRequestSwiper sellCarRequest={sellCarRequest} />
              <SellCarRequestMainCharacteristics
                sellCarRequest={sellCarRequest}
                handleSetSellCarRequest={handleSetSellCarRequest}
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

export default SellCarRequestPage;
