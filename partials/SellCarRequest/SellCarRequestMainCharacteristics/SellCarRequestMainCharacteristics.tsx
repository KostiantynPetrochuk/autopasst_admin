import React from "react";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CAR_SELECTION_STATUSES } from "@/constants";
import { SellCarRequest } from "@/types";
import { useTheme } from "@mui/material/styles";
import SellCarRequestStatus from "../SellCarRequestStatus";

const OPTIONS = {
  email: "/img/gmail.svg",
  telegram: "/img/telegram.svg",
  viber: "/img/viber.svg",
  whatsapp: "/img/whatsApp.svg",
};

const SellCarRequestMainCharacteristics = ({
  sellCarRequest,
  handleSetSellCarRequest,
  selectedStatus,
  handleSetSelectedStatus,
}: {
  sellCarRequest: SellCarRequest;
  handleSetSellCarRequest: (sellCarRequest: SellCarRequest) => void;
  selectedStatus: string;
  handleSetSelectedStatus: (status: string) => void;
}) => {
  const theme = useTheme();
  return (
    <>
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
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Рік:&nbsp;
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {sellCarRequest?.year}
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
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Пробіг:&nbsp;
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {sellCarRequest?.mileage}
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
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Ціна:&nbsp;
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {sellCarRequest?.price}
                  </Typography>
                </Box>
              </Box>
            </Grid>
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
          Дані заявки
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
                    {sellCarRequest?.name}
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
                    {sellCarRequest?.phone}
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
                    src={
                      OPTIONS[
                        sellCarRequest?.infoMethod as keyof typeof OPTIONS
                      ]
                    }
                    alt={"client phone logo"}
                    width={30}
                    height={30}
                    priority={true}
                    style={{
                      marginRight: 8,
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {sellCarRequest?.contact}
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
                    {sellCarRequest?.countryOfExploitation}
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
                    }).format(new Date(sellCarRequest?.createdAt))}
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
                    {
                      CAR_SELECTION_STATUSES[
                        sellCarRequest?.status as keyof typeof CAR_SELECTION_STATUSES
                      ]
                    }
                  </Typography>
                </Box>
                <SellCarRequestStatus
                  sellCarRequest={sellCarRequest}
                  handleSetSellCarRequest={handleSetSellCarRequest}
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
                    }).format(new Date(sellCarRequest?.createdAt))}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default SellCarRequestMainCharacteristics;
