import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";

const WindowWrapper = Component => {
  const Wrapped = ({ windowId, ...props }) => {
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows.find(w => w.id === windowId);

    const { isOpen, zIndex, position } = windowState;

    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;

      if (!el || !isOpen) return;

      el.style.display = "block";

      if (position) {
        gsap.set(el, {
          x: `+=${position.x}`,
          y: `+=${position.y}`
        });
      }

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: (position?.y || 0) + 40 },
        {
          scale: 1,
          opacity: 1,
          y: position?.y || 0,
          duration: 0.4,
          ease: "power3.out"
        }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowId)
      });

      return () => {
        instance.kill();
      };
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowId}
        ref={ref}
        style={{ zIndex }}
        className="absolute bg-white rounded-md overflow-hidden shadow-2xl inset-shadow-2xl"
      >
        <Component {...props} windowId={windowId} data={windowState.data} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
