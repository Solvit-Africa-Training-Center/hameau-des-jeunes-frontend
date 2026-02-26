import { Footer } from "@/components/Footer";
import { TopNavBar } from "@/components/TopNavBar";
import { Clock, Users, Lightbulb, X } from "lucide-react";
import { useState } from "react";
import Interns from "../assets/IIImage.jpg";
import { FiMail } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { useCreateApplicationMutation } from "@/store/api/internshipApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Internship() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [createApplication, { isLoading }] = useCreateApplicationMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    education_level: "",
    date_of_birth: "",
    nationality: "",
    school_university: "",
    field_of_study: "",
    availability_hours: "40",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);

  const supportWays = [
    {
      icon: Clock,
      title: "Hands-on Experience",
      description: "Gain valuable hands-on experience in community development",
    },
    {
      icon: Lightbulb,
      title: "Professional Mentorship",
      description: "Professional mentorship and guidance",
    },
    {
      icon: Users,
      title: "Corporate partnership",
      description: "Academic credit and certification opportunities",
    },
  ];

  const programsList = [
    { id: "residence", label: "Residence Care" },
    { id: "home-tug", label: "Home Tug/Amatsi" },
    { id: "technical", label: "Technical High School (TTHS)" },
    { id: "agriculture", label: "Agriculture & Farming" },
    { id: "carpentry", label: "Carpentry & Garage Workshops" },
    { id: "health", label: "Health Post Services" },
    { id: "tourism", label: "Tourism & Cultural Visits" },
  ];

  const handleProgramChange = (programId: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId],
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error("Please upload your CV");
      return;
    }

    if (selectedPrograms.length === 0) {
      toast.error("Please select at least one program");
      return;
    }

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    submissionData.append("program", selectedPrograms.join(", "));
    submissionData.append("cv_url", cvFile);

    try {
      await createApplication(submissionData).unwrap();
      toast.success("Application submitted successfully!");
      setIsModalOpen(false);
      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country: "",
        education_level: "",
        date_of_birth: "",
        nationality: "",
        school_university: "",
        field_of_study: "",
        availability_hours: "40",
      });
      setSelectedPrograms([]);
      setCvFile(null);
    } catch (err: any) {
      toast.error(err?.data?.detail || "Failed to submit application");
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavBar />
      <main>
        <section className="relative h-100 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${Interns})` }}
          >
            <div className="absolute inset-0 bg-teal-900/70"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 text-yellow-500">
              International Internship
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Gain valuable hands-on experience in community development,
              education, and social work. Our internship program offers
              meaningful learning opportunities in a supportive environment
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-6xl mx-auto">
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
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center sm:mt-10 md:mt-12">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-4xl border-2 bg-[#0f3d2e] px-6 py-2.5 text-sm font-semibold text-white transition-colors sm:px-8 sm:py-3 sm:text-base hover:bg-[#0f3d2e]/90"
            >
              Apply for Internship
            </button>
          </div>
        </section>

        <section>
          <div className="w-full flex justify-center px-4 mb-16">
            <div className="bg-[#0f3d2e] text-white rounded-xl w-full max-w-3xl py-8 px-6 text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-6">
                Get in Touch
              </h3>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400"><FaPhoneAlt size={20} /></span>
                  <span>+250 (788) 436 189</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 "><FiMail size={20} /></span>
                  <span>hameau_kizito@yahoo.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 bg-[#bdc0a57e] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#0f3d2e] rounded-full text-white hover:bg-[#0f3d2e]/90 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-[#0f3d2e] mb-6">
                  Internship Application
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name and Last Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="Jane"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Email and Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+250..."
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* DOB and Nationality Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nationality <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        placeholder="e.g. Rwandan"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Country and Education Level Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="e.g. Rwanda"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Highest Education Level <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="education_level"
                        value={formData.education_level}
                        onChange={handleInputChange}
                        placeholder="e.g. Bachelor's Degree"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* School and Field of Study Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        School / University <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="school_university"
                        value={formData.school_university}
                        onChange={handleInputChange}
                        placeholder="e.g. University of Rwanda"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="field_of_study"
                        value={formData.field_of_study}
                        onChange={handleInputChange}
                        placeholder="e.g. Computing"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0f3d2e] focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Programs Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Program you want to intern at: <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {programsList.map((program) => (
                        <label
                          key={program.id}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPrograms.includes(program.id)}
                            onChange={() => handleProgramChange(program.id)}
                            className="w-4 h-4 text-[#0f3d2e] border-gray-300 rounded focus:ring-[#0f3d2e]"
                          />
                          <span className="text-sm text-gray-700">
                            {program.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* CV/Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose CV/Resume (PDF) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2 bg-[#0f3d2e] text-white text-sm rounded-md cursor-pointer hover:bg-[#0f3d2e]/90 transition-colors">
                        Choose File
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-sm text-gray-500">
                        {cvFile ? cvFile.name : "No file chosen"}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#0f3d2e] text-white py-3 rounded-md font-semibold hover:bg-[#0f3d2e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Internship;
