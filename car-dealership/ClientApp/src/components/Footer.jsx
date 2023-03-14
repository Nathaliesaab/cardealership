import { FacebookIcon } from "./common/icons/FacebookIcon";
import { InstagramIcon } from "./common/icons/InstagramIcon";
import { TwitterIcon } from "./common/icons/TwitterIcon";
import { useLocation } from "react-router-dom";
export const Footer = () => {
  const location = useLocation();
  const socials = [
    {
      link: "instagram.com",
      icon: <InstagramIcon />,
    },
    {
      link: "twitter.com",
      icon: <TwitterIcon />,
    },
    {
      link: "facebook.com",
      icon: <FacebookIcon />,
    },
  ];
  return location.pathname === "/" ? (
    <></>
  ) : (
    <footer>
      <div className="row footer__wrapper">
        <h5 className="footer__copyright">
          © 2023 <span className="purple">FASTKAR</span> is a registered
          trademark of Global, LLC.
        </h5>
        <div className="footer__social--wrapper">
          {socials.map((social, index) => (
            <a href={social.link} key={index}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
