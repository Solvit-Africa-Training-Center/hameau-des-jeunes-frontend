import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const TeamMgtContent = () => {
  return (
    <section className="flex items-center justify-center md:mx-0 mx-5 mt-8">
      <Card className="p-5 md:w-3xl w-2xs">
        <CardTitle className="text-xl">Team Data</CardTitle>
        <CardContent>
          <form action="">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="full_name">Full name</FieldLabel>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Enter full name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="position">Position</FieldLabel>
                <Textarea
                  id="position"
                  placeholder="Enter the employee's position"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
                <Input
                  id="linkedin"
                  type="text"
                  placeholder="Enter employee's linkedin profile"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="profile_image">Profile image</FieldLabel>
                <Input id="profile_image" type="file" required />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
