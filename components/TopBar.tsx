"use client";

import useUserStore from "@/hooks/useUserStore";
import SettingsDialog from "./SettingsDialog";
import TodoDialog from "./TodoDialog";

const TopBar = () => {
  const { username } = useUserStore();

  return (
    <div className="flex h-1/20 items-center justify-between">
      <div className="flex gap-4">
        <h1 className="border-r pr-4 border-zinc-500">
          {!username ? "Welcome User" : `Welcome Back, ${username}`}
        </h1>
        <h1>Hello</h1>
      </div>
      <div className="flex items-center gap-4">
        <TodoDialog />
        <SettingsDialog />
      </div>
    </div>
  );
};
export default TopBar;
