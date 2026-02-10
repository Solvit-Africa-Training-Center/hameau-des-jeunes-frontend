import { Footer } from "@/components/Footer";
import { TopNavBar } from "@/components/TopNavBar";
import React, { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send } from "lucide-react";
import map from "@/assets/Map.png";

export const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
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
                Reach out through any of these channels. and our team will get back to you as soon as possible
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

                  <p className="text-gray-600">Our friendly team is here to help</p>
                  <p className="text-gray-600">mwambutsadaryce@gmail.com</p>
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

                  <p className="text-gray-600">Mon-Fri from 8am to 5pm</p>
                  <p className="text-gray-600">+250 781886927</p>
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

                  <p className="text-gray-600">Mon-Fri from 8am to 5pm</p>
                  <p className="text-gray-600">Saturday 9am-1pm</p>
                  <p className="text-gray-600">Sunday closed</p>
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

                  <p className="text-gray-600">Rwamagana District</p>
                  <p className="text-gray-600">Eaastern Province</p>
                  <p className="text-gray-600">Rwanda</p>
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
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
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

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={`w-full px-4 py-3 border ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+250 788 123 456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
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
                <button
                  type="submit"
                  className="w-full bg-[#0f3d2e] hover:bg-[#0f3d2e68] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
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
                  <p className="text-gray-600">
                    call us arrange a tour
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
                  <div className="w-16 h-16 bg-[#c6dafa] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-[#3d74c7]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Media Inquiries
                  </h3>
                  <p className="text-gray-600">Contact our communications team.</p>
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
