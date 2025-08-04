"use client";
import { useState } from "react";

type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabItem[];
  initialTabId?: string;
  render: (activeTabId: string) => React.ReactNode;
};

const Tabs = ({ tabs, initialTabId, render }: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState<string>(() =>
    initialTabId && tabs.some(({ id }) => id === initialTabId) ? initialTabId : tabs[0]?.id
  );

  return (
    <div>
      <div role="tablist" className="flex">
        {tabs.map(({ id, label }, index) => (
          <div
            key={id}
            role="tab"
            aria-selected={activeTabId === id}
            aria-controls={`panel-${id}`}
            tabIndex={index}
            onClick={() => setActiveTabId(id)}
            className="cursor-pointer rounded-sm border border-zinc-400 px-3 py-1 hover:text-zinc-400 aria-selected:bg-zinc-700"
          >
            {label}
          </div>
        ))}
      </div>
      {!!activeTabId && render(activeTabId)}
    </div>
  );
};

export default Tabs;
