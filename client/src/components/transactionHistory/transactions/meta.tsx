import { observer } from "mobx-react-lite";
import { trackerStore } from "@store/trackerStore";
import styles from "./styles.module.css";
interface TransactionMetaProps {
  totalSpent: number;
}

const TransactionMeta = observer(({ totalSpent }: TransactionMetaProps) => {
  return (
    <div className={styles.meta}>
      {trackerStore.selectedAccount?.official_name && (
        <div className="large-pill">
          <p className="display-1">
            {trackerStore.selectedAccount?.official_name}
          </p>
        </div>
      )}
      <div className="large-pill">
        <p className="display-1">Total Spent</p>
        <p className="display-3">${totalSpent} </p>
      </div>
      {trackerStore.selectedAccount?.account_id !== "0" && (
        <>
          <div className="large-pill">
            <p className="display-1">Available</p>
            <p className="display-3">
              ${trackerStore.selectedAccount?.balances.available}
            </p>
          </div>
          <div className="large-pill">
            <p className="display-1">Current</p>
            <p className="display-3">
              ${trackerStore.selectedAccount?.balances.current}
            </p>
          </div>
        </>
      )}
    </div>
  );
});

export default TransactionMeta;
