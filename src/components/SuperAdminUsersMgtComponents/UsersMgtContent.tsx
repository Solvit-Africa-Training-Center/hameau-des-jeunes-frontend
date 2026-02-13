import { Card } from "../ui/card";

import { UsersMgtStatsCards } from "./UsersMgtStatsCards";
import { Button } from "../ui/button";
import { FiUserPlus } from "react-icons/fi";
import { UsersMgtTable } from "./UsersMgtTable";

export const UsersMgtContent = () => {
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:gap-96">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">User Management</h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Manage program administrators and system access.
            </h1>
          </div>

          <Button className="w-fit bg-[#0F3D2E]">
            <div className="flex items-center gap-2">
              <FiUserPlus size={20} />
              <h1>Add New Admin</h1>
            </div>
          </Button>
        </div>
        <UsersMgtStatsCards />
        <Card className="mt-5">
          <UsersMgtTable />
        </Card>
      </section>
    </>
  );
};
