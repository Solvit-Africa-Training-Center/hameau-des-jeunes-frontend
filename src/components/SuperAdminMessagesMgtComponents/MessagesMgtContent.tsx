import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

export const MessagesMgtContent = () => {
  return (
    <section className="flex items-center justify-center md:mx-0 mx-5 mt-8">
      <Card className="p-5 md:w-3xl w-2xs">
        <CardTitle className="text-xl">Message data</CardTitle>
        <CardContent>
          <form action="">
            <FieldGroup>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <Field>
                    <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                    <Input
                      id="first_name"
                      type="text"
                      placeholder="Jack"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                    <Input id="last_name" type="text" placeholder="Cyusa" />
                  </Field>
                </div>

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
                      placeholder="+250 784 258 945"
                    />
                  </Field>
                </div>
              </div>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea id="message" placeholder="Hello Sir" required />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
