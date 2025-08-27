import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Users,
  Target,
  Heart,
  Zap,
  Shield,
  Search,
  Star,
  Award,
  BookOpen,
  Coffee,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const AboutUsPage = ({ onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const teamMembers = [
    {
      name: "Khushi Padaliya",
      role: "Founder & CEO",
      bio: "Computer Science student passionate about building innovative solutions that connect and empower campus communities through technology.",
      avatar: "/images/khushi-avatar.jpg", // You can replace this with actual image path
      expertise: ["Product Strategy", "Full-Stack Development", "UI/UX Design"],
    },
    {
      name: "Apexa Patel",
      role: "Co-Founder & CTO",
      bio: "Engineering student dedicated to creating seamless and secure platforms that make campus life easier and more connected for everyone.",
      avatar: "/images/apexa-avatar.jpg", // You can replace this with actual image path
      expertise: ["Backend Development", "Database Design", "Security"],
    },
  ];

  const values = [
    {
      icon: Users,
      title: "Community First",
      description:
        "We believe in the power of students helping students. Every feature we build strengthens campus connections.",
    },
    {
      icon: Shield,
      title: "Privacy & Safety",
      description:
        "Your personal information and safety are our top priorities. We use industry-standard security measures.",
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description:
        "Lost something? We're designed to reunite you with your belongings as quickly as possible.",
    },
    {
      icon: Heart,
      title: "Made with Care",
      description:
        "Built by students who understand the stress of losing important items on campus.",
    },
  ];

  const milestones = [
    {
      date: "January 2024",
      title: "The Idea is Born",
      description:
        "Started when our founders experienced the frustration of losing important items on campus and spending hours searching for them.",
      icon: Lightbulb,
    },
    {
      date: "March 2024",
      title: "Research & Planning",
      description:
        "Conducted surveys with students to understand pain points and designed the initial user experience.",
      icon: BookOpen,
    },
    {
      date: "July 2024",
      title: "Development Phase",
      description:
        "Started building the core functionality with modern web technologies and responsive design.",
      icon: Coffee,
    },
    {
      date: "August 2024",
      title: "Prototype Testing",
      description:
        "Currently in prototype phase, refining features and preparing for initial campus testing.",
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-32 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gray-600/6 rounded-full blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <nav className="relative z-20 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
          <button
            onClick={onBack}
            className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 group"
          >
            <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-gray-700/50 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="hidden sm:block font-medium">Back to Home</span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              CampusFind
            </h1>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Hero Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl border border-blue-500/30 mb-6">
              <Users className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            About <span className="text-blue-400">Campus</span>
            <span className="text-purple-400">Find</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're a team of students who understand the frustration of losing
            important items on campus. That's why we built CampusFind - to
            create a stronger, more connected campus community where no one has
            to worry about lost belongings.
          </p>
        </div>

        {/* Mission Statement */}
        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 sm:p-12">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-center pt-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                Our Mission
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                To eliminate the stress and time wasted searching for lost items
                on campus by creating an intelligent, secure, and
                community-driven platform that connects students with their
                belongings and with each other.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div
          className={`mb-20 transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-black mb-4 text-white">
              Our Values
            </h3>
            <p className="text-lg text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-black mb-4 text-white">
              Meet the Team
            </h3>
            <p className="text-lg text-gray-400">
              The students behind CampusFind
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={member.avatar}
                      alt={`${member.name} avatar`}
                      className="w-full h-full rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500"
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&background=6366f1&color=fff&size=96`;
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-1 text-white">
                    {member.name}
                  </h4>
                  <p className="text-blue-400 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div
          className={`mb-20 transition-all duration-1000 delay-800 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-black mb-4 text-white">
              Our Journey
            </h3>
            <p className="text-lg text-gray-400">
              From idea to campus-wide platform
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-gray-600 to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                      <div className="text-blue-400 font-semibold text-sm mb-1">
                        {milestone.date}
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-white">
                        {milestone.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 sm:p-12">
            <div className="absolute -top-4 -right-4">
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Join Our Community
            </h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Help us build a campus where no one has to worry about losing
              their belongings. Together, we're creating a more connected and
              supportive student community.
            </p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Start Using CampusFind</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
