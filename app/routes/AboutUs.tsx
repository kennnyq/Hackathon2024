import type { FC } from "react";

const About: FC = () => {
  const teamMembers = [
    {
      name: "Kenny Quach",
      role: "Frontend Developer",
      description:
        "",
      image: "https://via.placeholder.com/150",
      education: "Basically Gandalf",
    },
    {
      name: "Yash Baruah",
      role: "Backend Developer",
      description:
        "",
      image: "https://via.placeholder.com/150",
      education: "Did some stuff",
    },
    {
      name: "Sanjay Bharathi",
      role: "UI/UX Designer",
      description:
        "",
      image: "https://via.placeholder.com/150",
      education: "Map Maker",
    },
    {
      name: "Saarim Syed",
      role: "Team Coordinator",
      description:
        "",
      image: "https://via.placeholder.com/150",
      education: "Homework Doer",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 overflow-y-auto">
      {/* Introduction Section */}
      <section className="py-16 bg-yellow-50 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-orange-600 mb-6">
            Our Mission
          </h2>
          <p className="text-lg leading-8 text-gray-800">
            We aim to improve campus parking by building innovative solutions
            that make finding a spot easier and stress-free. Our team of
            passionate individuals brings diverse skills together to tackle this
            challenge with creativity and determination.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-orange-600 text-center mb-10">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-orange-400"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-2">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <em>{member.education}</em>
              </p>
              <p className="text-sm text-gray-700">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <p className="text-center text-sm">
          &copy; 2024 CometPark. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
};

export default About;