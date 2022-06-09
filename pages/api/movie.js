const sql = require("../../sql");
const db = require("../../db");

export default async function handle(req, res) {
  const { title, year, description, slug } = req.body;
  // console.log(req.body);

  // if (req.method === "GET") {
  //   const handleGET = await sql.execute("SELECT * FROM Movie", db.nextjsDb);
  //   res.json(...handleGET.recordset);
  // }
  if (req.method === "POST") {
    const handlePOST = await sql.execute(
      `INSERT INTO Movie (title, year, description, slug) VALUES ('${title}', ${year}, '${description}', '${slug}')`,
      db.nextjsDb
    );
    res.json(handlePOST);
  }
}
