import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400 },
  title: { min: 100, max: 900 }
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={`${text}-${i}`}
      className={className}
      data-base-weight={baseWeight}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}`,
        display: "inline-block"
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container || window.innerWidth < 640) return;

  const letters = container.querySelectorAll("span");
  const { min, max } = FONT_WEIGHTS[type];

  const handleMouseMove = e => {
    const { left: containerLeft } = container.getBoundingClientRect();
    const mouseX = e.clientX - containerLeft;

    letters.forEach(letter => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const letterCenterX = l - containerLeft + w / 2;
      const distance = Math.abs(mouseX - letterCenterX);

      const intensity = Math.exp(-(distance ** 2) / 15000);
      const weight = min + (max - min) * intensity;

      gsap.to(letter, {
        fontVariationSettings: `'wght' ${weight}`,
        duration: 0.1,
        ease: "power2.out",
        overwrite: true
      });
    });
  };

  const handleMouseLeave = () => {
    letters.forEach(letter => {
      gsap.to(letter, {
        fontVariationSettings: `'wght' ${letter.dataset.baseWeight}`,
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: true
      });
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    let titleCleanup, subtitleCleanup;

    const setup = () => {
      if (!mediaQuery.matches) return;
      titleCleanup = setupTextHover(titleRef.current, "title");
      subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
    };

    const cleanup = () => {
      if (titleCleanup) titleCleanup();
      if (subtitleCleanup) subtitleCleanup();
    };

    const handleChange = () => {
      cleanup();
      setup();
    };

    mediaQuery.addEventListener("change", handleChange);
    setup();

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      cleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <div ref={subtitleRef} className="text-center">
        {renderText(
          "Hey, I'm Fayzulla! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </div>
      <h1 ref={titleRef} className="mt-7 text-center">
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>
      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
