import { trackerStore } from "../store/trackerStore";
import { TransactionTypes } from "../types";

export const filterTransactions = (transactions: TransactionTypes[]) => {
  // console.log(
  //   "trackerStore.selectedAccount.account_id",
  //   trackerStore.selectedAccount.account_id
  // );

  if (trackerStore.selectedAccount?.account_id === "0") {
    // if the account is 0, return all transactions from all accounts
    return transactions;
  }
  return transactions.filter(
    (transaction) =>
      transaction.account_id === trackerStore.selectedAccount?.account_id
  );
};
