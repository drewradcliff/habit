import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const routes = [
  { label: "day", route: "/" },
  { label: "month", route: "/month" },
  { label: "year", route: "/year" },
];

export default function Header() {
  const router = useRouter();

  return (
    <header className="text-right pt-6">
      {routes.map(({ label, route }) => (
        <Link href={route}>
          <a
            className={clsx(
              "ml-2",
              "hover:text-green-300",
              router.pathname === route && "text-blue-400"
            )}
          >
            {label}
          </a>
        </Link>
      ))}
    </header>
  );
}
