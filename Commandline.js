import { createInterface } from "readline";

export class Commandline {
  static ask(question) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve, reject) => {
      rl.question(`${question} `, (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  }

  static print(value) {
    console.log(value);
  }
}
