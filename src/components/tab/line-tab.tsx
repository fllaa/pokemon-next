"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export interface LineTabsProps {
  tabs: string[];
  children: ({ activeTab }: { activeTab: string }) => React.ReactNode;
}

export default function LineTabs({ tabs, children }: Readonly<LineTabsProps>) {
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <>
      <div className="flex items-center gap-2 border-b p-4">
        {tabs.map((tab) => (
          <LineTab
            text={tab}
            selected={selected === tab}
            setSelected={setSelected}
            key={tab}
          />
        ))}
      </div>
      {children({ activeTab: selected! })}
    </>
  );
}

export interface LineTabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

export const LineTab = ({ text, selected, setSelected }: LineTabProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "font-semibold text-black"
          : "text-gray-500 hover:text-gray-700"
      } relative w-full rounded-md px-2.5 py-0.5 text-sm transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5, bounce: 0.5 }}
          className="absolute inset-0 z-0 mt-10 h-0.5 rounded-md bg-gradient-to-r from-violet-600 to-blue-600"
        ></motion.span>
      )}
    </button>
  );
};
