import { readFile, writeFile } from "fs";

export class Filesystem {
  static read(accountName) {
    return new Promise((resolve, reject) => {
      readFile(`accounts/${accountName}.txt`, "utf8", (err, data) => {
        if (err) reject("Account does not exist");
        resolve(data);
      });
    });
  }
  static write(accountName, content) {
    return new Promise((resolve, reject) => {
      writeFile(`accounts/${accountName}.txt`, content.toString(), (err) => {
        if (err) reject("Error: failed to create/edit your account file");
        resolve();
      });
    });
  }
}
