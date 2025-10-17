import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Address from "./Address";
import Form from "./Form";
import SocialMedia from "../common/socialMedia/SocialMedia";

const iconMap = {
  address: faLocationDot,
  "my email": faEnvelope,
  "call me now": faPhone,
  facebook: faFacebookF,
  instagram: faInstagram,
  linkedin: faLinkedin,
};

const Contact = ({ data }) => {
  return (
    <div className="relative -bottom-15 -mt-15 z-10 px-2">
      <div
        className="content p-4 md:p-10 lg:p-22 bg-white rounded-2xl shadow-[0px_0px_90px_9px_rgba(0,_0,_0,_0.1)]"
        id="contact"
      >
        <div className="flex flex-col-reverse lg:gap-5 xl:gap-25.75 lg:flex-row justify-between">
          <div>
            <div>
              <p className="text-[35px] max-lg:hidden font-semibold text-nowrap text-[#132238]">
                {data.title}
              </p>
              <p className="text-[12px] xs:text-[14px] sm:text-lg md:text-lg max-lg:text-center pt-4 font-normal text-soft-dark">
                {data.description}
              </p>
            </div>
            <div className="my-8.75 sm:max-lg:flex justify-between items-center">
              {data.details
                .filter((item) =>
                  ["address", "my email", "call me now"].includes(
                    item.name.toLowerCase().replace(":", "")
                  )
                )
                .map((item, index) => {
                  const key = item.name.replace(":", "").toLowerCase();
                  const addressItem = {
                    title: item.name.replace(":", ""),
                    description: item.description,
                    icon: iconMap[key] || faLocationDot,
                  };

                  return <Address item={addressItem} key={index} />;
                })}
            </div>
            <div className="w-full max-lg:text-center max-md:mb-4">
              <SocialMedia
                links={data.details
                  // ambil hanya social media
                  .filter((item) =>
                    ["facebook", "instagram", "linkedin"].includes(
                      item.name.toLowerCase().replace(":", "")
                    )
                  )
                  // ubah field description → value
                  .map((item) => ({
                    name: item.name.replace(":", ""),
                    value: item.description,
                  }))}
              />
            </div>
          </div>
          <div className="w-full overflow-y-scroll py-6.5">
            <p className="text-xl mb-2 xs:text-2xl sm:text-2xl md:text-[38px] font-semibold text-[#132238] lg:hidden text-center">
              Let’s discuss your Project
            </p>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
