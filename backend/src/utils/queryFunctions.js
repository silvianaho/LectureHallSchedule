/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessageTable,
  insertLectures,
  dropLecturesTable,
  createLecturesTable,
} from './queries';

export const executeQueryArray = async (arr) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });

export const dropTables = () =>
  executeQueryArray([dropLecturesTable, dropMessagesTable]);
export const createTables = () =>
  executeQueryArray([createLecturesTable, createMessageTable]);
export const insertIntoTables = () =>
  executeQueryArray([insertLectures, insertMessages]);
