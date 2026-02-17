import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRequestPasswordResetMutation } from "@/store/api/authApi";
import { KeyIcon } from "lucide-react";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [requestPasswordReset, { isLoading, error }] =
    useRequestPasswordResetMutation();

  const handleSubmit = async () => {
    try {
      await requestPasswordReset({ email }).unwrap();
      toast.success("Reset code sent to your email");
      localStorage.setItem("requestingEmail", email);
      navigate("/newPassword");
    } catch (err) {
      console.error("Failed to request reset:", JSON.stringify(err, null, 2));
      toast.error("Failed to request reset");
    }
  };
  return (
    <>
      <section className="grid grid-cols-1 place-items-center justify-items-center px-16 py-48 md:px-96 md:py-2">
        <KeyIcon size={52} />

        <div className="space-y-3 mt-8">
          <h1 className="text-3xl font-bold text-[#0F3D2E] text-center">
            Forgot your password?
          </h1>
          <h1 className="text-gray-400 text-sm">
            Enter your email so that we can send you the password reset code
          </h1>
        </div>

        <Field className="mt-24">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            className="rounded-2xl"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Button
          className="bg-[#0F3D2E] text-button-yellow rounded-2xl md:px-66 px-42 mt-5"
          onClick={handleSubmit}
        >
          {isLoading ? "Sending..." : "Send Email"}
        </Button>

        <div
          className="flex items-center justify-center mt-5 hover:font-bold cursor-pointer"
          onClick={() => navigate("/adminLogin")}
        >
          <MdKeyboardArrowLeft size={20} />
          <h1>Back to Login</h1>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {(error as any)?.data?.message || "Request failed"}
          </p>
        )}
      </section>
    </>
  );
};
