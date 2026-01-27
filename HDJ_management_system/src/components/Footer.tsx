import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import hdj_logo_white from "@/assets/hdj_logo_white.png";

import { IoLocationOutline } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { LuPhone } from "react-icons/lu";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-[#0f3d2e] text-white pt-12 pb-6 sm:pt-16 sm:pb-8">
      <div className="container px-15">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12 sm:mb-16">
          <div>
            <div className="grid grid-cols-2 ">
              <img src={hdj_logo_white} alt="hameau_des_jeunes_logo" />

              <div className="mt-5">
                <h1 className="font-sans font-bold text-base ">
                  Hameau des Jeunes
                </h1>
                <h1 className="font-sans font-light">Saint Kizito</h1>
              </div>
            </div>

            <p className="mt-3 text-white mb-4 text-sm sm:text-sm">
              Building hope and opportunity for vulnerable children and youth in
              Rwanda through care, education, and family support.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <ScrollLink
                  to="/"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  Home
                </ScrollLink>
              </li>
              <li>
                <RouterLink
                  to="/about"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  About us
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/impact"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  Impact
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/programs"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  Programs
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/internships"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  International Internships
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/gallery"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  Gallery
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/contact"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  Contact
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <div className="flex gap-3">
                  <IoLocationOutline className="text-button-yellow" />
                  <h2 className="text-sm font-light">
                    Rwamagana District, Rwanda
                  </h2>
                </div>
              </li>
              <li>
                <div className="flex gap-3">
                  <CgMail className="text-button-yellow" />
                  <h2 className="text-sm font-light">
                    info@hameaudesjeunes.org
                  </h2>
                </div>
              </li>
              <li>
                <div className="flex gap-3">
                  <LuPhone className="text-button-yellow" />
                  <h2 className="text-sm font-light">+250 796 686 184</h2>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2">
              <li>
                <RouterLink
                  to="/donate"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  Donate
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/partnerWithUs"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  Partner with Us
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/volunteer"
                  className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
                >
                  Volunteer
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <FaFacebook />
              <FaLinkedin />
              <FaXTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>

        <div className="flex gap-7 justify-center">
          <RouterLink
            to="/volunteer"
            className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
          >
            Terms & Conditions
          </RouterLink>
          <RouterLink
            to="/volunteer"
            className="text-white font-light hover:font-bold transition-colors cursor-pointer text-sm sm:text-sm"
          >
            Privacy Policy
          </RouterLink>
        </div>

        <div className="flex flex-col md:flex-row  items-center justify-center">
          <p className="my-7 text-sm font-light">
            Copyright &copy; {new Date().getFullYear()} by Hameau Des Jeunes St.
            Kizito Rwamagana, Musha Rwanda.
          </p>
        </div>
      </div>
    </footer>
  );
};
