interface Link {
  text: string;
  href: string;
  color: "blue" | "green" | "yellow";
}

export const links: Link[] = [
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
