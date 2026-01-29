import childProtectionOfficer from "@/assets/child_protection_officer.png";
import comOutreachManager from "@/assets/com_outreach_manager.png";
import executiveCoordo from "@/assets/executive_coordo.png";
import executiveDirector from "@/assets/executive_director.png";
import { MdNavigateNext } from "react-icons/md";
import { Button } from "../ui/button";

export const MeetOurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jean-Claude Niyonzima",
      position: "Executive Coordinator",
      image: executiveCoordo,
    },

    {
      id: 2,
      name: "Marie Uwase",
      position: "Executive Director",
      image: executiveDirector,
    },

    {
      id: 3,
      name: "Grace Mukamana",
      position: "Child Protection Officer",
      image: childProtectionOfficer,
    },

    {
      id: 4,
      name: "PAtrick Habimana",
      position: "Community Outreach Manager",
      image: comOutreachManager,
    },
  ];
  return (
    <section className="py-10">
      <div className="text-center">
        <h1 className="font-bold text-2xl md:text-5xl mb-5 text-[#0F3D2E]">
          Meet Our Team
        </h1>
        <h1 className="text-base text-center">
          Dedicated caregivers, professionals, and volunteers working together
          for child protection and family empowerment.
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6 py-6">
        {teamMembers.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="rounded-15 overflow-hidden">
              <img
                src={item.image}
                alt="team_member_image"
                className="w-56 h-fit object-cover"
              />
            </div>

            <h1 className="font-bold mt-2">{item.name}</h1>
            <h1 className="text-sm text-gray-600">{item.position}</h1>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="bg-white">
          <div className="flex gap-3 px-3 py-3 items-center justify-center">
            <h1 className="text-black">View All</h1>
            <MdNavigateNext size={20} className="text-button-yellow" />
          </div>
        </Button>
      </div>
    </section>
  );
};
