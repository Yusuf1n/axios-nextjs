import styles from "../../styles/Home.module.css";
import Link from "next/link";

const sql = require("../../sql");
const db = require("../../db");

export default function Movie({ data }) {
  //   console.log(data);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ul className={styles.movielist}>
          {data.map((movie) => (
            <li key="item.id">
              <span>
                <strong>{movie.title}</strong>
              </span>
              <span>{movie.year}</span>
              <span>{movie.description}</span>
            </li>
          ))}
        </ul>

        <Link href="/">
          <button class="me-2 btn btn-primary">Back</button>
        </Link>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { movieId } = context.query;
  const value = Number(movieId);

  const movie = await sql.execute(
    `SELECT * FROM Movie WHERE id = ${value}`,
    db.nextjsDb
  );
  const data = movie.recordset;

  return {
    props: {
      data,
    },
  };
}
