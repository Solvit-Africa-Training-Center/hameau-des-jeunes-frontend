import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export const GetInTouch: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+250',
    phone: '',
    message: '',
  });

  const countryCodes = [
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+250', country: 'Rwanda' },
    { code: '+254', country: 'Kenya' },
    { code: '+255', country: 'Tanzania' },
    { code: '+256', country: 'Uganda' },
    { code: '+27', country: 'South Africa' },
    { code: '+234', country: 'Nigeria' },
    { code: '+33', country: 'France' },
    { code: '+49', country: 'Germany' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
              Need to get in touch with us? Either fill out the form with your inquiry or find the contact details below.
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                  <Mail className="h-5 w-5 text-[#4A90E2] md:h-6 md:w-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">Email</h4>
                  <p className="text-xs text-gray-600 sm:text-sm">Our friendly team is here to help.</p>
                  <a href="mailto:humurainfo@humura.org.rw" className="text-xs text-[#4A90E2] hover:underline sm:text-sm">
                    humurainfo@humura.org.rw
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                  <Phone className="h-5 w-5 text-[#4A90E2] md:h-6 md:w-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">Phone</h4>
                  <p className="text-xs text-gray-600 sm:text-sm">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+250788244161" className="text-xs text-[#4A90E2] hover:underline sm:text-sm">
                    +250 788 244 161
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                  <Clock className="h-5 w-5 text-[#4A90E2] md:h-6 md:w-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">Office Hours</h4>
                  <p className="text-xs text-gray-600 sm:text-sm">Monday - Friday: 8am to 5pm</p>
                  <p className="text-xs text-gray-600 sm:text-sm">Saturday - Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 md:p-3">
                  <MapPin className="h-5 w-5 text-[#4A90E2] md:h-6 md:w-6" />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">Address</h4>
                  <p className="text-xs text-gray-600 sm:text-sm">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl md:mb-6">
              Send us a message
            </h3>
            <p className="mb-6 text-sm text-gray-600 sm:text-base md:mb-8">
              Fill in the form and we'll get back to you as quickly as possible. Our team is ready to help with your questions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] md:px-4"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] md:px-4"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] md:px-4"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm">
                  Phone
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] md:px-3"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] md:px-4"
                    placeholder="788 244 161"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] md:px-4"
                  placeholder="Leave us a message..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#1B4332] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#15362a] sm:px-8 sm:py-3 sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};