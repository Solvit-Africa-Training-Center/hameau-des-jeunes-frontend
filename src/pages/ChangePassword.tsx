import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  useChangePasswordMutation,
  useConfirmPasswordResetMutation,
} from "@/store/api/authApi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PiPasswordDuotone } from "react-icons/pi";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.new_password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword(form).unwrap();
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (err: any) {
      console.error("Failed to change password:", err);
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <>
      <section className="grid grid-cols-1 place-items-center justify-items-center px-16 py-48 md:px-96 md:py-1">
        <PiPasswordDuotone size={52} />

        <div className="space-y-3 mt-5">
          <h1 className="text-3xl font-bold text-[#0F3D2E] text-center">
            Change your password
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Enter your old password and your new password to change it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-2 mt-5"
        >
          <Field className="w-full">
            <FieldLabel htmlFor="old_password">Old password</FieldLabel>
            <div className="relative">
              <Input
                className="rounded-2xl pr-10"
                id="old_password"
                type={showOldPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.old_password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </Field>

          <Field className="w-full">
            <FieldLabel htmlFor="new_password">New password</FieldLabel>
            <div className="relative">
              <Input
                className="rounded-2xl pr-10"
                id="new_password"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.new_password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </Field>

          <Field className="w-full">
            <FieldLabel htmlFor="confirm_password">Confirm password</FieldLabel>
            <div className="relative">
              <Input
                className="rounded-2xl pr-10"
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirm_password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </Field>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#0F3D2E] text-button-yellow rounded-2xl md:px-66 px-42 mt-2 w-full"
          >
            {isLoading ? "Changing..." : "Change password"}
          </Button>
        </form>

        <div
          className="flex items-center justify-center mt-2 hover:font-bold cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <MdKeyboardArrowLeft size={20} />
          <span>Back to Login</span>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mt-3">
            {(error as any)?.data?.message || "Request failed"}
          </p>
        )}
      </section>
    </>
  );
};
