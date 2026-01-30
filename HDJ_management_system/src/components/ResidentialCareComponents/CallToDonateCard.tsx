import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";

export const CallToDonate = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white px-6 py-14 md:px-16 lg:px-24 space-y-10">
      <Card className="rounded-xl bg-[#0F3D2E] py-10 space-y-8">
        <div className="text-center space-y-1">
          <CardTitle className="text-2xl text-white font-bold">
            Help Us Keep Families together
          </CardTitle>
          <CardDescription className="text-center text-white font-light">
            Your support enables vulnerable families to stay together, children
            to remain in <br /> school, and communities to build lasting
            resilience. Every contribution makes <br /> a real difference.
          </CardDescription>
        </div>
        <CardFooter className="flex items-center justify-center gap-3 ">
          <div className="flex gap-5">
            <Button
              onClick={() => navigate("/donate")}
              className="bg-button-yellow rounded-xl text-[#0F3D2E]"
            >
              Donate This Program
            </Button>
            <Button
              variant="outline"
              className="border border-xl bg-transparent border-white text-white rounded-xl hover:bg-white hover:text-[#0F3D2E]"
            >
              Learn More
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
