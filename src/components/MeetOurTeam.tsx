import React from 'react';

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3 h-40 w-40 overflow-hidden rounded-2xl sm:h-44 sm:w-44 md:mb-4 md:h-48 md:w-48">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg md:mb-2">
        {name}
      </h3>

      <p className="text-xs text-gray-600 sm:text-base">
        {role}
      </p>
    </div>
  );
};

export const MeetOurTeam: React.FC = () => {
  const teamMembers = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHtc-HxfIPWXcY918S2jGNlclewJF8Pq2uYw&s',
      name: 'Jean - Claude Niyomuntu',
      role: 'Executive Director',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmS3nIe8yPZgOUK5O1gymkOQCIwC3wr1ybSA&s',
      name: 'Marie Uwase',
      role: 'Program Manager',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFsm7X5UEVqRlug_JIei9DymR_sM2KMuK7g&s',
      name: 'Grace Mukamana',
      role: 'Child Protection Officer',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidVTWBrqBTnW4bYhp19Viw4qgxKN5HQcUww&s',
      name: 'Patrick Habimana',
      role: 'Community Outreach Manager',
    },
  ];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl md:mb-4">
            Meet Our Team
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-700 sm:text-base md:text-lg">
            Dedicated caregivers, professionals, and volunteers working together for child protection and family empowerment.
          </p>
        </div>
        <div className="mb-8 grid gap-6 sm:grid-cols-2 md:mb-12 md:gap-8 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
        <div className="text-center">
          <button className="rounded-md border-2 border-gray-900 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:px-8 sm:py-3 sm:text-base">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};