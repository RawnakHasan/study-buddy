import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ThemeToggle } from "./ThemeToggle";
import UsernameForm from "./UsernameForm";
import useUserStore from "@/hooks/useUserStore";

const SettingsDialog = () => {
  const { username, resetUsername } = useUserStore();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <ThemeToggle />
          {username && (
            <Button
              className="w-fit"
              variant="destructive"
              onClick={resetUsername}
            >
              Reset Username
            </Button>
          )}
        </div>
        {!username && <UsernameForm />}
      </DialogContent>
    </Dialog>
  );
};
export default SettingsDialog;
