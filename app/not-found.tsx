import Link from "next/link";

import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h2>Сторінку не знайдено</h2>
      <p>Сталась помилка. Такої сторінки не існує.</p>
      <Link href="/" className={styles.notFoundLink}>
        Повернутись на головну
      </Link>
    </div>
  );
}
