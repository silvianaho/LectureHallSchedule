/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
import createError from "http-errors";
import Model from "../models/model";
import { overlappingInterval } from "../algo";
import { basicModel } from "./basicController";

export const advanceModel = new Model("technicians");

export function createErrorResponse(message, status) {
  return {
    error: createError(status, message),
    result: null,
  };
}

export const getTechnicianFilterInfo = async () => {
  try {
    const [facultyid, semesterid, totalCount] = await Promise.all([
      advanceModel.selectDistinct("facultyid"),
      advanceModel.selectDistinct("semesterid"),
      advanceModel.select("COUNT (*)"),
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

export const getTechnicians = async (queryString) => {
  console.log("meow, this is getTechnicians function");
  try {
    const data = await advanceModel.select("*", `${queryString}`);
    if (data.rows.length === 0)
      return createErrorResponse("Not Found", 404);
    return { error: null, result: data.rows };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (err.errno === "ENOTFOUND")
      return createErrorResponse("Database Error", 500);
    return createErrorResponse(JSON.stringify(err), 500);
  }
};

export const addTechnician = async (reqData) => {
  console.log("meow, this is addTechnician function");
  // eslint-disable-next-line no-unused-vars
  const { data, columns, values } = reqData;
  try {
    const resultData = await advanceModel.insert(columns, values);
    if (resultData)
      return { error: null, result: { result: "success" } };
    return null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    // duplicate record
    if (err.code === "23505")
      return createErrorResponse(err.detail, 400);
    // missing column
    if (err.code === "42703")
      return createErrorResponse("Missing Column", 400);
    // time max 2359
    if (err.code === "22008")
      return createErrorResponse("The maximum time is 2359", 400);
    // database error
    if (err.errno === "ENOTFOUND")
      return createErrorResponse("Database Error", 500);
    // else
    return createErrorResponse("Internal Server Error", 500);
  }
};

export const getTechSurplus = async (queryString) => {
  try {
    const lectureData = await basicModel.select("*", `${queryString}`);
    const technicianData = await advanceModel.select("*", `${queryString}`);
    const result = overlappingInterval(lectureData.rows, technicianData.rows);
    // console.log(result);
    if (result.length === 0)
      createErrorResponse("Sorry, we could not find what you asked for", 404)
    return { error: null, result };
  } catch (err) {
    createErrorResponse("Internal Server Error", 500);
  }
};
