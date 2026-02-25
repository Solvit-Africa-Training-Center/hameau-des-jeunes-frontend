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
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import hdj_logo_black from "@/assets/hdj_logo_black.png";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Card>
        <div className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <img
                src={hdj_logo_black}
                alt="hdj_logo"
                className="boject-cover"
              />
            </CardTitle>
            <CardDescription className="text-black">
              Welcome again !
            </CardDescription>
          </CardHeader>
        </div>

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
                    navigate("/InternshipsDashboard");
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
                    className="ml-auto inline-block text-[#0F3D2E] font-semibold text-sm underline-offset-4 hover:underline"
                  >
                    Want to reset your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#0F3D2E]"
                >
                  {isLoading ? "Logging..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  {/* Don&apos;t have an account? <a href="/adminSignup">Sign up</a> */}
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
