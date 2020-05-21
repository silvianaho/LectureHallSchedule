"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropTechniciansTable = exports.dropLecturesTable = exports.insertLectures = exports.createTechniciansTable = exports.createLecturesTable = void 0;
var createLecturesTable = "\nDROP TABLE IF EXISTS lectures;\nCREATE TABLE IF NOT EXISTS lectures(\n    lectureId VARCHAR(10) PRIMARY KEY,\n    facultyId VARCHAR(10) NOT NULL,\n    semesterId VARCHAR(10) NOT NULL,\n    dayOfWeek SMALLINT NOT NULL,\n    startTime VARCHAR(4) NOT NULL,\n    endTime VARCHAR(4) NOT NULL\n)\n";
exports.createLecturesTable = createLecturesTable;
var createTechniciansTable = "\nDROP TABLE IF EXISTS technicians;\nCREATE TABLE IF NOT EXISTS technicians(\n    technicianId BIGINT PRIMARY KEY,\n    facultyId BIGINT NOT NULL,\n    semesterId BIGINT NOT NULL,\n    dayOfWeek TINYINT(1) DEFAULT '',\n    startTime VARCHAR(4) NOT NULL,\n    endTime VARCHAR(4) NOT NULL\n    )\n    "; // lectureHall TINYINT(1)

exports.createTechniciansTable = createTechniciansTable;
var insertLectures = "\nINSERT INTO lectures(lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime)\nVALUES (1111111111, 2222222222, 1111111111, 1, '1000', '1100')\n";
exports.insertLectures = insertLectures;
var dropLecturesTable = 'DROP TABLE lectures';
exports.dropLecturesTable = dropLecturesTable;
var dropTechniciansTable = 'DROP TABLE technicians';
exports.dropTechniciansTable = dropTechniciansTable;