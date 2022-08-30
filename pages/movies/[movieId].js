import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const sql = require("../../sql");
const db = require("../../db");

export default function Movie({ data, value }) {
  const [title, setTitle] = useState(data[0].title);
  const [year, setYear] = useState(data[0].year);
  const [description, setDescription] = useState(data[0].description);
  const [slug, setSlug] = useState(data[0].slug);

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
    // router.reload(window.location.pathname);
    router.push("/");

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
        <div className="mt-4">
          <h1>Movie Details</h1>
          {data.map((movie) => (
            <div key={movie.id}>
              <form className={styles.movieform} onSubmit={editMovie}>
                <label>Title</label>
                <input
                  type="text"
                  defaultValue={movie.title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Year</label>
                <input
                  type="text"
                  defaultValue={movie.year}
                  name="year"
                  onChange={(e) => setYear(+e.target.value)}
                />
                <label>Description</label>
                <textarea
                  name="description"
                  id=""
                  col="30"
                  row="10"
                  defaultValue={movie.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Slug</label>
                <input
                  type="text"
                  defaultValue={movie.slug}
                  name="slug"
                  onChange={(e) => setSlug(e.target.value)}
                />
                <button type="submit">Update</button>
              </form>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <Link href="/">
            <button className="me-2 btn btn-primary">Back</button>
          </Link>
          <Link href="/">
            <button
              className="btn btn-danger"
              onClick={() => deleteMovie(value)}
            >
              Delete
            </button>
          </Link>
        </div>
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
