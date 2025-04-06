import React from "react";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { Order } from "@/types";

const OPTIONS = {
  email: "/img/email.svg",
  telegram: "/img/telegram.svg",
  viber: "/img/viber.svg",
  whatsApp: "/img/whatsapp.svg",
};

const OrderInfo = ({ order }: { order: Order }) => {
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
          <Grid item xs={12} sm={6} md={4} key={1}>
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
                  {order?.status}
                </Typography>
              </Box>
              <Button
                variant="contained"
                // endIcon={<PictureAsPdfIcon />}
                component="label"
                // onClick={}
              >
                Змінити
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default OrderInfo;
