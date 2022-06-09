import axios from "axios";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const sql = require("../sql");
const db = require("../db");

export default function Home({ data }) {
  // const [movie, setMovie] = useState("");
  // const [movies, setMovies] = useState(data);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  const router = useRouter();

  // const getMovie = async () => {
  //   const response = await axios.get("api/movie");
  //   setMovie(response.data);
  // };

  const createMovie = async (e) => {
    e.preventDefault();
    const body = { title, year, description, slug };

    const response = await axios.post("api/movie", body);
    router.reload(window.location.pathname);
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
        {/* <h1>{movie.title}</h1>
        <p>{movie.year}</p>
        <p>{movie.description}</p> */}
        {/* <button onClick={() => createMovie()}>Create Movie</button> */}
        <form className={styles.movieform} onSubmit={createMovie}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={(e) => setYear(+e.target.value)}
          />
          <textarea
            name="description"
            id=""
            col="30"
            row="10"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Slug"
            name="slug"
            onChange={(e) => setSlug(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
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
