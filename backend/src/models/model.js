import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client ${client}`
    );
  }

  async selectDistinct(columns) {
    const query = `
  SELECT
    DISTINCT ${columns}
  FROM
    ${this.table}
  GROUP BY ${columns};`;
    return this.pool.query(query);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insertLecture(columns, values) {
    const query = `
    INSERT INTO ${this.table} (${columns})
    VALUES ${values}
    `;
    return this.pool.query(query);
  }
}

export default Model;
