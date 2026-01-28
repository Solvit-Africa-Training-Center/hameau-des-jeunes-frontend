import { TopNavBar } from "@/components/TopNavBar";
import programImage from "@/assets/program_image.jpg";
import residentialCareImg from "@/assets/residential_care_img.png";
import famReunited from "@/assets/fam_reunited_img.png";
import ifasheTugufasheImg from "@/assets/ifashe_tugufashe_img.png";
import edSupport from "@/assets/ed_support_img.png";
import { GoPeople } from "react-icons/go";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

const programs = [
  {
    id: 1,
    title: "Residential Care Program",
    subtitle: "Safe Haven for Vulnerable Children",
    description:
      "Safe, family-style homes providing protection, stability, and love for vulnerable children",
    stastics: "120+ children currently in care",
    image: residentialCareImg,
    readMoreBtn: "Read More >>",
  },
  {
    id: 2,
    title: "Education Support Program",
    subtitle: "Empowering Through Learning",
    description:
      "Comprehensive educational support ensuring every child has access to quality learning",
    stastics: "300+ students supported annually",
    image: edSupport,
    readMoreBtn: "Read More >>",
  },
  {
    id: 3,
    title: "85+ families reunited successfully",
    subtitle: "Rebuilding Family Bonds",
    description:
      "Strengthening families and communities to provide sustainable care for children",
    stastics: "120+ children currently in care",
    image: famReunited,
    readMoreBtn: "Read More >>",
  },
  {
    id: 4,
    title: "Ifashe Tugufashe — Family Support",
    subtitle: "Empowering Through Learning",
    description:
      "Family-strengthening program that keeps vulnerable children at home and out of the streets",
    stastics: "150+ families supported annually",
    image: ifasheTugufasheImg,
    readMoreBtn: "Read More >>",
  },
];

export const Programs = () => {
  return (
    <>
      <TopNavBar />
      <header
        className="relative h-64 sm:h-80 md:h-96 lg:h-[17rem] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.6)),url(${programImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-2xl text-button-yellow sm:text-5xl md:text-5xl lg:text-5xl font-bold mb-2 leading-tight">
            Programs
          </h1>
          <p className="justify-center text-white md:text-2xl  sm:text-sm">
            Measurable results, transformed lives, and sustainable change in
            communities across Rwanda.
          </p>
        </div>
      </header>

      {/* Programs section */}

      <section className="bg-[#FAFAFA] py-10">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl mb-5 mx-5 text-[#0F3D2E]">
            Transforming Lives Through Comprehensive Care
          </h1>
          <h1 className="text-base text-center mx-5">
            Our holistic approach addresses the unique needs of each child, from
            immediate <br /> protection to long-term empowerment, ensuring
            sustainable positive outcomes for <br /> vulnerable children and
            their families.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-6 px-5 py-10 max-w-5xl mx-auto">
          {programs.map((item) => {
            return (
              <Card
                key={item.id}
                className="transition-transform duration-300 hover:scale-105 bg-white drop-shadow-gray-100 rounded-xl overflow-hidden md:w-[470px]"
              >
                <img
                  src={item.image}
                  alt="program_image"
                  className="block w-full  object-fit"
                />

                <CardHeader>
                  <CardTitle className="font-bold mx-3 text-xl">
                    {item.title}
                  </CardTitle>

                  <span className="mx-3 text-sm text-button-yellow">
                    {item.subtitle}
                  </span>

                  <CardDescription className="text-sm mx-3 my-3 text-black text-justify">
                    {item.description}
                  </CardDescription>

                  <div className="flex items-center">
                    <div className="bg-button-yellow rounded-sm w-10 h-10 mx-3 flex items-center justify-center">
                      <GoPeople size={20} className="text-white" />
                    </div>
                    <span className="text-sm text-[#0F3D2E]">
                      {item.stastics}
                    </span>
                  </div>
                </CardHeader>

                <Button className="bg-[#0F3D2E] text-white mx-6 mb-4 rounded-lg">
                  {item.readMoreBtn}
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Support our programs section */}

      <div className="text-center">
        <h1 className="font-bold text-2xl md:text-3xl mb-5 mx-5 text-[#0F3D2E]">
          Support our Programs
        </h1>
        <h1 className="text-base text-center mx-5">
          Your contribution directly supports these life-changing programs,
          helping us provide <br /> comprehensive care and create lasting impact
          in the lives of vulnerable children and their families.
        </h1>
      </div>

      <div className="py-10 flex items-center justify-center gap-5">
        <Button className="bg-[#0F3D2E] text-white text-center rounded-lg">
          Donate to Programs
        </Button>
        <Button
          variant="outline"
          className="border-lg border-[#0F3D2E] text-[#0F3D2E]"
        >
          Partner with us
        </Button>
      </div>

      <Footer />
    </>
  );
};
