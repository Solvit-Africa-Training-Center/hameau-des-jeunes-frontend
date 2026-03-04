import { useState } from "react";
import { Button } from "../ui/button";
import { FiUserPlus } from "react-icons/fi";
import { AiFillPicture } from "react-icons/ai";

export const WebsiteMgtContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:gap-96">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">Website Management</h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Manage the Hameau des Jeunes website.
            </h1>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 md:mx-0 md:grid-cols-2 mt-8">
          <Button
            className="w-fit bg-[#0F3D2E]"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center gap-2">
              <FiUserPlus size={20} />
              <h1>Add New Employee</h1>
            </div>
          </Button>

          <Button
            className="w-fit bg-[#0F3D2E]"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center gap-2">
              <AiFillPicture size={20} />
              <h1>Add a picture in the gallery</h1>
            </div>
          </Button>
        </div>
      </section>
    </>
  );
};
