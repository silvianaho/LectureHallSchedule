/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
import { pool } from '../models/pool';
import {
  insertLectures,
  dropLecturesTable,
  createLecturesTable,
  createTechniciansTable
} from './queries';

export const executeQueryArray = async (arr) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve) => {
    const stop = arr.length;
    console.log(arr)
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });

export const dropTables = () => executeQueryArray([dropLecturesTable]);
export const createTables = () => executeQueryArray([createLecturesTable, createTechniciansTable]);
export const insertIntoTables = () => executeQueryArray([insertLectures]);
