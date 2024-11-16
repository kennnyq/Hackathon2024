import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Hello World!" },
    { name: "description", content: "Hello World!" },
  ];
};

export default function Index() {
  return (
    <div>Hello World</div>
  );
}
