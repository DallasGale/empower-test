import { FloatingIndicator, Tabs } from "@mantine/core";
import React, { useState } from "react";
import styles from "./styles.module.css";

interface TabbingProps {
  categories: React.ReactNode;
  transactionHistory: React.ReactNode;
}
const Tabbing = ({ categories, transactionHistory }: TabbingProps) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("1");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  return (
    <div style={{ maxWidth: 1000 }}>
      <Tabs variant="none" value={value} onChange={setValue}>
        <Tabs.List ref={setRootRef} className={styles.list}>
          <Tabs.Tab
            classNames={{ tab: styles.tab }}
            value="1"
            ref={setControlRef("1")}
          >
            <span className="display-3">Categories</span>
          </Tabs.Tab>
          <Tabs.Tab
            classNames={{ tab: styles.tab }}
            value="2"
            ref={setControlRef("2")}
          >
            <span className="display-3">Transaction History</span>
          </Tabs.Tab>

          <FloatingIndicator
            target={value ? controlsRefs[value] : null}
            parent={rootRef}
            className={styles.indicator}
          />
        </Tabs.List>

        <Tabs.Panel value="1">{categories}</Tabs.Panel>
        <Tabs.Panel value="2">{transactionHistory}</Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Tabbing;
