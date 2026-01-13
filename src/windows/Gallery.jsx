import { useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window.js";
import clsx from "clsx";

const Gallery = ({ windowId }) => {
  const [activeCategory, setActiveCategory] = useState("Library");
  const { openWindow } = useWindowStore();

  const handleImageClick = item => {
    openWindow("imgfile", {
      name: `Photo ${item.id}`,
      imageUrl: item.img
    });
  };

  const filteredGallery = gallery.filter(
    item => item.category === activeCategory
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target={windowId} />
        <h2 className="text-sm font-medium">Photos</h2>
      </div>
      <div className="flex h-full rounded-b-md">
        <div className="sidebar">
          <ul className="space-y-2">
            {photosLinks.map(link => (
              <li
                key={link.id}
                onClick={() => setActiveCategory(link.title)}
                className={clsx(
                  activeCategory === link.title ? "active" : "not-active"
                )}
              >
                <img src={link.icon} alt={link.title} className="w-4" />
                <p className="text-sm font-medium ">{link.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-2xl font-bold mb-6">{activeCategory}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredGallery.map(item => (
              <div
                key={item.id}
                onClick={() => handleImageClick(item)}
                className="aspect-square rounded-lg overflow-hidden group relative shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={`Gallery ${item.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const GalleryWindow = WindowWrapper(Gallery);

export default GalleryWindow;
