import Station from "./View/Station"
import Trail from "./View/Trail"

function App() {

  const [page, id] = window.location.hash.split("-");
  if (page == "#station") {
    return <Station id={id} />
  }
  return <Trail id={id} />
}

export default App
