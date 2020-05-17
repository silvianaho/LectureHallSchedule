export const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY,
    name VARCHAR DEFAULT '',
    message VARCHAR NOT NULL
)
`;

export const createLecturesTable = `
DROP TABLE IF EXISTS lectures;
CREATE TABLE IF NOT EXISTS lectures(
    lectureId VARCHAR(10) PRIMARY KEY,
    facultyId VARCHAR(10) NOT NULL,
    semesterId VARCHAR(10) NOT NULL,
    dayOfWeek SMALLINT NOT NULL,
    startTime VARCHAR(4) NOT NULL,
    endTime VARCHAR(4) NOT NULL
)
`;

export const createTechniciansTable = `
DROP TABLE IF EXISTS technicians;
CREATE TABLE IF NOT EXISTS technicians(
    technicianId BIGINT PRIMARY KEY,
    facultyId BIGINT NOT NULL,
    semesterId BIGINT NOT NULL,
    dayOfWeek TINYINT(1) DEFAULT '',
    startTime VARCHAR(4) NOT NULL,
    endTime VARCHAR(4) NOT NULL
    )
    `;

// lectureHall TINYINT(1)

export const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('namae', 'first message'),
    ('person', 'second message')
`;

export const insertLectures = `
INSERT INTO lectures(lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime)
VALUES (1111111111, 2222222222, 1111111111, 1, '1000', '1100')
`;

export const dropMessagesTable = 'DROP TABLE messages';
export const dropLecturesTable = 'DROP TABLE lectures';
export const dropTechniciansTable = 'DROP TABLE technicians';
