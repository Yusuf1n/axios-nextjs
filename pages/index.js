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

  // const getMovie = async () => {
  //   const response = await axios.get("api/movie");
  //   setMovie(response.data);
  // };

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
    const response = await axios.post("/api/search", body);

    // console.log(response.data.recordset);
    setSearchData([searchData, ...response.data.recordset]);
    console.log(searchData);
    // router.reload(window.location.pathname);
  };

  // const handleSort = async (e) => {
  //   e.preventDefault();
  //   const body = { sortByValue };
  //   const response = await axios.post("/api/sort", body);

  //   setSearchData([searchData, ...response.data.recordset]);
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <button onClick={() => getMovie()}>Get Data</button> */}
        {/* <div>{() => getMovie()}</div> */}
        <form className="search" onSubmit={handleSearch}>
          <input
            name="query"
            type="search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <select
          value={sortByValue}
          onChange={(e) => setSortByValue(e.target.value)}
          onClick={handleSearch}
        >
          <option value="Default">Default</option>
          <option value="Asc">Title A-Z</option>
          <option value="Desc">Title Z-A</option>
        </select>

        <h1>{sortByValue}</h1>

        <ul className={styles.movielist}>
          {searchData.map((item) => (
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

        {/*Checking if searchData is empty, if so shows all movies if not shows only
        searched movies */}
        {/* {Object.keys(searchData).length === 0 ? (
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
        ) : (
          <ul className={styles.movielist}>
            {searchData.map((item) => (
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
        )} */}

        {/* Sorting Title Ascending */}
        {/* <ul className={styles.movielist}>
          {data
            .sort((a, b) => (a.title - b.title ? 1 : -1))
            .map((item) => (
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
        </ul> */}

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
