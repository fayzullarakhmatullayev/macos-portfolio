import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

const Image = () => {
  const data = useWindowStore(state => state.windows.imgfile.data);

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2 className="text-sm font-medium">{name}</h2>
      </div>
      <div className="p-0 overflow-hidden h-full flex flex-col select-none bg-black/5">
        <div className="flex-1 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
