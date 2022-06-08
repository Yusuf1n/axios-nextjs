import { connect } from "mssql";

export async function execute(sqlQuery, config) {
  console.log(sqlQuery);
  //   console.log(config);
  const pool = await connect(config);
  try {
    const request = pool.request();
    const result = await request.query(sqlQuery);
    pool.close();
    return result;
  } catch (err) {
    console.error("SQL Error", err);
    return "NULL";
  }
}
