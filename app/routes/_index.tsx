import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Comet Park" },
    { name: "Comet Park", content: "Get help finding a spot in the UTD parking lots!" },
  ];
};

export default function Index() {
  return (
    <div>Hello World</div>
  );
}
