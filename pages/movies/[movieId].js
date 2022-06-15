import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const sql = require("../../sql");
const db = require("../../db");

export default function Movie({ data, value }) {
  // console.log(`movie`);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  const router = useRouter();

  const editMovie = async (e) => {
    e.preventDefault();
    const body = { title, year, description, slug };

    const response = await fetch(`/api/${value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    router.reload(window.location.pathname);

    // return await response.json();
  };

  const deleteMovie = async (movieId) => {
    const response = await fetch(`/api/${movieId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
    router.reload(window.location.pathname);
  };

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

        <div>
          {data.map((movie) => (
            <div key="item.id">
              <form className={styles.movieform} onSubmit={editMovie}>
                <input
                  type="text"
                  placeholder={movie.title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={movie.year}
                  name="year"
                  onChange={(e) => setYear(+e.target.value)}
                />
                <textarea
                  name="description"
                  id=""
                  col="30"
                  row="10"
                  placeholder={movie.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={movie.slug}
                  name="slug"
                  onChange={(e) => setSlug(e.target.value)}
                />
                <button type="submit">Update</button>
              </form>
            </div>
          ))}
        </div>

        <Link href="/">
          <button class="me-2 btn btn-primary">Back</button>
        </Link>
        <Link href="/">
          <button class="btn btn-danger" onClick={() => deleteMovie(value)}>
            Delete
          </button>
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
      value,
    },
  };
}
