import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Button({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return <button {...props} className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed">{children}</button>;
}
