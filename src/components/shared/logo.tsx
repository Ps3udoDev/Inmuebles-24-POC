import type { FC } from "react";

export const Logo: FC = () => {
  return (
    <div className="flex items-center gap-3 text-foreground">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-[#181611]">
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="text-lg font-bold tracking-tight">
        CasaIdeal Inmobiliaria
      </span>
    </div>
  );
};
