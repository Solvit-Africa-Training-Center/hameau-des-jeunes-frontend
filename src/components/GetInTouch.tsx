import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useCreateMessageMutation } from "../store/api/message";
import {
  useGetCompanyInfoQuery,
  useGetWorkingDaysQuery,
} from "@/store/api/companyInfoApi";

export const GetInTouch: React.FC = () => {
  const [createMessage, { isLoading: isCreating }] = useCreateMessageMutation();
  const { data: companyList = [] } = useGetCompanyInfoQuery();
  const { data: workingDays = [] } = useGetWorkingDaysQuery();
  const info = companyList[0] ?? null;

  // Format time

  const formatTime = (time: string) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
    };

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission here
      alert("Message sent successfully!");
    }

    createMessage(formData);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData({
      ...formData,
      phone_number: value || "",
    });
  };
  return (
    <section className="bg-white py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Get in Touch
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl md:mb-6">
              Contact Info
            </h3>
            <p className="mb-6 text-sm text-gray-600 sm:text-base md:mb-8">
              Need to get in touch with us? Either fill out the form with your
              inquiry or find the contact details below.
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                  <Mail className="h-5 w-5 text-[#4A90E2] md:h-6 md:w-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
                    Email
                  </h4>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Our friendly team is here to help.
                  </p>
                  <a
                    href="mailto:humurainfo@humura.org.rw"
                    className="text-xs text-[#4A90E2] hover:underline sm:text-sm"
                  >
                    {info?.company_email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                  <Phone className="h-5 w-5 text-[#4A90E2] md:h-6 md:w-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
                    Phone
                  </h4>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Mon-Fri from 8am to 5pm.
                  </p>
                  <a
                    href="tel:+250788244161"
                    className="text-xs text-[#4A90E2] hover:underline sm:text-sm"
                  >
                    {info?.company_phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                  <Clock className="h-5 w-5 text-[#4A90E2] md:h-6 md:w-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
                    Office Hours
                  </h4>
                  {workingDays.length > 0 ? (
                    workingDays.map((wd) => (
                      <p key={wd.id} className="text-gray-600">
                        {wd.close_days
                          ? `${wd.day}: Closed`
                          : `${wd.day}: ${formatTime(wd.start_hours)} - ${formatTime(wd.end_hours)}`}
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="text-gray-600">Mon-Fri ....</p>
                      <p className="text-gray-600">Saturday ....</p>
                      <p className="text-gray-600">Sunday ....</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                  <MapPin className="h-5 w-5 text-[#4A90E2] md:h-6 md:w-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
                    Address
                  </h4>
                  {info?.company_address ? (
                    <p className="text-gray-600">{info?.company_address}</p>
                  ) : (
                    <>
                      <p className="text-gray-600">Rwamagana District</p>
                      <p className="text-gray-600">Eastern Province</p>
                      <p className="text-gray-600">Rwanda</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl md:mb-6">
              Send us a message
            </h3>
            <p className="mb-6 text-sm text-gray-600 sm:text-base md:mb-8">
              Fill in the form and we'll get back to you as quickly as possible.
              Our team is ready to help with your questions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="first_name"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.first_name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.last_name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm"
                >
                  Phone
                </label>
                <div className="flex gap-2">
                  <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="RW"
                    value={formData.phone_number}
                    className="w-full px-4 py-3 border rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] md:px-4"
                    onChange={(phone) => handlePhoneChange(phone)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Leave us a message..."
                  rows={5}
                  className={`w-full px-4 py-3 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>
              {isCreating ? (
                <button
                  disabled
                  value="Sending..."
                  className="w-full rounded-md bg-[#1B4332] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#15362a] sm:px-8 sm:py-3 sm:text-base"
                ></button>
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#1B4332] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#15362a] sm:px-8 sm:py-3 sm:text-base"
                >
                  Send Message
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
