import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const CompanyContactsMgtContent = () => {
  return (
    <section className="flex items-center justify-center md:mx-0 mx-5 mt-8">
      <Card className="p-5 md:w-3xl w-2xs">
        <CardTitle className="text-xl">Company Contact Data</CardTitle>
        <CardContent>
          <form action="">
            <FieldGroup>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                    <Input
                      id="phone_number"
                      type="text"
                      placeholder="+250 785 954 785"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="start_day">Start Day</FieldLabel>
                    <Input
                      id="start_day"
                      type="date"
                      placeholder="01/01/2026"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="end_day">End Day</FieldLabel>
                    <Input
                      id="end_day"
                      type="date"
                      placeholder="01/04/2029"
                      required
                    />
                  </Field>
                </div>

                <div className="space-y-3">
                  <Field>
                    <FieldLabel htmlFor="address">Address</FieldLabel>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Eeastern Provice, Rwamagana"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="close_days">Closed days</FieldLabel>
                    <Input id="closed_days" type="text" placeholder="" />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="time_open">Time open</FieldLabel>
                    <Input
                      id="time_open"
                      type="text"
                      placeholder="7 am"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="time_close">Time close</FieldLabel>
                    <Input
                      id="time_close"
                      type="text"
                      placeholder="5 pm"
                      required
                    />
                  </Field>
                </div>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
