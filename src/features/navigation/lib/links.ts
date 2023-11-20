interface Link {
  text: string;
  href: string;
  color: "blue" | "green" | "yellow";
}

type Route = Link;

export const links: Route[] = [
  {
    href: "/projects",
    text: "Projects",
    color: "blue",
  },
  {
    href: "/about",
    text: "About",
    color: "yellow",
  },
];
