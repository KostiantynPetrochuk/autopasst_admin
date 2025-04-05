import Link from "next/link";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h2>Сторінку не знайдено</h2>
      <p>Сталась помилка. Такої сторінки не існує.</p>
      <Link href="/admin/dashboard" passHref>
        <Button
          variant="contained"
          sx={{ marginTop: "12px", width: 160 }}
          endIcon={<HomeIcon />}
        >
          На головну
        </Button>
      </Link>
    </div>
  );
}
