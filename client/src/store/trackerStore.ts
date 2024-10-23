import { makeAutoObservable } from "mobx";
import {
  AccountTypes,
  CategoryTypes,
  TimeframeTypes,
  TransactionTypes,
} from "../types";

class TrackerStore {
  accounts: AccountTypes[] = [];
  selectedAccount: AccountTypes | null = null;
  timeframe: TimeframeTypes = "weekly";
  categories: CategoryTypes[] = [];
  transactions: TransactionTypes[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedAccount(value: AccountTypes) {
    this.selectedAccount = value;
  }

  setTransactions(value: TransactionTypes[]) {
    this.transactions = value;
  }

  setAccounts(value: AccountTypes[]) {
    this.accounts = value;
  }

  // Mutate categories to include the total amount spent in each category
  setCategorySpendLimit(categoryId: string, spendLimit: number) {
    this.categories = this.categories.map((category) =>
      category.id === categoryId ? { ...category, spendLimit } : category
    );
  }
  setCategories(value: CategoryTypes[]) {
    this.categories = value.map((category) => ({
      ...category,
      spendLimit: 120,
    }));
  }

  setMutatingCategory(id: string, name: string, spendLimit: number) {
    const category = this.categories.find((category) => category.id === id);
    if (category) {
      category.spendLimit = spendLimit;
      category.name = name;
    }
  }
}

export const trackerStore = new TrackerStore();
