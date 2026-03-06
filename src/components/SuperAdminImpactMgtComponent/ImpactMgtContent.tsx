import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const ImpactMgtContent = () => {
  return (
    <section className="flex items-center justify-center md:mx-0 mx-5 mt-8">
      <Card className="p-5 md:w-3xl w-2xs">
        <CardTitle className="text-xl">Impact data</CardTitle>
        <CardContent>
          <form action="">
            <FieldGroup>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <Field>
                    <FieldLabel htmlFor="children_supported">
                      Children supported
                    </FieldLabel>
                    <Input
                      id="children_supported"
                      type="number"
                      placeholder="500"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="years_in_service">
                      Years in Service
                    </FieldLabel>
                    <Input
                      id="years_in_service"
                      type="number"
                      placeholder="15"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="families_strengthened">
                      Families strengthened
                    </FieldLabel>
                    <Input
                      id="families_strengthened"
                      type="number"
                      placeholder="20"
                      required
                    />
                  </Field>
                </div>

                <div className="space-y-3">
                  <Field>
                    <FieldLabel htmlFor="school_enrollment">
                      School enrollment
                    </FieldLabel>
                    <Input
                      id="school_enrollment"
                      type="number"
                      placeholder="500"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="youths_trained">
                      Youths trained
                    </FieldLabel>
                    <Input id="youths_trained" type="number" placeholder="15" />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="success_rate">Success rate</FieldLabel>
                    <Input
                      id="success_rate"
                      type="number"
                      placeholder="20"
                      required
                    />
                  </Field>
                </div>
              </div>

              <Field>
                <FieldLabel htmlFor="commitment_to_impact">
                  Commitment to impact
                </FieldLabel>
                <Input
                  id="commitment_to_impact"
                  type="number"
                  placeholder="85"
                  required
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
