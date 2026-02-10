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
import { useLoginMutation } from "@/store/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const res = await login({
                  email,
                  password,
                }).unwrap();

                // Save auth info
                localStorage.setItem("accessToken", res.access);
                localStorage.setItem("refreshToken", res.refresh);
                localStorage.setItem("user", JSON.stringify(res.user));

                toast.success("Logged in successfully!");

                const loggedInUserString = localStorage.getItem("user");

                if (!loggedInUserString) {
                  // user not found in localStorage
                  console.error("No user in localStorage");
                  return;
                }

                const loggedInUser = JSON.parse(loggedInUserString);

                switch (loggedInUser.role) {
                  case "SYSTEM_ADMIN":
                    navigate("/superAdminDashboard");
                    break;

                  case "RESIDENTIAL_MANAGER":
                    navigate("/residentialCareDashboard");
                    break;

                  case "INTERNSHIPS_MANAGER":
                    navigate("/internshipsDashboard");
                    break;

                  case "IFASHE_MANAGER":
                    navigate("/ifasheTugufasheDashboard");
                    break;

                  default:
                    console.warn("Unknown role:", loggedInUser.role);
                }
              } catch (err) {
                console.error("Login failed", err);
              }
            }}
          >
            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/resetPassword"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Logging..." : "Login"}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/adminSignup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {error && (
        <p className="text-sm text-red-500 text-center">
          {(error as any)?.data?.message || "Login failed"}
        </p>
      )}
    </div>
  );
}
