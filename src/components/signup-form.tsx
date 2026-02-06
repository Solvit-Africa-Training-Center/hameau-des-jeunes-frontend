import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useSignupMutation } from "@/store/api/authApi";
import { useNavigate } from "react-router-dom";

const roles = [
  { value: "SYSTEM_ADMIN", label: "System Admin" },
  { value: "RESIDENTIAL_MANAGER", label: "Residential Manager" },
  { value: "INTERNSHIPS_MANAGER", label: "Internships Manager" },
  { value: "IFASHE_MANAGER", label: "Ifashe Tugufashe Manager" },
];

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create a Manager account</CardTitle>
          <CardDescription>
            Enter their email below to create their account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const res = await signup({
                  first_name,
                  last_name,
                  email,
                  phone_number,
                  role,
                }).unwrap();

                // Save auth info
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));

                navigate("/dashboard");
              } catch (err) {
                console.error("Signup failed", err);
              }
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">First Name</FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Jean"
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Last Name</FieldLabel>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Cyusa"
                  required
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="+250 784 670 384"
                      required
                      value={phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Field>
                </Field>
                <Field>
                  <FieldLabel htmlFor="role">Role</FieldLabel>

                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>

                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldDescription>
                    Select the manager role for this account
                  </FieldDescription>
                </Field>

                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/adminLogin">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>

      {error && (
        <p className="text-sm text-red-500 text-center">
          {(error as any)?.data?.message || "Signup failed"}
        </p>
      )}
    </div>
  );
}
