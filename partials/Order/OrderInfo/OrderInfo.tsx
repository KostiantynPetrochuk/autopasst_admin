import React from "react";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { Order } from "@/types";
import OrderStatus from "../OrderStatus";
import { ORDER_STATUSES } from "@/constants";

const OPTIONS = {
  email: "/img/gmail.svg",
  telegram: "/img/telegram.svg",
  viber: "/img/viber.svg",
  whatsapp: "/img/whatsApp.svg",
};

type OrderInfoPropTypes = {
  order: Order;
  handleSetOrder: (order: Order) => void;
  selectedStatus: string;
  handleSetSelectedStatus: (status: string) => void;
};

const OrderInfo = ({
  order,
  handleSetOrder,
  selectedStatus,
  handleSetSelectedStatus,
}: OrderInfoPropTypes) => {
  const theme = useTheme();

  return (
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
        Дані замовлення
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} key={1}>
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
                  minHeight: "50px",
                }}
              >
                <Image
                  src="/img/client.svg"
                  alt={"client logo"}
                  width={30}
                  height={30}
                  priority={true}
                  style={{
                    marginRight: 8,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {order?.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} key={2}>
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
                  minHeight: "50px",
                }}
              >
                <Image
                  src="/img/client_phone.svg"
                  alt={"client phone logo"}
                  width={30}
                  height={30}
                  priority={true}
                  style={{
                    marginRight: 8,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {order?.phone}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} key={3}>
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
                  minHeight: "50px",
                }}
              >
                <Image
                  src={OPTIONS[order?.infoMethod as keyof typeof OPTIONS]}
                  alt={"client phone logo"}
                  width={30}
                  height={30}
                  priority={true}
                  style={{
                    marginRight: 8,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {order?.contact}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} key={4}>
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
                  minHeight: "50px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/img/country.svg"
                  alt={"country of exploitation logo"}
                  width={30}
                  height={30}
                  priority={true}
                  style={{
                    marginRight: 8,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {order?.countryOfExploitation}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} key={5}>
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
                  minHeight: "50px",
                }}
              >
                <Image
                  src="/img/calendar.svg"
                  alt={"calendar logo"}
                  width={30}
                  height={30}
                  priority={true}
                  style={{
                    marginRight: 8,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {new Intl.DateTimeFormat("uk-UA", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(order.createdAt))}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} key={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                  minHeight: "50px",
                }}
              >
                <Image
                  src="/img/status.svg"
                  alt={"country of exploitation logo"}
                  width={30}
                  height={30}
                  priority={true}
                  style={{
                    marginRight: 8,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {ORDER_STATUSES[order?.status as keyof typeof ORDER_STATUSES]}
                </Typography>
              </Box>
              <OrderStatus
                order={order}
                handleSetOrder={handleSetOrder}
                selectedStatus={selectedStatus}
                handleSetSelectedStatus={handleSetSelectedStatus}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} key={7}>
            <Box
              sx={{
                minHeight: "50px",
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
                <strong
                  style={{
                    fontFamily: "Arial",
                    marginRight: 2,
                  }}
                >
                  Оновлено:
                </strong>
                <Typography variant="body2" color="textSecondary">
                  {new Intl.DateTimeFormat("uk-UA", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(order.createdAt))}
                </Typography>
              </Box>
            </Box>
          </Grid>
          {order?.status === "canceled" ? (
            <Grid item xs={12} sm={6} md={4} key={8}>
              <Box
                sx={{
                  minHeight: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                    justifyContent: "center",
                  }}
                >
                  <DoDisturbIcon sx={{ marginRight: 2 }} />
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant="body2"
                    color="textSecondary"
                  >
                    {order?.cancellationReason}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Paper>
  );
};

export default OrderInfo;
