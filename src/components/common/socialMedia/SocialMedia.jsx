import {
  faBehance,
  faDribbble,
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socialIcons = [
  { icon: faFacebookF, link: "#!" },
  // { icon: faDribbble, link: "#!" },
  { icon: faInstagram, link: "#!" },
  { icon: faLinkedin, link: "#!" },
  // { icon: faBehance, link: "#!" },
];

const iconMap = {
  facebook: faFacebookF,
  instagram: faInstagram,
  linkedin: faLinkedin,
  dribbble: faDribbble,
  behance: faBehance,
};

const SocialMedia = ({ links = [] }) => {
  return (
    <>
      {links
        // ambil hanya yang punya icon dikenal
        .filter((item) => iconMap[item.name.toLowerCase()])
        .map((item, index) => (
          <a
            key={index}
            href={
              item.value.startsWith("http")
                ? item.value
                : `https://${item.value}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-picto-primary hover:bg-picto-primary p-2 pt-3 xs:p-2.5 xs:pt-3.75 sm:pt-4 md:pt-5 sm:p-3 md:p-3.75 hover:text-white rounded-md"
          >
            <FontAwesomeIcon
              icon={iconMap[item.name.toLowerCase()]}
              className="text-xl w-4.5 aspect-square"
            />
          </a>
        ))}
    </>
  );
};

export default SocialMedia;
