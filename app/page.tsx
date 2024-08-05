import { Suspense } from "react";
import HomeContent from "./components/Home";

function Home() {

  return (
    <Suspense>
      <HomeContent/>
    </Suspense>
  );
}

export default Home;
