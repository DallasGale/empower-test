export type TimeframeTypes = "weekly" | "monthly" | "yearly";

export type AccountTypes = {
  account_id: string;
  name: string;
  balances: { available: number; current: number; iso_currency_code: string };
  official_name: string;
};

export type TransactionTypes = {
  account_id: string;
  amount: number;
  iso_currency_code: string;
  category_id: string;
  date: Date;
  merchant_name: string;
  merchant_id: string;
  logo_url: string;
  website: string;
  payment_channel: string;
  pending: boolean;
};

export type CategoryTypes = {
  id: string;
  name: string;
  spendLimit: number;
};
