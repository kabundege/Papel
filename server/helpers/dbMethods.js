import pool from '../config/dbConfig';

class Dbmethods {
  static async select(columns, table, condition) {
    let query;
    if(condition === undefined){
      query = `SELECT ${columns} FROM ${table};`;
    }else{
      query = `SELECT ${columns} FROM ${table} WHERE ${condition};`;
    }
    const { rows } = await pool.query(query);
    return rows;
  }

  static async insert(table, columns, params, data, returns) {
    const query = `INSERT INTO ${table} (${columns}) values (${params}) RETURNING ${returns};`;
    const { rows } = await pool.query(query, data);
    return rows['0'];
  }

  static async update(table, data, condition, returns) {
    const query = `UPDATE ${table} SET ${data} WHERE ${condition} RETURNING ${returns};`;
    const { rows } = await pool.query(query);
    return rows['0'];
  }

  static async delete(table, condition) {
    const query = `DELETE FROM ${table} WHERE ${condition} RETURNING *`;
    const { rows } = await pool.query(query);
    return rows['0'];
  }
}
export default Dbmethods;