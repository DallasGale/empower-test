import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import Header from "@components/header/";
import { MantineProvider } from "@mantine/core";
import Actions from "@components/actions";
import { trackerStore } from "@store/trackerStore";
import { observer } from "mobx-react-lite";
import { filterTransactions } from "./utils/filterTransactions";
import Tabbing from "@components/tabbing";
import TransactionRow from "./components/transactions/row";
import TransactionMeta from "./components/transactions/meta";
import Categories from "./components/categories";

const endpoint = "http://localhost:3000";

const App = observer(() => {
  // 1. Get some data

  // Define the state

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "" });

  // The data was not fetching anything so had to investigate the server re: cors.
  // I have updated the server with the hono cors.
  const fetchAllData = async () => {
    try {
      setLoading(true);
      // Using Promise.all to fetch data concurrently
      const [accountData, transactionsData, categoriesData] = await Promise.all(
        [
          fetch(`${endpoint}/accounts`).then((res) => res.json()),
          fetch(`${endpoint}/transactions`).then((res) => res.json()),
          fetch(`${endpoint}/categories`).then((res) => res.json()),
        ]
      );

      trackerStore.setAccounts(accountData);
      trackerStore.setCategories(categoriesData);
      trackerStore.setTransactions(transactionsData);
      // setTransactions(transactionsData);
      // setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Call the function
  useEffect(() => {
    fetchAllData();
  }, []);

  const transactions = filterTransactions(trackerStore.transactions);
  const sumAllTransactions = transactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <MantineProvider>
      <main>
        <Header />
        <Actions />
        {trackerStore.selectedAccount ? (
          <>
            <p className="display-1">
              Account selected: {trackerStore.selectedAccount.name}
            </p>
            {/* Based on the selected account display the appropriate transactions */}
            <Tabbing
              categories={<Categories />}
              transactionHistory={
                <section>
                  <h2>Transaction History</h2>
                  <TransactionMeta totalSpent={sumAllTransactions} />
                  <ul className="ul panel">
                    {transactions.map((transaction, i) => {
                      // Ideally I would combine same day transactions but doesnt look like there are any in the data so I will leave it as is.
                      return (
                        <TransactionRow key={i} transaction={transaction} />
                      );
                    })}
                  </ul>
                </section>
              }
            />
          </>
        ) : (
          <p>No account selected</p>
        )}
      </main>
    </MantineProvider>
  );
});

export default App;
