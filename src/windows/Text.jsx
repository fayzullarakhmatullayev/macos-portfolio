import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

const Text = () => {
  const data = useWindowStore(state => state.windows.txtfile.data);

  if (!data) return null;

  const { name, subtitle, image, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2 className="text-sm font-medium">{name}</h2>
      </div>
      <div className="p-6 overflow-y-auto h-full flex flex-col select-text">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-fit h-60 object-contain rounded-lg m-auto mb-4"
          />
        )}
        <div className="flex flex-col gap-1">
          {subtitle && <p className="text-2xl font-bold">{subtitle}</p>}
        </div>
        <div className="flex flex-col gap-3">
          {description &&
            description.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
