"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowLeft, LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri";
import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";
import type { IconType } from "react-icons";

import { useFavoriteStore } from "@poku/stores/favorite";
import { useLayoutStore } from "@poku/stores/layout";
import Pokeball from "@poku/assets/pokeball.svg";

export default function SimpleHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const name = pathname.split("/")[1];
  const { isGrid, toggleLayout } = useLayoutStore(
    useShallow((state) => ({
      isGrid: state.isGrid,
      toggleLayout: state.toggleLayout,
    })),
  );
  const { favorites, toggleFavorite } = useFavoriteStore(
    useShallow((state) => ({
      favorites: state.favorites,
      toggleFavorite: state.toggleFavorite,
    })),
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const HeartIcon = useMemo<IconType>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isFavorite ? RiHeart2Fill : RiHeart2Line;
  }, [isFavorite]);

  useEffect(() => {
    setIsFavorite(favorites.includes(name!));
  }, [favorites, name]);
  return (
    <div
      className={clsx(
        "container fixed inset-x-0 top-0 flex w-full items-center pt-16",
        isHome
          ? "z-auto justify-end text-black"
          : "z-10 justify-between text-white",
      )}
    >
      <motion.button
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        onClick={() => router.back()}
        className={clsx(isHome && "hidden")}
      >
        <LuArrowLeft size={24} />
      </motion.button>
      <motion.button
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        className={clsx("hover:", isHome && "hidden")}
        onClick={() => toggleFavorite(name!)}
      >
        <AnimatePresence>{<HeartIcon size={24} />}</AnimatePresence>
      </motion.button>
      <div className={clsx("group relative", !isHome && "hidden")}>
        <motion.button
          whileHover={{
            scale: 1.025,
          }}
          whileTap={{
            scale: 0.975,
          }}
          onClick={toggleLayout}
        >
          <AnimatePresence>
            {isGrid ? <LuLayoutList size={24} /> : <LuLayoutGrid size={24} />}
          </AnimatePresence>
        </motion.button>
        <span
          className={clsx(
            "absolute right-[62%] top-[20%] z-[-1] h-[25rem] w-[25rem] translate-x-[50%] translate-y-[-50%]",
            isHome ? "text-gray-100" : "text-gray-100/20",
          )}
        >
          <Pokeball />
        </span>
      </div>
    </div>
  );
}
