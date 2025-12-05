import { NotFoundIcon } from "@/components/icons/NotFoundIcon";
import { Button } from "@/components/ui/Button";
import { NavLink } from "react-router";

export function NotFoundPage() {
  return (
    <div className="mt-52 flex h-full w-full flex-col items-center justify-center gap-3 p-4">
      <div className="w-[300px]">
        <NotFoundIcon />
      </div>

      <h2 className="text-lg font-medium">Такой страницы не существует!</h2>

      <Button
        asChild
        className="bg-action text-action-foreground hover:bg-action/85 transition-colors"
      >
        <NavLink to="/" className="text-lg" viewTransition>
          На главную
        </NavLink>
      </Button>
    </div>
  );
}
