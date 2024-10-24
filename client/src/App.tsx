import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import Header from "@components/header/";
import { MantineProvider } from "@mantine/core";
import Actions from "@components/actions";
import { trackerStore } from "@store/trackerStore";
import { observer } from "mobx-react-lite";
import Tabbing from "@components/tabbing";
import Categories from "./components/categories";
import TransactionHistory from "./components/transactionHistory";
import { LoadingOverlay } from "@mantine/core";

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

  return (
    <MantineProvider>
      <main>
        <Header />
        <div className="container">
          <Actions />
          {trackerStore.selectedAccount ? (
            <>
              {/* Based on the selected account display the appropriate transactions */}
              <Tabbing
                categories={<Categories />}
                transactionHistory={<TransactionHistory />}
              />
            </>
          ) : (
            <p className="display-3">No account selected</p>
          )}
        </div>
      </main>
    </MantineProvider>
  );
});

export default App;
