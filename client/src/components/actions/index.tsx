import { Select } from "@mantine/core";
import styles from "./styles.module.css";
import { observer } from "mobx-react-lite";
import { trackerStore } from "../../store/trackerStore";
import { toJS } from "mobx";
import { AccountTypes } from "../../types";

const Actions = observer(() => {
  // I choose to use mobX to track state to avoid prop drilling to get the api data.
  // The api data get's stored inside the store on page load at the app level.
  const accounts = toJS(trackerStore.accounts);

  const formatSelectData = (data: AccountTypes[]) => {
    const defaultOption = {
      value: "0",
      label: "Combine Accounts",
      balances: { available: 0, current: 0, iso_currency_code: "" },
      official_name: "",
    };

    return [
      ...data.map((item: AccountTypes) => ({
        value: item.account_id,
        label: item.name,
        balances: item.balances,
        official_name: item.official_name,
      })),
      defaultOption,
    ];
  };
  return (
    <div className={styles.actions}>
      {/* Added a check here if there is a problem with the accounts data.  */}
      {!accounts ? (
        <p>No accounts found</p>
      ) : (
        <Select
          onChange={(_value, options) => {
            return trackerStore.setSelectedAccount({
              account_id: options.value,
              name: options.label,
              balances: options.balances,
              official_name: options.official_name,
            });
          }}
          value={trackerStore.selectedAccount?.account_id}
          label="Account"
          data={formatSelectData(accounts)}
          classNames={{
            label: "display-1",
            option: "display-1",
            input: "display-1",
          }}
        />
      )}
      <Select
        disabled
        defaultValue={trackerStore.timeframe}
        label="Timeframe"
        placeholder="Choose your timeframe"
        data={["weekly", "daily"]}
        classNames={{
          label: "display-1",
          option: "display-1",
          input: "display-1",
        }}
      />
    </div>
  );
});

export default Actions;
