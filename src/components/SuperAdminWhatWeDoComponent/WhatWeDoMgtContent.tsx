import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const WhatWeDoMgtContent = () => {
  return (
    <section className="flex items-center justify-center md:mx-0 mx-3 mt-8">
      <Card className="p-5 md:w-3xl w-2xs">
        <CardTitle className="text-xl">What We Do data</CardTitle>
        <CardContent>
          <form action="">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title of the program</FieldLabel>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter the title of the program"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="title">Icon of the program</FieldLabel>
                <Input
                  id="program-icon"
                  placeholder="Enter the name of the program icon"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">
                  Description of the program
                </FieldLabel>
                <Textarea
                  id="program-description"
                  placeholder="Enter the description of the program"
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
