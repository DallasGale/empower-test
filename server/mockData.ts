import { format, subDays } from "date-fns";
import { Account, Category, Transaction } from "./types";

const today = new Date(Date.now());
const dateFormatted = (sub: number) =>
  format(subDays(today, sub), "yyyy-MM-dd");

export const accounts: Account[] = [
  {
    account_id: "1",
    balances: {
      available: 110.94,
      current: 110.94,
      iso_currency_code: "USD",
    },
    name: "Plaid Checking",
    official_name: "Plaid Gold Standard 0% Interest Checking",
    subtype: "checking",
    type: "depository",
  },
  {
    account_id: "2",
    balances: {
      available: 2000.34,
      current: 2028.34,
      iso_currency_code: "USD",
    },
    name: "Demo Bank",
    official_name: "Demo Bank Financial Inc. Spending Account",
    subtype: "checking",
    type: "depository",
  },
];

export const transactions: Transaction[] = [
  {
    account_id: "1",
    amount: 50.33,
    iso_currency_code: "USD",
    category_id: "2",
    date: dateFormatted(0),
    merchant_name: "Target",
    merchant_id: "2mK8jqpmVrw538wamwdm2p7qd5br0eeV9o4a1",
    logo_url: "",
    website: "target.com",
    payment_channel: "in store",
    pending: true,
  },
  {
    account_id: "1",
    amount: 28.34,
    iso_currency_code: "USD",
    category_id: "1",
    date: dateFormatted(1),
    merchant_name: "Burger King",
    merchant_id: "mVrw538wamwdm22mK8jqpp7qd5br0eeV9o4a1",
    logo_url: "https://plaid-merchant-logos.plaid.com/burger_king_155.png",
    website: "burgerking.com",
    payment_channel: "in store",
    pending: true,
  },
  {
    account_id: "2",
    amount: 72.1,
    iso_currency_code: "USD",
    category_id: "2",
    date: dateFormatted(2),
    merchant_name: "Walmart",
    merchant_id: "O5W5j4dN9OR3E6ypQmjdkWZZRoXEzVMz2ByWM",
    logo_url: "https://plaid-merchant-logos.plaid.com/walmart_1100.png",
    website: "walmart.com",
    payment_channel: "in store",
    pending: false,
  },
  {
    account_id: "2",
    amount: 30,
    iso_currency_code: "USD",
    category_id: "1",
    date: dateFormatted(3),
    merchant_name: "Shake Shack",
    merchant_id: "NXAJN1bDAZYjpDKY7Wr5JjzVmV7nnVY171jze",
    logo_url: "https://plaid-merchant-logos.plaid.com/shake_shack_887.png",
    website: "shakeshack.com",
    payment_channel: "in store",
    pending: false,
  },
  {
    account_id: "1",
    amount: 150,
    iso_currency_code: "USD",
    category_id: "5",
    date: dateFormatted(4),
    merchant_name: "Instacart",
    merchant_id: "5JjzVmV7nnVY171jzeNXAJN1bDAZYjpDKY7Wr",
    logo_url: "",
    website: "instacart.com",
    payment_channel: "online",
    pending: false,
  },
  {
    account_id: "1",
    amount: 13.99,
    iso_currency_code: "USD",
    category_id: "3",
    date: dateFormatted(5),
    merchant_name: "Udemy",
    merchant_id: "nnVY171jzeNXAJN5JjzVmV71bDAZYjpDKY7Wr",
    logo_url: "",
    website: "udemy.com",
    payment_channel: "online",
    pending: false,
  },
  {
    account_id: "1",
    amount: 15,
    iso_currency_code: "USD",
    category_id: "4",
    date: dateFormatted(6),
    merchant_name: "Lyft",
    merchant_id: "JN5nnVY171jzeNXA7WrJjzVmV71bDAZYjpDKY",
    logo_url: "",
    website: "lyft.com",
    payment_channel: "online",
    pending: false,
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Food",
  },
  {
    id: "2",
    name: "Shopping",
  },
  {
    id: "3",
    name: "Education",
  },
  {
    id: "4",
    name: "Transportation",
  },
  {
    id: "5",
    name: "Groceries",
  },
];
