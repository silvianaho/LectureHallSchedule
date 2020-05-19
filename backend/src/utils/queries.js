export const createLecturesTable = `
DROP TABLE IF EXISTS lectures;
CREATE TABLE IF NOT EXISTS lectures(
    lectureId BIGINT PRIMARY KEY,
    facultyId BIGINT NOT NULL,
    semesterId BIGINT NOT NULL,
    dayOfWeek SMALLINT NOT NULL,
    startTime TIME WITHOUT TIME ZONE NOT NULL,
    endTime TIME WITHOUT TIME ZONE NOT NULL
)
`;

export const createTechniciansTable = `
DROP TABLE IF EXISTS technicians;
CREATE TABLE IF NOT EXISTS technicians(
    technicianId BIGINT PRIMARY KEY,
    facultyId BIGINT NOT NULL,
    semesterId BIGINT NOT NULL,
    dayOfWeek SMALLINTNOT NULL,
    startTime TIME[MINUTE][WITHOUT TIME ZONE] NOT NULL,
    endTime TIME[MINUTE][WITHOUT TIME ZONE] NOT NULL
    )
    `;

// lectureHall TINYINT(1)

export const insertLectures = `
INSERT INTO lectures(lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime)
VALUES (1111111111, 2222222222, 1111111111, 1, '1000', '1100')
`;

export const dropLecturesTable = 'DROP TABLE lectures';
export const dropTechniciansTable = 'DROP TABLE technicians';
