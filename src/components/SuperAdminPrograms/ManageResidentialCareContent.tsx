import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { GoPeople } from "react-icons/go";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";

const programDescriptionStats = [
  {
    id: 1,
    title: "Total Enrolled",
    icon: GoPeople,
    content: "120",
  },
  {
    id: 2,
    title: "Updates (7d)",
    icon: GoPeople,
    content: "12",
  },
];

const ressourceAllocationCard = [
  {
    id: 1,
    title: "Resource Allocation",
    description: "Monthly Budget",
    content: "45,000",
    percentage: "75",
  },
];

export const ManageResidentialCareContent = () => {
  return (
    <>
      <section className="bg-[#E7ECEA] w-full h-full  md:px-5 py-14">
        <div className="grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 md:gap-96">
          <div className="flex-col text-start">
            <h1 className="text-lg font-semibold">
              Residential Care + Health Post
            </h1>
            <h1 className="text-sm text-[#6B7A99] md:mt-0 mt-3">
              Led by Sister Bernadette
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1.5fr] mt-5">
          <div className="flex-col">
            <Card className="md:mx-0 mx-5">
              <CardTitle className="px-5">
                <h1 className=" text-lg font-semibold">Program Overview</h1>
              </CardTitle>
              <CardContent>
                <p className="text-sm font-normal text-gray-700">
                  The Residential Care program is the heart of Hameau des Jeunes
                  Saint Kizito. We provide 24/7 care for orphans and vulnerable
                  children. The integrated Health Post serves not only the
                  residents but also the surrounding community, offering primary
                  healthcare, vaccinations, and maternal support. Our mission is
                  to ensure every child feels at home and healthy.
                </p>
              </CardContent>
            </Card>

            {/* Resource Allocation card */}
            {ressourceAllocationCard.map((item) => (
              <Card key={item.id} className="md:mx-0 mx-5 mt-4 bg-[#0F3D2E]">
                <CardTitle className="px-5 text-white flex-col">
                  <h1 className="text-lg  font-semibold">{item.title}</h1>
                  <p className="text-sm font-normal text-[#E7ECEA80]">
                    {item.description}
                  </p>
                </CardTitle>
                <CardContent className="px-5">
                  <p className="text-xl font-bold text-button-yellow">
                    ${item.content} / month
                  </p>
                </CardContent>
                <CardFooter>
                  <Field className="w-full max-w-sm">
                    <FieldLabel htmlFor="progress-upload">
                      <span className="text-sm font-light text-[#E7ECEA80]">
                        Weekly Activity Flow
                      </span>
                      <span className="ml-auto text-white">
                        {item.percentage}%
                      </span>
                    </FieldLabel>
                    <Progress
                      id="progress-upload"
                      value={Number(item.percentage)}
                      className="h-2 bg-white/20 [&>div]:bg-[#F4B400] "
                    />
                  </Field>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Program description card */}
          <Card className="md:mx-0 mx-5 max-h-fit">
            <CardTitle className="px-5 text-lg font-semibold">
              Program Description
            </CardTitle>
            <div>
              <div className="grid grid-cols-1 mx-3">
                {programDescriptionStats.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className={`md:w-full  md:mx-0 px-3 py-4`}
                    >
                      {/* Header */}

                      <div className="flex items-center gap-3">
                        <div
                          className="
                  w-10 h-10 rounded-lg flex items-center justify-center
                    bg-[#EDF6FF] text-[#4DA3FF]"
                        >
                          <Icon size={20} />
                        </div>

                        <div className="flex-col text-start space-y-1">
                          <h1 className="text-xs sm:text-sm">{item.title}</h1>
                          {/* Main number */}
                          <h1>{item.content}</h1>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <CardFooter>
              <Button className="bg-[#0F3D2E] w-full text-white text-sm font-light">
                View Button
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
};
