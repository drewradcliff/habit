import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header className="text-right pt-6">
      <Link href="/">
        <a className={router.pathname === "/" ? "font-bold " : ""}>day</a>
      </Link>
      <Link href="/month">
        <a
          className={`pl-2 ${router.pathname === "/month" ? "font-bold" : ""}`}
        >
          month
        </a>
      </Link>
      <Link href="/year">
        <a
          className={`pl-2 ${router.pathname === "/year" ? "font-bold " : ""}`}
        >
          year
        </a>
      </Link>
    </header>
  );
}
