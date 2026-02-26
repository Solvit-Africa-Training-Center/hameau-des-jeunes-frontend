import { Footer } from "@/components/Footer";
import { TopNavBar } from "@/components/TopNavBar";
import { useState } from "react";
import kid1 from "@/assets/kid1.jpg";
import kid2 from "@/assets/kid2.jpg";
import kid3 from "@/assets/kid3.jpg";
import kid4 from "@/assets/kid4.jpg";
import donate from "@/assets/donate.jpg";
import { Clock, Users, Lightbulb, X, Download, Check } from "lucide-react";

function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [senderName, setSenderName] = useState<string>("");
  const [sponsorshipAmount, setSponsorshipAmount] = useState<number | null>(
    null,
  );
  const [customSponsorAmount, setCustomSponsorAmount] = useState<string>("");

  type DonationAmount = {
    amount: number;
    label: string;
  };

  const donationAmounts: DonationAmount[] = [
    { amount: 25, label: "One-time gift" },
    { amount: 50, label: "School supplies" },
    { amount: 100, label: "Monthly support" },
    { amount: 250, label: "Family assistance" },
    { amount: 500, label: "Community impact" },
    { amount: 1000, label: "Transform lives" },
  ];

  type SupportItem = {
    label: string;
    amount: string;
  };

  type Child = {
    id: number;
    name: string;
    age: string;
    location: string;
    description: string;
    monthlySupport: string;
    image: string;
    supportBreakdown: SupportItem[];
  };

  const children: Child[] = [
    {
      id: 1,
      name: "Grace Uwimana",
      age: "8 years old",
      location: "Kigali, Rwanda",
      description:
        "Grace lost her parents in 2019 and came to our care when she was just 5 years old. She loves reading and dreams of becoming a doctor to help other children. Grace is currently in primary 3 and excels in mathematics and science.",
      monthlySupport: "$35",
      image: kid2,
      supportBreakdown: [
        { label: "School fees", amount: "$20 / month" },
        { label: "Meals", amount: "$10 / month" },
        { label: "Health care", amount: "$5 / month" },
      ],
    },
    {
      id: 2,
      name: "Emmanuel Nkusi",
      age: "12 years old",
      location: "Kigali, Rwanda",
      description:
        "Emmanuel is a bright student in primary 6 who dreams of becoming an engineer. He lost his father and his mother struggles to provide for the family. Emmanuel loves mathematics and building things with his hands.",
      monthlySupport: "$35",
      image: kid1,
      supportBreakdown: [
        { label: "School fees", amount: "$20 / month" },
        { label: "Meals", amount: "$10 / month" },
        { label: "Health care", amount: "$5 / month" },
      ],
    },
    {
      id: 3,
      name: "Ange Mukamana",
      age: "15 years old",
      location: "Kigali, Rwanda",
      description:
        "Ange is a determined secondary school student who excels in languages and literature. She dreams of becoming a journalist to tell stories that matter and give voice to those who need it most.",
      monthlySupport: "$35",
      image: kid3,
      supportBreakdown: [
        { label: "School fees", amount: "$20 / month" },
        { label: "Meals", amount: "$10 / month" },
        { label: "Health care", amount: "$5 / month" },
      ],
    },
    {
      id: 4,
      name: "Jean Claude Habimana",
      age: "10 years old",
      location: "Kigali, Rwanda",
      description:
        "Jean Claude lives with his elderly grandmother who struggles to provide for him. Through our program, he receives education, meals, and healthcare. He is a talented artist and loves drawing.",
      monthlySupport: "$35",
      image: kid4,
      supportBreakdown: [
        { label: "School fees", amount: "$20 / month" },
        { label: "Meals", amount: "$10 / month" },
        { label: "Health care", amount: "$5 / month" },
      ],
    },
  ];

  const supportWays = [
    {
      icon: Clock,
      title: "Volunteer your time",
      description:
        "Join our volunteer programs and directly contribute your skills and time to support children and families in our community",
      buttonText: "Learn More",
    },
    {
      icon: Lightbulb,
      title: "Spread Awareness",
      description:
        "Help us reach more people by sharing our mission on social media and within your community networks",
      buttonText: "Share Our Story",
    },
    {
      icon: Users,
      title: "Corporate partnership",
      description:
        "Partner with us through corporate social responsibility programs and employee engagement initiatives",
      buttonText: "partner with us",
    },
  ];

  const handleDonateClick = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!amount || amount <= 0) {
      alert("Please select or enter a donation amount");
      return;
    }
    setDonationAmount(amount);
    setShowDonateModal(true);
  };

  const handleSponsorClick = (child: Child) => {
    setSelectedChild(child);
    setSponsorshipAmount(90); // Default to full sponsorship
    setShowSponsorModal(true);
  };

  const handleCloseDonateModal = () => {
    setShowDonateModal(false);
  };

  const handleCloseSponsorModal = () => {
    setShowSponsorModal(false);
    setSponsorshipAmount(null);
    setCustomSponsorAmount("");
  };

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    setSenderName(`${firstName} ${lastName}`);
    setShowDonateModal(false);
    setShowSuccessModal(true);
  };

  const handleCompleteSponsorship = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    setSenderName(`${firstName} ${lastName}`);

    const finalAmount = customSponsorAmount
      ? parseFloat(customSponsorAmount)
      : sponsorshipAmount || 90;
    setDonationAmount(finalAmount);

    setShowSponsorModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSelectedAmount(null);
    setCustomAmount("");
    setSenderName("");
    setSelectedChild(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavBar />
      <main>
        <section className="relative h-100 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${donate})` }}
          >
            <div className="absolute inset-0 bg-teal-900/70"></div>
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 text-yellow-500">
              Make a Difference Today
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your Generosity transforms lives and builds brighter futures for
              vulnerable children and their families
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#0f3d2e] font-bold mb-4">
              Quick Donation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose an amount to make your donation today. Every contribution
              helps us provide essential resources and support to children in
              need.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-[#0f3d2e] text-white rounded-full hover:bg-teal-800 transition">
                One-time donation
              </button>
              <button className="px-6 py-2 border border-gray-300 text-[#0f3d2e] bg-[#0f3d2e23] rounded-full hover:bg-gray-50 transition">
                Monthly donation
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {donationAmounts.map((item: DonationAmount) => (
              <button
                key={item.amount}
                onClick={() => setSelectedAmount(item.amount)}
                className={`p-5 border-2 rounded-lg text-center bg-[#0f3d2e04] transition flex flex-col items-center ${
                  selectedAmount === item.amount
                    ? "border-teal-700 bg-teal-50"
                    : "border-gray-200 hover:border-[#0f3d2eda] hover:bg-[#0f3d2e0b]"
                }`}
              >
                <span className="text-2xl font-bold">${item.amount}</span>

                <span className="text-xs md:text-sm text-gray-600 leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600 mb-3">or enter custom amount</p>

            <div className="flex justify-center">
              <input
                type="number"
                inputMode="numeric"
                placeholder="$ Enter amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full max-w-xs px-4 py-3 border-2 border-[#0f3d2eda] rounded-md text-center text-lg focus:outline-none focus:border-teal-700"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleDonateClick}
              className="px-8 py-3 bg-[#0f3d2e] text-white rounded-full hover:bg-teal-800 transition font-semibold"
            >
              Donate Now
            </button>
          </div>
        </section>

        {/* Sponsor a Child Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-[#0f3d2e] font-bold mb-4">
                Sponsor a Child
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect with a child and make a lasting impact through monthly
                sponsorship. See their growth and know you're making a real
                difference in their life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col h-full"
                >
                  <div className="h-64 bg-gray-300">
                    <img
                      src={child.image}
                      alt={child.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-xl font-bold mb-2">{child.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{child.age}</p>
                    <p className="text-gray-600 text-sm mb-4">
                      {child.location}
                    </p>
                    <p className="text-gray-700 text-sm mb-4">
                      {child.description}
                    </p>
                    <div className="border-t pt-4 mt-auto">
                      <p className="text-sm mb-2 text-[#0f3d2e] text-center">
                        Monthly Needs
                      </p>

                      <div className="space-y-2">
                        {child.supportBreakdown.map(
                          (item: SupportItem, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm text-[#0f3d2e]"
                            >
                              <span className="font-medium">{item.label}</span>
                              <span className="text-teal-700">
                                {item.amount}
                              </span>
                            </div>
                          ),
                        )}
                      </div>

                      <p className="text-center text-xl font-bold text-teal-700 mt-4">
                        Total: {child.monthlySupport}
                      </p>

                      <button
                        onClick={() => handleSponsorClick(child)}
                        className="w-full mt-4 py-2 bg-[#0f3d2e] text-white rounded-full hover:bg-[#0f3d2ecf] transition font-semibold"
                      >
                        Sponsor Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* other Ways to Support Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#0f3d2e] font-bold mb-4">
              Other ways to support
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beyond financial contributions, there are many meaningful ways to
              support our mission and make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportWays.map((way, index) => {
              const IconComponent = way.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d8a519] rounded-full mb-6">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{way.title}</h3>
                  <p className="text-gray-600 mb-6">{way.description}</p>
                  <button className="px-6 py-2 border-2 border-[#0f3d2e] text-[#0f3d2e] rounded-full transition font-semibold">
                    {way.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Donate to Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Donate to Hameau des Jeunes?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="shrink-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Proven Impact</h4>
                      <p className="text-gray-600">
                        Over 20 years of transforming lives with measurable
                        outcomes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="shrink-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Full Transparency</h4>
                      <p className="text-gray-600">
                        Regular reports and updates on how your donation is used
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="shrink-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Community Driven</h4>
                      <p className="text-gray-600">
                        Working directly with local communities to ensure
                        sustainable development
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="shrink-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Sustainable Solutions</h4>
                      <p className="text-gray-600">
                        We focus on long-term solutions that empower communities
                        to thrive independently and create lasting change.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-125 bg-gray-300 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800"
                  alt="Community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Donate Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-[#d4d1b983]"
            onClick={handleCloseDonateModal}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-slideDown max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseDonateModal}
              className="absolute top-4 right-4 w-10 h-10 bg-[#0f3d2e] hover:bg-[#0f3d2ecf] text-white rounded-full flex items-center justify-center transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-5">
              <h2 className="text-3xl font-bold mb-3 text-center">Donate</h2>

              <form onSubmit={handleCompletePurchase}>
                {/* Personal Details */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter Your First Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter Your Last Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Your Phone Number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold mb-4">
                    Payment Details
                  </h3>

                  {/* Payment Method Icons */}
                  <div className="flex gap-3 mb-4">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div className="w-12 h-8 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                      Stripe
                    </div>
                    <div className="w-12 h-8 bg-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                      P
                    </div>
                    <div className="w-12 h-8 bg-linear-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                      <div className="flex">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-orange-400 rounded-full -ml-1"></div>
                      </div>
                    </div>
                    <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center text-xs font-bold">
                      G Pay
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Card holder name
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        placeholder="Enter Your First Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Card number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Enter Your Card Number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="Example: 0812"
                        maxLength={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        name="expiration"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleCloseDonateModal}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#0f3d2e] text-white rounded-lg hover:bg-[#0f3d2ecf] transition font-semibold"
                  >
                    Complete Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sponsorship Modal */}
      {showSponsorModal && selectedChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#d4d1b983]"
            onClick={handleCloseSponsorModal}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl animate-slideDown max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseSponsorModal}
              className="absolute top-4 right-4 w-10 h-10 bg-[#0f3d2e] hover:bg-[#0f3d2ecf] text-white rounded-full flex items-center justify-center transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-8">
                Sponsor {selectedChild.name}
              </h2>

              <form onSubmit={handleCompleteSponsorship}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Left side - Child info */}
                  <div>
                    <div className="mb-6">
                      <img
                        src={selectedChild.image}
                        alt={selectedChild.name}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedChild.name}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Age: {selectedChild.age}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {selectedChild.location}
                    </p>
                    <p className="text-gray-700 mb-6">
                      {selectedChild.description}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold mb-3">Monthly Needs:</h4>
                      <div className="space-y-2">
                        {selectedChild.supportBreakdown.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {item.label}
                            </span>
                            <span className="font-semibold">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Form */}
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(123) 000-0000"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Sponsorship Type{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="sponsorshipType"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                          required
                        >
                          <option value="">Select</option>
                          <option value="individual">Individual</option>
                          <option value="company">Company</option>
                          <option value="organization">Organization</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="E.g: San Francisco, CA"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-4">
                        Sponsorship Amount
                      </label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {[
                          { amount: 25, label: "Partial Support" },
                          { amount: 50, label: "Partial Support" },
                          { amount: 75, label: "Partial Support" },
                          { amount: 90, label: "Full sponsorship amount" },
                        ].map((option) => (
                          <button
                            key={option.amount}
                            type="button"
                            onClick={() => {
                              setSponsorshipAmount(option.amount);
                              setCustomSponsorAmount("");
                            }}
                            className={`p-4 border-2 rounded-lg transition ${
                              sponsorshipAmount === option.amount
                                ? "border-[#0f3d2e] bg-[#0f3d2e0b]"
                                : "border-gray-200 hover:border-[#0f3d2eda]"
                            }`}
                          >
                            <div className="text-xl font-bold">
                              ${option.amount}
                            </div>
                            <div className="text-xs text-gray-600">
                              {option.label}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Enter Custom Amount
                        </label>
                        <input
                          type="number"
                          placeholder="$ Enter amount"
                          value={customSponsorAmount}
                          onChange={(e) => {
                            setCustomSponsorAmount(e.target.value);
                            setSponsorshipAmount(null);
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">
                        Personal Message to {selectedChild.name.split(" ")[0]}{" "}
                        (Optional)
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        maxLength={500}
                        placeholder="Write a personal message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent resize-none"
                      ></textarea>
                      <div className="text-right text-sm text-gray-500 mt-1">
                        0/500 words
                      </div>
                    </div>

                    {/* Hidden fields for name to use in success modal */}
                    <input type="hidden" name="firstName" value="Sponsor" />
                    <input type="hidden" name="lastName" value="Name" />

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleCloseSponsorModal}
                        className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-[#0f3d2e] text-white rounded-lg hover:bg-[#0f3d2ecf] transition font-semibold"
                      >
                        Start Sponsorship $
                        {customSponsorAmount || sponsorshipAmount || 90}
                        /month
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-[#d4d1b983]"
            onClick={handleCloseSuccessModal}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-slideDown">
            <button
              onClick={handleCloseSuccessModal}
              className="absolute top-4 right-4 w-10 h-10 bg-[#0f3d2e] hover:bg-[#0f3d2ecf] text-white rounded-full flex items-center justify-center transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-12 text-center">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0f3d2e] rounded-full mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-[#0f3d2e] mb-2">
                Payment Success!
              </h2>
              <p className="text-4xl font-bold mb-8">${donationAmount}</p>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-6">Payment Details</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ref Number</span>
                    <span className="font-semibold">
                      {Math.floor(Math.random() * 1000000000000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Time</span>
                    <span className="font-semibold">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-semibold">Bank Transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sender Name</span>
                    <span className="font-semibold">
                      {senderName || "Donor"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-semibold">${donationAmount}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Admin Fee</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status</span>
                    <span className="text-[#0f3d2e] font-semibold bg-green-50 px-3 py-1 rounded">
                      Success
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Receipt
                </button>
                <button
                  onClick={handleCloseSuccessModal}
                  className="flex-1 py-3 bg-[#0f3d2e] text-white rounded-lg hover:bg-[#0f3d2ecf] transition font-semibold"
                >
                  GoBack
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>

      <Footer />
    </div>
  );
}

export default Donate;
