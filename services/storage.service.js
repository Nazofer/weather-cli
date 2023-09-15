import { homedir } from 'os';
import { join, basename } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

export const STORE_NAMES = {
  token: 'token',
  city: 'city',
}

const exists = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (err) {
    return false;
  }
};

const getByKey = async (key) => {
  let data = {};
  if (await exists(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};


const saveKeyValue = async (key, value) => {
  let data = {};
  if (await exists(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
};

export { saveKeyValue, getByKey };
