import { Suspense } from "react";
import SomeServerComponentWrapper from "../components/server-components/some-sc-wrapper";

async function Home() {
  return (
    <div>
      <Suspense fallback={<div>Some wrapper Loading...</div>}>
        <SomeServerComponentWrapper />
      </Suspense>
    </div>
  );
}

export default Home;
