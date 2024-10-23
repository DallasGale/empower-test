import { trackerStore } from "../../store/trackerStore";
import { filterTransactions } from "../../utils/filterTransactions";
import TransactionMeta from "./transactions/meta";
import TransactionRow from "./transactions/row";
import styles from "./styles.module.css";

const TransactionHistory = () => {
  const transactions = filterTransactions(trackerStore.transactions);
  const sumAllTransactions = transactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  return (
    <section>
      <div className={styles.header}>
        <h2 className="display-2">Transaction History</h2>
      </div>
      <ul className="ul panel">
        {transactions.map((transaction, i) => {
          // Ideally I would combine same day transactions but doesnt look like there are any in the data so I will leave it as is.
          return <TransactionRow key={i} transaction={transaction} />;
        })}
      </ul>
      <TransactionMeta totalSpent={sumAllTransactions} />
    </section>
  );
};

export default TransactionHistory;
