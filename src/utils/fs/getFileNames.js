import fs from 'fs';
import path from 'path';


export default (dirname, ignored = []) => {
  const arr = fs
    .readdirSync(dirname)
    .filter(name => (
      fs.lstatSync(path.join(dirname, name)).isFile() &&
      (ignored.indexOf(name) === -1)
    ));

  return arr;
};
