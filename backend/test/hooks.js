import {
  createTables,
  insertIntoTables,
  dropTables,
} from '../src/utils/queryFunctions';

before(async () => {
  await createTables();
  await insertIntoTables();
});

after(async () => {
  await dropTables();
});
