"use client";

import React from "react";
import Nav from "@/components/hero/Nav";
import Footer from "@/components/hero/Footer";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Wifi,
  Coffee,
  Star,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Smart Location Finder",
      desc: "Find study spots near you with real-time availability",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Updates",
      desc: "Live seat availability and noise level monitoring",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Ratings",
      desc: "Verified reviews from fellow students",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Amenity Filters",
      desc: "Filter by WiFi, power outlets, coffee, and more",
    },
  ];

  const popularSpots = [
    { name: "Quiet Haven Library", rating: 4.9, distance: "0.5 mi", seats: 12 },
    { name: "Campus Study Hub", rating: 4.7, distance: "1.2 mi", seats: 8 },
    { name: "Urban Café Corner", rating: 4.5, distance: "0.8 mi", seats: 6 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header>
        <Nav />
      </header>

      <main>
        <section className="relative px-4 md:px-8 lg:px-16 py-12 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 " />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center space-y-1">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Your Study Space, Perfectly Matched</span>
              </div> */}

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-linear-to-b from-gray-800 to-gray-400">
                  Find Your Perfect
                </span>
                <br />
                <span className="text-gray-900">Study Space.</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover quiet libraries, cozy cafes, and productive workspaces
                tailored to your study needs. Real-time availability, verified
                reviews, and smart recommendations.
              </p>
              <div className="flex justify-center items-center">
                <Image
                  src="/LibraryHeading.png"
                  alt="Library Heading"
                  width={600}
                  height={300}
                />
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 ">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search libraries, cafes, or study spots..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* <Button className=" text-lg h-14 px-8 rounded-xl bg-linear-to-r from-black to-gray-500 hover:from-gray-900 hover:to-600-400 cursor-pointer">
                    <Search className="" />
                    Explore Now
                  </Button> */}
                </div>
                {/* <div className="flex flex-wrap gap-3 justify-center mt-4">
                  <span className="text-sm text-gray-500">Popular:</span>
                  {["Library", "24/7 Access", "Silent Zone", "Group Study", "Free WiFi"].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-8 lg:px-16 py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose LibTrack?
              </h2>
              <p className="text-gray-600 text-lg">
                Everything you need to find your ideal study environment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <h1 className="text-1xl md:text-2xl font-bold text-gray-900 mb-4" >More 📘 For Students – Study Smarter</h1>
                <ul>
                  <li>🎯 Find the best study spot near you</li>
                  <li>🪑 Check real-time seat availability</li>
                  <li>🔍 Compare libraries by ratings & facilities</li>
                  <li>💳 See transparent membership & hourly plans</li>
                  <li>📅 Track your visits and timings</li>
                  <li>✨ No confusion, no noise — just perfect study spaces</li>
                </ul>
              </div>
              <div className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <h1 className="text-1xl md:text-2xl font-bold text-gray-900 mb-4" >📚 For Librarians – Grow Your Library</h1>
                <ul>
                  <li>📈 Manage Your Library online</li>
                  <li>📊 Professionally display your library online</li>
                  <li>✨ Add photos, facilities, timings, and seating details</li>
                  <li>💰 Create flexible membership & hourly plans</li>
                  <li>👥 Attract new students daily</li>
                  <li>⭐ Get verified ratings to build trust</li>
                  <li>🛠️ Manage student records and passes</li>
                  <li>📈 Improve visibility and increase footfall</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-8 lg:px-16 py-16 bg-linear-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-center sm:text-left">
                  Featured Libraries
                </h2>
                {/* <p className="text-gray-600">Based on real-time availability and user ratings</p> */}
              </div>
              <Button
                onClick={() => (window.location.href = "/explore")}
                variant="outline"
                className="mt-4 md:mt-0"
              >
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularSpots.map((spot, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-48 bg-linear-to-r from-blue-100 to-purple-100 relative">
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{spot.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {spot.name}
                      </h3>
                      <span className="text-sm text-gray-500">1.2 Km away</span>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        {/* <Users className="w-4 h-4 text-gray-400" /> */}
                        <span className="text-gray-700">
                          {" "}
                          Starts At : 199/Month
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <Coffee className="w-4 h-4 text-amber-500" />
                      </div>
                    </div>
                    <Button className=" cursor-pointer w-full group-hover:bg-blue-600 transition-colors">
                      View <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="px-4 md:px-8 lg:px-16 py-20 bg-linear-to-t from-slate-900 to-slate-400 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Join 50,000+ Students</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Boost Your Productivity?
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Sign up today and get access to premium features, exclusive study spots, and smart recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black  hover:bg-white/10 px-8 py-6 text-lg">
                View Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Free forever plan</span>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
