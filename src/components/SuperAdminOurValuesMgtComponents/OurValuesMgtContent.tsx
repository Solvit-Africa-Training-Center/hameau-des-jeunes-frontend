import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const OurValuesMgtContent = () => {
  return (
    <section className="flex items-center justify-center md:mx-0 mx-3 mt-8">
      <Card className="p-3 md:w-3xl w-2xs">
        <CardTitle className="text-xl">Our Values Data</CardTitle>
        <CardContent>
          <form action="">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input id="title" placeholder="Enter the title" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea id="description" placeholder="Enter text" required />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
