"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowLeft, LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";

import { useLayoutStore } from "@poku/stores/layout";
import Pokeball from "@poku/assets/pokeball.svg";

export default function SimpleHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isGrid, toggleLayout } = useLayoutStore(
    useShallow((state) => ({
      isGrid: state.isGrid,
      toggleLayout: state.toggleLayout,
    })),
  );
  return (
    <div className="flex flex-row-reverse items-center justify-between pt-16">
      <motion.button className={clsx(isHome && "hidden")}>
        <LuArrowLeft size={24} />
      </motion.button>
      <div className="group relative">
        <motion.button onClick={toggleLayout}>
          <AnimatePresence>
            {isGrid ? <LuLayoutList size={24} /> : <LuLayoutGrid size={24} />}
          </AnimatePresence>
        </motion.button>
        <span className="absolute right-[62%] top-[20%] z-[-1] h-[25rem] w-[25rem] translate-x-[50%] translate-y-[-50%] text-gray-100 transition-colors duration-300 group-hover:text-gray-200">
          <Pokeball />
        </span>
      </div>
    </div>
  );
}
