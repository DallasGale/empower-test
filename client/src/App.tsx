// External dependencies
import { useEffect, useState } from "react";
import { MantineProvider, LoadingOverlay } from "@mantine/core";
import { observer } from "mobx-react-lite";
import "@mantine/core/styles.css";

// Store
import { trackerStore } from "@store/trackerStore";

// Components
import Header from "@components/header/";
import Actions from "@components/actions";
import Tabbing from "@components/tabbing";
import Categories from "./components/categories";
import TransactionHistory from "./components/transactionHistory";

const API_ENDPOINT = "http://localhost:3000";

const App = observer(() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const endpoints = [
        `${API_ENDPOINT}/accounts`,
        `${API_ENDPOINT}/transactions`,
        `${API_ENDPOINT}/categories`,
      ];

      const [accountData, transactionsData, categoriesData] = await Promise.all(
        endpoints.map((endpoint) => fetch(endpoint).then((res) => res.json()))
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

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <MantineProvider>
      <main>
        <Header />
        <div className="container">
          <Actions />
          {loading && <LoadingOverlay visible />}
          {error && <div className="error">{error}</div>}
          {trackerStore.selectedAccount ? (
            <Tabbing
              categories={<Categories />}
              transactionHistory={<TransactionHistory />}
            />
          ) : (
            <p className="display-3">No account selected</p>
          )}
        </div>
      </main>
    </MantineProvider>
  );
});

export default App;
