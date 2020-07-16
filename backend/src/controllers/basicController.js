/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
import createError from "http-errors";
import Model from "../models/model";
import { intervalScheduling } from "../algo";

export const basicModel = new Model("lectures");

export const getPageInfo = async () => {
  try {
    const [facultyid, semesterid, totalCount] = await Promise.all([
      basicModel.selectDistinct("facultyid"),
      basicModel.selectDistinct("semesterid"),
      basicModel.select("COUNT (*)"),
    ]);
    const data = {
      facultyid: facultyid.rows,
      semesterid: semesterid.rows,
      totalCount: totalCount.rows[0].count,
    };
    if (data.totalCount === 0) {
      return Promise.resolve({
        error: createError("Not Found", 404),
        result: null,
      });
    }
    return Promise.resolve({ error: null, result: data });
  } catch (err) {
    if (err.errno === "ENOTFOUND")
      return Promise.resolve({
        error: createError("Database Error", 500),
        result: null,
      });
    return Promise.resolve({
      error: createError(JSON.stringify(err), 500),
      result: null,
    });
  }
};

export const getLectures = async (queryString) => {
  try {
    const data = await basicModel.select("*", `${queryString}`);
    if (data.rows.length === 0)
      return Promise.resolve({
        error: createError("Not Found", 404),
        result: null,
      });
    return Promise.resolve({ error: null, result: data.rows });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (err.errno === "ENOTFOUND")
      return Promise.resolve({
        error: createError("Database Error", 500),
        result: null,
      });
    return Promise.resolve({
      error: createError(JSON.stringify(err), 500),
      result: null,
    });
  }
};

export const addLecture = async (reqData) => {
  // eslint-disable-next-line no-unused-vars
  const { data, columns, values } = reqData;
  try {
    const resultData = await basicModel.insert(columns, values);
    if (resultData)
      return Promise.resolve({ error: null, result: { result: "success" } });
    return null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    // duplicate record
    if (err.code === "23505")
      return Promise.resolve({
        error: createError(err.detail, 400),
        result: null,
      });
    // missing column
    if (err.code === "42703")
      return Promise.resolve({
        error: createError("Missing Column", 400),
        result: null,
      });
    // time max 2359
    if (err.code === "22008")
      return Promise.resolve({
        error: createError("The maximum time is 2359", 400),
        result: null,
      });
    // database error
    if (err.errno === "ENOTFOUND")
      return Promise.resolve({
        error: createError("Database Error", 500),
        result: null,
      });
    return Promise.resolve({
      error: createError("Internal Server Error", 500),
      result: null,
    });
  }
};

export const getHalls = async (queryString) => {
  try {
    const data = await basicModel.select("*", `${queryString}`);
    const result = intervalScheduling(data.rows);
    if (result.length === 0)
      return Promise.resolve({
        error: createError("Sorry, we could not find what you asked for", 404),
        result: null,
      });
    return Promise.resolve({ error: null, result });
  } catch (err) {
    return Promise.resolve({
      error: createError("Internal Server Error", 500),
      result: null,
    });
  }
};
