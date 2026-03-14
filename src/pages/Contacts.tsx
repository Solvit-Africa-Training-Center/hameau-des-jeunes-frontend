import { Footer } from "@/components/Footer";
import { TopNavBar } from "@/components/TopNavBar";
import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send } from "lucide-react";
import map from "@/assets/Map.png";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  useGetCompanyInfoQuery,
  useGetWorkingDaysQuery,
} from "@/store/api/companyInfoApi";
import { useCreateMessageMutation } from '../store/api/message';

export const Contacts = () => {
  const [createMessage, { isLoading: isCreating }] = useCreateMessageMutation();
  const { data: companyList = [] } = useGetCompanyInfoQuery();
  const { data: workingDays = [] } = useGetWorkingDaysQuery();
  const info = companyList[0] ?? null;

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      message: '',
    };

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
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
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      message: '',
    });
  };
const handlePhoneChange = (value: string | undefined) => {
  setFormData({
    ...formData,
    phone_number: value || "",
  });
};
  // Format time

  const formatTime = (time: string) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavBar />
      <main>
        {/* Get in Touch Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center text-[#0f3d2e] mb-12">
            Get in Touch
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              {/* Section Header */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Info
              </h2>
              <p className="text-gray-600 mb-8">
                Reach out through any of these channels. and our team will get
                back to you as soon as possible
              </p>

              {/* Cards */}
              <div className="flex flex-col gap-6 max-w-md mx-auto lg:mx-0">
                {/* Email Card */}
                <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email
                    </h3>
                  </div>

                  <p className="text-gray-600">
                    Our friendly team is here to help
                  </p>
                  <p className="text-[#4A90E2]">{info?.company_email}</p>
                </div>

                {/* Phone Card */}
                <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Phone
                    </h3>
                  </div>

                  <p className="text-gray-600">
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
                  </p>
                  <p className="text-[#4A90E2]">{info?.company_phone}</p>
                </div>

                {/* Office Hours Card */}
                <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Office Hours
                    </h3>
                  </div>
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

                {/* Address Card */}
                <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Address
                    </h3>
                  </div>
                  {info?.company_address ? (
                    <p className="text-gray-600">{info.company_address}</p>
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

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>

                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 border ${
                      errors.first_name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
                  )}
                  </div>

                         <div>

                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 border ${
                      errors.last_name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
                  )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>

                   <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="RW"
                    name="phone_number"
                    value={formData.phone_number}
                    className="w-full px-4 py-3 border rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] md:px-4"
                    onChange={handlePhoneChange}
                  />
               
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={4}
                    className={`w-full px-4 py-3 border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                {(isCreating)?<button disabled className="w-full bg-[#0f3d2e] hover:bg-[#0f3d2e68] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2">loading...</button>:<button
                  type="submit"
                  className="w-full bg-[#0f3d2e] hover:bg-[#0f3d2e68] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>}
              </form>
            </div>
          </div>
        </div>

        {/* Visit Us Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0f3d2e] mb-2">
                Visit Us
              </h2>
              <p className="text-gray-600">
                Located in Rwamagana District, Eastern Province, Rwanda
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={map}
                alt="Kigali Map"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-white" />
              </div>

              <a
                href="https://www.google.com/maps/place/Kigali"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0f3d2e] text-white px-8 py-3 rounded-lg shadow"
              >
                Open in Google Map
              </a>
            </div>
          </div>

          {/* Visiting Our Facilities Section */}
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#0f3d2e] mb-4">
                  Visiting Our Facilities
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  We welcome visitors to our state-of-the-art facilities.
                  Whether you're interested in a tour, a consultation, or just
                  want to learn more about what we do, we'd love to show you
                  around. Please schedule your visit in advance to ensure we can
                  provide you with the best experience.
                </p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
                  <div className="w-16 h-16 bg-[#c6dafa] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-[#3d74c7]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Schedule a Visit
                  </h3>
                  <p className="text-gray-600">call us arrange a tour</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
                  <div className="w-16 h-16 bg-[#c6dafa] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-[#3d74c7]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Media Inquiries
                  </h3>
                  <p className="text-gray-600">
                    Contact our communications team.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
                  <div className="w-16 h-16 bg-[#c6dafa] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-[#3d74c7]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Partnership Proposals.
                  </h3>
                  <p className="text-gray-600">
                    Send us your collaboration ideas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
