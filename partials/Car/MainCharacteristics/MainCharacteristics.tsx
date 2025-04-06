import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { overviewData } from "../../../app/admin/car/[id]/constants";
import { LABELS } from "@/constants";
import { Car } from "@/types";
import { useTheme } from "@mui/material/styles";

const MainCharacteristics = ({ car }: { car: Car }) => {
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
            if (type === "maintenance" || type === "firstRegistration") {
              currentTitle = new Intl.DateTimeFormat("uk-UA", {
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
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
  );
};

export default MainCharacteristics;
