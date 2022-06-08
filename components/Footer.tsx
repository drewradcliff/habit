import { Code, Twitter } from "iconoir-react";

export default function Footer() {
  const links = [
    {
      label: "source",
      icon: <Code className="w-5" />,
      link: "https://github.com/drewradcliff/habit",
    },
    {
      label: "twitter",
      icon: <Twitter className="w-5" />,
      link: "https://twitter.com/aradcliff0",
    },
  ];
  return (
    <footer className="text-center mb-8 mt-12 flex justify-center items-center">
      {links.map(({ label, icon, link }) => (
        <a
          key={label}
          className="text-gray-400 hover:text-green-300 mr-5"
          href={link}
        >
          <div className="flex items-center justify-center">
            {icon}
            <span className="ml-1">{label}</span>
          </div>
        </a>
      ))}
    </footer>
  );
}
