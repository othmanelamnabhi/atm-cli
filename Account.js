import { Filesystem } from "./Filesystem.js";
import { Commandline } from "./Commandline.js";

export class Account {
  constructor(name) {
    this.#name = name;
  }

  #name;
  balance;

  get name() {
    return this.#name;
  }

  get balance() {
    return this.balance;
  }

  async loadbalance() {
    this.balance = parseFloat(await Filesystem.read(this.#name));
  }

  static async find(accountName) {
    try {
      return await Filesystem.read(accountName);
    } catch (error) {
      return null;
    }
  }

  static async create(accountName) {
    // create a file with name of the Account and give it 0 balance
    await Filesystem.write(accountName, 0);
  }
  async deposit() {
    // ask for amount
    const amount = await Commandline.ask("How much do you want to deposit?");
    this.balance = this.balance + parseFloat(amount);
    // write new value inside text file
    Filesystem.write(this.#name, this.balance);
    // this print()
  }
  async withdraw() {
    // ask for amount
    const amount = await Commandline.ask("How much do you want to withdraw?");
    // check if amount > than balance
    if (amount > this.balance) {
      console.log("Insufficient funds");
      return;
    } else {
      this.balance = this.balance - parseFloat(amount);
      // write new value inside text file
      Filesystem.write(this.#name, this.balance);
    }
  }
  print() {
    console.log("Account balance:", this.balance);
  }
}
