import { observer } from "mobx-react-lite";
import { trackerStore } from "../../store/trackerStore";
import styles from "./styles.module.css";
interface TransactionMetaProps {
  totalSpent: number;
}

const TransactionMeta = observer(({ totalSpent }: TransactionMetaProps) => {
  return (
    <div className={styles.meta}>
      <p className="display-1">Total Spent: ${totalSpent} </p>
      {trackerStore.selectedAccount?.account_id !== "0" && (
        <>
          <p className="display-1">
            Available: ${trackerStore.selectedAccount?.balances.available}
          </p>
          <p className="display-1">
            Current: ${trackerStore.selectedAccount?.balances.current}
          </p>
        </>
      )}
    </div>
  );
});

export default TransactionMeta;
