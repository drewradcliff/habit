import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const routes = [
  { label: "day", route: "/" },
  { label: "year", route: "/year" },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="text-right pt-6 text-xl sm:text-base mb-12">
      {routes.map(({ label, route }) => (
        <Link href={route} key={label}>
          <a
            className={clsx(
              "hover:text-green-300 p-2",
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
