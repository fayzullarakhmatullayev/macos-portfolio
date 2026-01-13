import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

const Image = ({ windowId, data }) => {
  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target={windowId} />
        <h2 className="text-sm font-medium">{name}</h2>
      </div>
      <div className="flex h-full rounded-b-md">
        <div className="flex-1 flex items-center justify-center p-4 h-full">
          <img
            src={imageUrl}
            alt={name}
            className="max-w-200 max-h-200 object-contain shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image);

export default ImageWindow;
