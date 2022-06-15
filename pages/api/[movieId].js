const sql = require("../../sql");
const db = require("../../db");

export default async function handle(req, res) {
  const { movieId } = req.query;
  const value = parseInt(movieId);
  const { title, year, description, slug } = req.body;

  if (req.method === "PUT") {
    handlePUT(value, res);
  } else if (req.method === "DELETE") {
    handleDELETE(value, req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  // PUT /api/:id
  async function handlePUT(value) {
    const updateMovie = await sql.execute(
      `UPDATE Movie SET title = '${title}', year = '${year}', description = '${description}', slug = '${slug}' WHERE id = ${value}`,
      db.nextjsDb
    );
    res.json(updateMovie);
  }

  // DELETE /api/:id
  async function handleDELETE(value) {
    const deleteMovie = await sql.execute(
      `DELETE FROM Movie WHERE id = ${value}`,
      db.nextjsDb
    );
    res.json(deleteMovie);
  }
}
