import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Send,
  Search,
  User,
  HelpCircle,
  Bug,
  Lightbulb,
  Heart,
  CheckCircle,
  AlertCircle,
  Info,
  Shield,
} from "lucide-react";

const ContactUsPage = ({ onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@campusfind.edu",
      description: "Get a response within 24 hours",
      action: "mailto:support@campusfind.edu",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      detail: "Available 9 AM - 6 PM",
      description: "Instant support during business hours",
      action: "#",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "(555) 123-FIND",
      description: "Mon-Fri, 9 AM - 5 PM EST",
      action: "tel:+15551234346",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "Student Center, Room 204",
      description: "Office hours: Mon-Wed, 2-4 PM",
      action: "#",
    },
  ];

  const categories = [
    { value: "general", label: "General Inquiry", icon: Info },
    { value: "support", label: "Technical Support", icon: HelpCircle },
    { value: "bug", label: "Report a Bug", icon: Bug },
    { value: "feature", label: "Feature Request", icon: Lightbulb },
    { value: "feedback", label: "Feedback", icon: Heart },
  ];

  const faqItems = [
    {
      question: "How do I report a lost item?",
      answer:
        "Click the 'Report Lost Item' button on the homepage, fill out the form with details about your item, and we'll notify you when someone finds a matching item.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes, your contact information is only shared when you choose to connect with someone. We use industry-standard encryption to protect your data.",
    },
    {
      question: "How long do items stay in the system?",
      answer:
        "Lost items remain active for 30 days, while found items stay in the system for 60 days to give the owner time to claim them.",
    },
    {
      question: "Can I edit my listing after posting?",
      answer:
        "Yes, you can edit or delete your listings at any time from your profile page.",
    },
    {
      question: "What if I find my item elsewhere?",
      answer:
        "Please mark your listing as 'Found' or delete it to keep the database current and help others more effectively.",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitStatus("success");

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      });
      setSubmitStatus(null);
    }, 3000);
  };

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message;

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
              <MessageCircle className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Get in <span className="text-blue-400">Touch</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions, suggestions, or need help? We're here to help you
            make the most of CampusFind. Our team is committed to providing
            excellent support.
          </p>
        </div>

        {/* Contact Methods */}
        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((contact, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <a
                  href={contact.action}
                  className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center group-hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105 block"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {contact.title}
                  </h3>
                  <p className="text-blue-400 font-semibold mb-2">
                    {contact.detail}
                  </p>
                  <p className="text-gray-400 text-sm">{contact.description}</p>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Send us a Message
              </h3>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-xl flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-semibold">
                      Message sent successfully!
                    </p>
                    <p className="text-green-300 text-sm">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-10 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-10 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="your.email@edu"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isFormValid && !isSubmitting
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:shadow-blue-500/25 text-white"
                      : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div
            className={`transition-all duration-1000 delay-600 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
                >
                  <h4 className="text-lg font-semibold mb-3 text-white flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-gray-400 leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Response Time Info */}
            <div className="mt-8 bg-blue-600/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    Response Times
                  </h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Email support: Within 24 hours</li>
                    <li>• Live chat: Instant during business hours</li>
                    <li>• Bug reports: Within 48 hours</li>
                    <li>• Feature requests: Within 1 week</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-800 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-red-600/10 border border-red-500/30 rounded-2xl p-8">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">
              Emergency or Urgent Issues?
            </h3>
            <p className="text-gray-300 mb-4">
              For urgent technical issues or security concerns, please contact
              campus security or our emergency support line.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234999"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Emergency: (555) 123-4999</span>
              </a>
              <a
                href="tel:+15551235555"
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>Campus Security: (555) 123-5555</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
