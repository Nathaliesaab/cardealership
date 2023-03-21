import { useLocation } from "react-router-dom";
import { socials } from "./footer_socials";
export const Footer = () => {
  const location = useLocation();
  return (
    location.pathname !== "/" && (
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
    )
  );
};
