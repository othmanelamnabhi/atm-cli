import { Commandline } from "./Commandline.js";
import { Account } from "./Account.js";

async function main() {
  // Prompt the user for which account to access and store the value
  const accountName = await Commandline.ask(
    "What account do you wish to access?"
  );
  try {
    // check whether the account exists or doesn't and launch actions accordingly
    if ((await Account.find(accountName)) === null) {
      const wishToCreateAccount = await Commandline.ask(
        "This account does not exist, do you wish to create it? (yes / no)"
      );

      if (wishToCreateAccount === "yes") {
        // Create text file with Account name and balance of 0
        Account.create(accountName);
        // Create account instance from Account
        const account = new Account(accountName);
        await account.loadbalance();
        account.print();
        promptForTasks(account);
      } else {
        return;
      }
    } else {
      // Create account instance from Account
      const account = new Account(accountName);
      await account.loadbalance();
      promptForTasks(account);
    }
    // Prompt what you want user to do
  } catch (error) {
    //console.log("An error occured, please try again!");
    console.log(error);
  }
}

async function promptForTasks(account) {
  const whichTask = await Commandline.ask(
    "What would you like to do? (deposit / withdraw / check balance)"
  );
  if (whichTask === "deposit") {
    await account.deposit();
  } else if (whichTask === "withdraw") {
    await account.withdraw();
  }
  account.print();
}

main();
