import { useGetTeamQuery } from "@/store/api/teamApi";
import React, { useState } from "react";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  linkedIn: string;
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

      <p className="text-xs text-gray-600 sm:text-base">{role}</p>
    </div>
  );
};

const TeamMemberSkeleton = () => (
  <div className="flex flex-col items-center text-center animate-pulse">
    <div className="mb-3 h-40 w-40 rounded-2xl bg-gray-200 sm:h-44 sm:w-44 md:mb-4 md:h-48 md:w-48" />
    <div className="mb-1 h-4 w-32 rounded bg-gray-200" />
    <div className="h-3 w-24 rounded bg-gray-100" />
  </div>
);

export const MeetOurTeam: React.FC = () => {
  const { data: teamMembers = [], isLoading } = useGetTeamQuery();
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 8;
  const totalPages = Math.ceil(teamMembers.length / PAGE_SIZE);
  const paginated = teamMembers.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <section className="bg-gray-100 py-12 md:py-8 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl md:mb-4">
            Meet Our Team
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-gray-700 sm:text-base md:text-lg">
            Dedicated caregivers, professionals, and volunteers working together
            for child protection and family empowerment.
          </p>
        </div>
        <div className="mb-8 grid gap-6 sm:grid-cols-2 md:mb-12 md:gap-8 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <TeamMemberSkeleton key={i} />
              ))
            : paginated.map((member) => (
                <TeamMember
                  key={member.id}
                  image={member.image}
                  name={member.full_name}
                  role={member.position}
                  linkedIn={member.linkedin_url}
                />
              ))}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              className="rounded-md border-2 border-gray-900 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:px-8 sm:py-3 sm:text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
              className="rounded-md border-2 border-gray-900 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white sm:px-8 sm:py-3 sm:text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
