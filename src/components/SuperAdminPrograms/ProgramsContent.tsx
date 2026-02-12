import { Button } from "../ui/button";

export const ProgramsContent = () => {
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:justify-items-between">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">Program Management</h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Manage all humanitarian initiatives and their beneficiaries.
            </h1>
          </div>

          {/* Button Picker */}

          <Button className="md:mt-0 mt-3 gap-1 bg-[#0F3D2E] text-sm font-light rounded-lg">
            <h1>Launch New Program</h1>
          </Button>
        </div>
      </section>
    </>
  );
};
