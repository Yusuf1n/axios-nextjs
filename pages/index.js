import axios from "axios";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";

const sql = require("../sql");
const db = require("../db");

export default function Home({ data }) {
  const [movie, setMovie] = useState("");
  // const [movies, setMovies] = useState(data);

  const getMovie = async () => {
    const response = await axios.get("api/movie");
    setMovie(response.data);
  };

  const createMovie = async () => {
    const response = await axios.post("api/movie");
  };

  // console.log({ movies });

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <button onClick={() => getMovie()}>Get Data</button> */}
        {/* <div>{() => getMovie()}</div> */}

        <ul className={styles.movielist}>
          {data.map((item) => (
            <li key="item.id">
              <Link href={`/movies/${item.id}`}>
                <span>
                  <strong role="button">{item.title}</strong>
                </span>
              </Link>
              <span>{item.year}</span>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
        <h1>{movie.title}</h1>
        <p>{movie.year}</p>
        <p>{movie.description}</p>
        <button onClick={() => createMovie()}>Create Movie</button>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const execQuery = await sql.execute("SELECT * FROM Movie", db.nextjsDb);
  const data = execQuery.recordset;

  console.log(data);

  return {
    props: {
      data,
    },
  };
}
