import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import { socials } from "#constants";

const Contact = ({ windowId }) => {
  return (
    <>
      <div id="window-header">
        <WindowControls target={windowId} />
        <h2>Contact Me</h2>
      </div>
      <div className="p-5 space-y-5">
        <img
          src="/images/adrian.jpg"
          alt="adrian"
          className="w-20 rounded-full"
        />
        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <p>contact@jsmastery.pro</p>
        <ul>
          {socials.map(item => (
            <li key={item.id} style={{ backgroundColor: item.bg }}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.icon} alt={item.text} className="size-5" />
                <p>{item.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact);
export default ContactWindow;
