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

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause) query += clause;
    // eslint-disable-next-line no-console
    console.log(query);
    return this.pool.query(query);
  }

  async insertLecture(columns, values) {
    const query = `
    INSERT INTO ${this.table} (${columns})
    VALUES ${values}
    RETURNING ${columns}
    `;
    // console.log(query);
    // console.log(values);
    return this.pool.query(query);
  }
}

export default Model;
