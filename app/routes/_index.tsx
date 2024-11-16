import type { MetaFunction } from "@remix-run/node";
import { Suspense } from "react";
import MapContainer from "~/components/map/MapContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Hello World!" },
    { name: "description", content: "Hello World!" },
  ];
};

export default function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapContainer />
    </Suspense>
  );
}
