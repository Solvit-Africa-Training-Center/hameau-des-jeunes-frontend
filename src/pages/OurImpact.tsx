import { TopNavBar } from "@/components/TopNavBar";
import {
  Users,
  Globe,
  Calendar,
  Award,
  BookOpen,
  Heart,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import impact from "../assets/impact.png";
import kid from "../assets/kid.jpg";
import family from "../assets/family.jpg";
import EmmanuelTeam from "../assets/EmmanuelTeam.jpg";
import { useGetCompanyImpactQuery } from "@/store/api/companyImpact";
import { useGetOutcomesQuery } from "@/store/api/outcomesApi";

const OurImpact = () => {
  const { data: impactList = [], isLoading } = useGetCompanyImpactQuery();
  const { data: outcomes = [], isLoading: outcomesLoading } =
    useGetOutcomesQuery();
  const d = impactList[0];

  const stats = [
    {
      number: d ? `${d.children_supported}+` : "-",
      icon: <Users className="w-6 h-6" />,
      title: "Children Supported",
      description: "Direct beneficiaries of our programs",
      bgColor: "bg-slate-800",
      iconColor: "text-white",
    },
    {
      number: d ? `${d.families_strengthened}+` : "-",
      icon: <Globe className="w-6 h-6" />,
      title: "Families Strengthened",
      description: "Families reunited and empowered",
      bgColor: "bg-blue-500",
      iconColor: "text-white",
    },
    {
      number: d ? `${d.schools_supported}%` : "-",
      icon: <Calendar className="w-6 h-6" />,
      title: "School Enrollment",
      description: "Children in quality education",
      bgColor: "bg-yellow-500",
      iconColor: "text-white",
    },
    {
      number: d ? `${d.youth_trained}+` : "-",
      icon: <Award className="w-6 h-6" />,
      title: "Youth Trained",
      description: "Vocational skills graduates",
      bgColor: "bg-slate-800",
      iconColor: "text-white",
    },
    {
      number: d ? `${d.years_of_service}+` : "-",
      icon: <Heart className="w-6 h-6" />,
      title: "Years of Service",
      description: "Making a difference since 2004",
      bgColor: "bg-blue-500",
      iconColor: "text-white",
    },
    {
      number: d ? `${d.success_rate}%` : "-",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Success Rate",
      description: "Successful family reintegration",
      bgColor: "bg-yellow-500",
      iconColor: "text-white",
    },
  ];

  const stories = [
    {
      image: kid,
      title: "Maria's Journey",
      content:
        "Maria came to us with a desire to learn new skills and provide for her family. Through our vocational training program, she gained expertise in tailoring and small business management. Today, Maria runs her own successful tailoring business, employing three other women from her community. Her story exemplifies the transformative power of education and opportunity.",
      reverse: false,
    },
    {
      image: family,
      title: "John's Family Reunited",
      content:
        "After facing difficult circumstances, John's family was struggling to stay together. Our family support program provided counseling, financial literacy training, and resources that helped them rebuild. John now has stable employment and his children are thriving in school. The family's resilience and determination, combined with the right support, made all the difference.",
      reverse: true,
    },
    {
      image: EmmanuelTeam,
      title: "Emmanuel's Enterprise",
      content:
        "Emmanuel participated in our entrepreneurship program with just an idea and determination. With mentorship, training, and a small seed grant, he launched a sustainable agriculture business that now serves his entire village. His enterprise not only provides for his family but also creates employment opportunities and improves food security in his community.",
      reverse: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar />

      <main className="grow">
        <section className="relative h-100 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${impact})` }}
          >
            <div className="absolute inset-0 bg-teal-900/70"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 text-yellow-500">
              Our Impact
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Transforming lives through education and empowerment
            </p>
          </div>
        </section>

        <section className="py-12 px-8 md:py-16  bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d2e] mb-2">
                Our Impact in Numbers
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Real data reflecting real change in children's lives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-4 md:p-6 shadow-sm animate-pulse"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-200 mb-4" />
                      <div className="h-8 w-20 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
                      <div className="h-3 w-40 bg-gray-100 rounded" />
                    </div>
                  ))
                : stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`${stat.bgColor} ${stat.iconColor} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4`}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                        {stat.number}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                        {stat.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        {stat.description}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* Success stories */}

        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0f3d2e] mb-2">
                Success Stories
              </h2>
              <p className="text-gray-600">Real people, real transformations</p>
            </div>

            {stories.map((story, index) => (
              <div
                key={index}
                className={`flex flex-col ${story.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center mb-16`}
              >
                <div className="md:w-1/2">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-100 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {story.content}
                  </p>
                </div>
              </div>
            ))}

            <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 inline-flex items-center gap-2  border-teal-700 text-teal-700 font-semibold rounded hover:bg-teal-700 hover:text-white transition-colors">
                View More <ArrowUpRight size={19} />
              </button>
            </div>
          </div>
        </section>

        {/* Program Outcomes */}

        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0f3d2e] mb-2">
                Program Outcomes
              </h2>
              <p className="text-gray-600">
                Measuring our impact across key areas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {outcomesLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white p-8 rounded-lg shadow-md animate-pulse"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-200 mb-4" />
                    <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="h-4 bg-gray-100 rounded" />
                      ))}
                    </div>
                  </div>
                ))
              ) : outcomes.length === 0 ? (
                <div className="col-span-3 text-center text-gray-400 text-sm py-12">
                  No program outcomes available yet.
                </div>
              ) : (
                outcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-lg shadow-md"
                  >
                    <div className="w-12 h-12 bg-teal-700 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{outcome.title}</h3>
                    {outcome.descriptions && outcome.descriptions.length > 0 ? (
                      <ul className="space-y-2">
                        {outcome.descriptions.map((desc) => (
                          <li
                            key={desc.id}
                            className="flex items-start gap-3 text-gray-600"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1b67ff]"></span>
                            <span className="leading-relaxed">
                              {desc.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No descriptions added yet.
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurImpact;
