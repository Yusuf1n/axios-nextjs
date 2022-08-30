import axios from "axios";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const sql = require("../sql");
const db = require("../db");

export default function Home({ data }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  const [searchData, setSearchData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [sortByValue, setSortByValue] = useState("");

  const router = useRouter();

  const createMovie = async (e) => {
    e.preventDefault();
    const body = { title, year, description, slug };

    const response = await axios.post("api/movie", body);
    console.log(response);
    router.reload(window.location.pathname);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const body = { searchValue, sortByValue };
    const response = await axios.post("/api/filter", body);

    // console.log(response.data.recordset);
    setSearchData([searchData, ...response.data.recordset]);
    console.log(searchData);
    // router.reload(window.location.pathname);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 class="d-flex justify-content-center mt-3">Movies</h1>

        <div class="d-flex">
          {/* Search */}
          <div class="me-auto p-2">
            <form className="search" onSubmit={handleSearch}>
              <input
                name="query"
                placeholder="Search Movie..."
                type="search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              &nbsp;
              <button class="btn btn-primary btn-sm" type="submit">
                Search
              </button>
            </form>
          </div>

          {/* Sort by */}
          <div class="pt-3">Sort By</div>
          <div class="p-2">
            <select
              class="form-select"
              value={sortByValue}
              onChange={(e) => setSortByValue(e.target.value)}
              onClick={handleSearch}
            >
              <option value="Default">Default</option>
              <option value="Asc">Title A-Z</option>
              <option value="Desc">Title Z-A</option>
            </select>
          </div>
        </div>

        {/* table */}
        <table
          style={{
            maxHeight: "30rem",
            overflow: "auto",
            display: "inline-block",
          }}
          class="table table-primary table-striped table-bordered border-secondary"
        >
          <thead style={{ position: "sticky", top: "0", zIndex: "1" }}>
            <tr>
              <th class="table-dark border-secondary">Title</th>
              <th class="table-dark border-secondary">Year</th>
              <th class="table-dark border-secondary">Description</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((item) => (
              <tr>
                <Link href={`/movies/${item.id}`}>
                  <td>
                    <strong role="button">{item.title}</strong>
                  </td>
                </Link>
                <td>{item.year}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add a Movie form */}
        <div class="d-flex justify-content-center">
          <form className={styles.movieform} onSubmit={createMovie}>
            <h4>Add a Movie</h4>
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
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const execQuery = await sql.execute("SELECT * FROM Movie", db.nextjsDb);
  const data = execQuery.recordset;

  // console.log(data);

  return {
    props: {
      data,
    },
  };
}
