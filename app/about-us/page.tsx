// app/about/page.tsx
import { 
  BookOpen, 
  Users, 
  MapPin, 
  Calendar, 
  Clock, 
  Wifi, 
  Search, 
  Heart, 
  Target, 
  Sparkles,
  Globe,
  Shield,
  TrendingUp
} from 'lucide-react';
import Nav from "@/components/hero/Nav";
import Footer from '@/components/hero/Footer';

export default function AboutPage() {
  const studentBenefits = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Discover Libraries",
      description: "Find nearby libraries and their unique resources with ease."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-Time Availability",
      description: "Access current information on study space availability."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Stay Updated",
      description: "Never miss workshops, events, and community activities."
    }
  ];

  const librarianBenefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Showcase Facilities",
      description: "Highlight your library's unique services and spaces."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Engage Community",
      description: "Connect with students and increase meaningful engagement."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Effortless Management",
      description: "Promote events and manage resource listings seamlessly."
    }
  ];

  const whyLibTrack = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "User-Centric Design",
      description: "An intuitive and beautiful interface for a seamless experience."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community Focused",
      description: "We're not just a directory; we're a platform for connection."
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Innovative Technology",
      description: "Leveraging modern tech to solve age-old discovery problems."
    }
  ];

  const commitments = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Accessibility",
      description: "Ensuring our platform is accessible to everyone."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Reliability",
      description: "Providing dependable service you can count on."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Continuous Improvement",
      description: "Evolving to meet changing educational needs."
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Nav/>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <BookOpen className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Connecting Communities,
              <span className="block text-blue-600 mt-2">One Library at a Time</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging the gap between students and the vast resources libraries offer
            </p>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Purpose</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <p className="text-lg text-gray-700 leading-relaxed">
                At LibTrack, our purpose is to bridge the gap between students and the 
                vast resources libraries offer. We believe in the power of knowledge and 
                community, and we're dedicated to creating a platform that makes discovering 
                and utilizing library services a seamless, enjoyable, and enriching 
                experience for everyone involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          {/* For Students */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {studentBenefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-blue-50 rounded-lg w-fit mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* For Librarians */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">For Librarians</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {librarianBenefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-indigo-50 rounded-lg w-fit mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why LibTrack Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why LibTrack?</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyLibTrack.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-4 bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Commitment Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <div className="w-24 h-1 bg-blue-600"></div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our vision is to create a world where every student feels connected to 
                  their local library, and every library has the tools to thrive in the 
                  digital age. We aim to be the essential link that fosters learning, 
                  discovery, and community engagement.
                </p>
              </div>
            </div>

            {/* Commitment */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment</h2>
                <div className="w-24 h-1 bg-blue-600"></div>
              </div>
              <div className="space-y-6">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white rounded-xl shadow-md p-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {commitment.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{commitment.title}</h3>
                      <p className="text-gray-600">{commitment.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Us in Building Better Library Connections
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Empower your educational journey or transform your library's impact today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section> */}

      <Footer/>
    </div>
  );
}