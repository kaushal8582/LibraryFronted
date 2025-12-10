// app/library/the-grand-library/page.tsx
"use client";

import GalleryImages from "@/components/GalleryImages";
import GoogleMap from "@/components/GoogleMap";
import Footer from "@/components/hero/Footer";
import Nav from "@/components/hero/Nav";
import { AppDispatch, RootState } from "@/lib/store";
import {
  MapPin,
  Clock,
  Wifi,
  Wind,
  VolumeX,
  ParkingCircle,
  BookOpen,
  Users,
  Star,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  ExternalLink,
  Image as ImageIcon,
  CheckCircle,
  Calendar,
  DollarSign,
  Shield,
  Award,
  IndianRupee,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLibraryById } from "@/lib/slices/settingsSlice";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { convertToIndianTime } from "@/common/commonAction";
import FacilityGrid from "./facilityCard";
import ReviewComponent from "./reviewComponent";
import { fetchCurrentUser } from "@/lib/slices/authSlice";
import SkeletonLoader from "@/components/loaders/SkeletonLoaders";
import Loader from "@/components/loaders/Loader";

export default function LibraryDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [action, setAction] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { libraryDetails, libraryDetailsLoading } = useSelector(
    (state: RootState) => state.settings
  );
  const { userFullData } = useSelector((state: RootState) => state.auth);

  // console.log("user data ", userFullData);
  // useEffect(() => {
  //   dispatch(fetchCurrentUser());
  // }, [dispatch]);

  const getLibraryDetails = async () => {
    try {
      const res = await dispatch(
        getLibraryById({ id, userId: userFullData?._id! })
      );
      if (res.meta.requestStatus === "fulfilled") {
        console.log("response ", res.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLibraryDetails();
  }, [id, userFullData?._id, action]);




  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Nav />

{
  libraryDetailsLoading && 
    <Loader />

}

  

{
  libraryDetails && <div>
          {/* Hero Section with Library Image */}
          <div className="relative h-[500px] overflow-hidden">
            {/* BG Image */}
            <Image
              src={libraryDetails?.heroImg || "library.jpg"}
              alt="Library"
              fill
              className="object-cover"
            />

            {/* Dark Overlay */}
            {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div> */}

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* GLASS BACKGROUND FOR TEXT */}
                <div className="inline-block p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-lg mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">
                      {libraryDetails?.name}
                    </span>
                  </div>

                  <h1 className="text-5xl font-bold text-white mb-4">
                    {libraryDetails?.name}
                  </h1>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-white/90" />
                      <span className="text-white/90">
                        {libraryDetails?.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold">
                        {libraryDetails?.avgRating?.toFixed(1)}/5.0
                      </span>
                      <span className="text-white/70">
                        ({libraryDetails?.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 -mt-16 relative z-30">
            {/* Main Content Grid */}
            <div className="space-y-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="flex max-lg:flex-col gap-8">
                  {/* About Section */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 w-full lg:max-w-2/3">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        About The Library
                      </h2>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-600">
                            Verified Partner
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-600">
                            {libraryDetails?.contactPhone}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-600">
                            {libraryDetails?.contactEmail}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-8">
                      {libraryDetails?.aboutLibrary}
                    </p>

                    {/* Owner Card */}
                    <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className="lg:size-12 size-14 bg-linear-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center max-md:mb-4">
                          {libraryDetails?.librarian?.[0]?.avtar ? (
                            <img
                              src={libraryDetails?.librarian?.[0]?.avtar}
                              alt="Librarian"
                              className="lg:size-12 size-12 rounded-full object-cover"
                            />
                          ) : (
                            <Users className="lg:size-8 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">
                            {libraryDetails?.librarian?.[0]?.name || null}
                          </h4>
                          <p className="text-gray-600 mb-2">
                            {libraryDetails?.librarian?.[0]?.bio || null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="space-y-8 w-full lg:w-96">
                    {/* Opening Hours */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Clock className="w-6 h-6 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900">
                          Opening Hours
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {libraryDetails?.openForDays?.map(
                          (e: string, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between items-center py-0 border-b border-gray-100 last:border-0"
                            >
                              <span className="text-gray-700 font-medium">
                                {e}
                              </span>
                              <span className="text-gray-700 font-medium ">
                                {convertToIndianTime(
                                  libraryDetails?.openingHours || ""
                                )}{" "}
                                -{" "}
                                {convertToIndianTime(
                                  libraryDetails?.closingHours || ""
                                )}
                              </span>
                            </div>
                          )
                        )}
                      </div>

                      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-green-700">
                            Currently Open
                          </span>
                        </div>
                        <p className="text-sm text-green-600 mt-1">
                          Closes at{" "}
                          {libraryDetails?.closingHours ? (
                            convertToIndianTime(
                              libraryDetails?.closingHours || ""
                            )
                          ) : (
                            "N/A"
                          )}{" "}
                          PM today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Facilities
                  </h2>

                  <FacilityGrid
                    facilities={libraryDetails?.facilities || []}
                    limit={6}
                    iconSize={30}
                  />
                </div>

                {/* Pricing Plans */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <IndianRupee className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Pricing Structure
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {libraryDetails?.plans?.map((plan: any, index: number) => (
                      <div
                        key={index}
                        className={`relative rounded-xl border p-5 transition-all ${
                          plan.popular
                            ? "border-blue-300 bg-linear-to-br from-blue-50 to-white ring-2 ring-blue-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute w-full flex justify-center -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                              MOST POPULAR
                            </span>
                          </div>
                        )}

                        <div className="mb-4">
                          <h4 className="font-bold text-gray-900 text-lg">
                            {plan?.name}
                          </h4>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-900">
                              ₹{plan?.price}
                            </span>
                            <span className="text-gray-500">/ Month</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-sm text-gray-700">
                            {plan?.hours} Hours Access
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-8">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-sm text-gray-700">
                            High Speed Internet
                          </span>
                        </div>

                        {/* <button
                          className={`w-full cursor-pointer py-3 rounded-lg font-semibold transition-all ${
                            plan?.popular
                              ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          }`}
                        >
                          {plan?.popular ? "Get Started Now" : "Select Plan"}
                        </button> */}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery */}
                <GalleryImages galleryPhotos={libraryDetails?.galleryPhotos} />

                {/*  Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className=" \ from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 border ">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {libraryDetails?.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Map Placeholder */}
                    <GoogleMap address={libraryDetails?.address} />
                  </div>
                  <ReviewComponent
                    id={libraryDetails?._id}
                    reviews={libraryDetails?.reviews || []}
                    action={action}
                    setAction={setAction}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
}

        
   

      <Footer />
    </div>
  );
}
