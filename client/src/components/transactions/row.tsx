import { TransactionTypes } from "../../types";
import styles from "./styles.module.css";
import { IconCashRegister } from "@tabler/icons-react";

interface TransactionRowProps {
  transaction: TransactionTypes;
}
const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const date = new Date(transaction.date);

  return (
    <li className={styles.row}>
      <p className="display-1">{date.toDateString()}</p>
      <div className={styles.transaction}>
        <div className={styles.merchant}>
          {transaction.logo_url ? (
            <img
              className={styles.logo}
              src={transaction.logo_url}
              alt={transaction.merchant_name}
            />
          ) : (
            <div className={styles.icon}>
              <IconCashRegister size={20} />
            </div>
          )}
          <p className="display-1">{transaction.merchant_name}</p>
          {transaction.pending && <p className="display-1 pending">pending</p>}
        </div>
        <p className="display-1">${transaction.amount}</p>
      </div>
    </li>
  );
};

export default TransactionRow;
