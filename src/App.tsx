import { useEffect, useState } from "react";
import Station from "./View/Station"
import Trail from "./View/Trail"

function App() {

  const [location, setLocation] = useState(window.location.hash);


  const go = (hash: string) => {
    window.location.hash = hash;
    setLocation(window.location.hash);
  }

  const [page, id] = location.split("-");
  if (page == "#station") {
    return <Station id={id} go={go} />
  }
  return <Trail id={id} go={go} />
}

export default App
