import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Finder,
  Resume,
  Safari,
  Terminal,
  Text,
  Image,
  Gallery,
  Contact
} from "#windows";

import useWindowStore from "#store/window.js";

gsap.registerPlugin(Draggable);

const App = () => {
  const windows = useWindowStore(state => state.windows);

  const windowComponents = {
    finder: Finder,
    resume: Resume,
    safari: Safari,
    terminal: Terminal,
    txtfile: Text,
    imgfile: Image,
    photos: Gallery,
    contact: Contact
  };

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      {windows.map(window => {
        const Component = windowComponents[window.type];
        if (!Component) return null;

        return <Component key={window.id} windowId={window.id} />;
      })}

      <Home />
    </main>
  );
};

export default App;
