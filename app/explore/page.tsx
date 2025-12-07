"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Wifi,
  Snowflake,
  Coffee,
  BookOpen,
  Clock,
  DollarSign,
  ChevronDown,
  Users,
  Battery,
  X,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Footer from "@/components/hero/Footer";
import Nav from "@/components/hero/Nav";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { filterLibraries } from "@/lib/slices/settingsSlice";
import { useDebounce } from "@/common/debounce";
import { truncateText } from "@/common/commonAction";
import { useIsMobile } from "@/hooks/use-mobile";



const facilities = [
  { id: "wifi", label: "Wi-Fi", icon: <Wifi className="w-4 h-4" /> },
  { id: "ac", label: "AC", icon: <Snowflake className="w-4 h-4" /> },
  { id: "parking", label: "Parking", icon: <Users className="w-4 h-4" /> },
  { id: "coffee", label: "Coffee", icon: <Coffee className="w-4 h-4" /> },
  { id: "printing", label: "Printing", icon: <BookOpen className="w-4 h-4" /> },
  {
    id: "power",
    label: "Power Outlets",
    icon: <Battery className="w-4 h-4" />,
  },
];

export default function ExplorePage() {
  const [open,setOpen] = useState(false); // for sheet (filter dailog)
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(4);
  const [openNow, setOpenNow] = useState(true);
  const [location, setLocation] = useState("");
  const isMobile = useIsMobile()


   const dispatch = useDispatch<AppDispatch>();

    const { libraries, libraryLoading } = useSelector(
    (state: RootState) => state.settings
  );

  const router = useRouter();


  const debounceSearchValue = useDebounce(searchQuery, 500);

  



  const getFilterData = async()=>{
    

    const payload ={
      searchText : debounceSearchValue,
      facilities : selectedFacilities,
      // rating : minRating,
      feeRange : priceRange[0],
    }

    try {
     const res = await dispatch(filterLibraries(payload));
      if(res.meta.requestStatus === "fulfilled"){
        console.log("response ",res.payload)
      }
    } catch (error) {
      console.log(error)

    }
  }


  useEffect(()=>{
    if(isMobile)
      return;

    getFilterData()
  },[debounceSearchValue,priceRange,selectedFacilities,minRating,openNow,location]);






  const toggleFacility = (facilityId: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facilityId)
        ? prev.filter((id) => id !== facilityId)
        : [...prev, facilityId]
    );
  };

    const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([500, 5000]);
    setSelectedFacilities([]);
    setMinRating(4);
    setOpenNow(true);
    setLocation("");
    
    if(isMobile)
      getFilterData();

    
  }
  

const handleApplyFilter = ()=>{
  
  getFilterData();
  setOpen(false)
}

const handleClearFilter  = ()=>{
  setOpen(false)

  clearFilters();
}



  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Nav />
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg ">
        <div className="container mx-auto">
          <div className="flex items-center justify-between "></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-2 mt-5">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="lg:w-1/4 hidden md:block">
            <div className="sticky top-14 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-8">
              <FiltersContent
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                openNow={openNow}
                setOpenNow={setOpenNow}
                selectedFacilities={selectedFacilities}
                toggleFacility={toggleFacility}
                location={location}
                setLocation={setLocation}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Results Header */}
            {/* Search Bar */}
            <div className="relative flex items-center justify-between gap-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by library name, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-xl border-gray-200 focus-visible:ring-blue-500"
              />

              {/* Mobile Filter Button */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild >
                  <Button variant="outline" className="md:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md">
                  <SheetHeader>
                    
                    <SheetTitle className="flex gap-2">
                       <Filter className="w-5 h-5 border" />
                      Filters</SheetTitle>
                  </SheetHeader>
                  <div className=" space-y-6 px-6">
                    <FiltersContent
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      minRating={minRating}
                      setMinRating={setMinRating}
                      openNow={openNow}
                      setOpenNow={setOpenNow}
                      selectedFacilities={selectedFacilities}
                      toggleFacility={toggleFacility}
                      location={location}
                      setLocation={setLocation}
                      clearFilters={clearFilters}
                    />


                    <div className="grid place-items-center grid-cols-2 gap-4 w-full">
 <Button className="w-full" onClick={handleApplyFilter}>Apply Filter</Button>
   <Button variant="destructive" size="sm" className="w-full" onClick={handleClearFilter}>
          Clear All
        </Button>

</div>
                  </div>
                </SheetContent>
              </Sheet>
              
            </div>

            <div className="flex items-center justify-between mb-8">
              {/* <div className=" mt-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Libraries
                  <span className="text-gray-500 ml-2">
                    ({filteredLibraries.length})
                  </span>
                </h2>
                <p className="text-gray-600 mt-1">Based on your preferences</p>
              </div> */}

              {/* Active Filters */}
              {/* <div className="flex flex-wrap gap-2">
                {selectedFacilities.length > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedFacilities.length} facilities
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => setSelectedFacilities([])}
                    />
                  </Badge>
                )}
                {openNow && (
                  <Badge variant="secondary" className="gap-1">
                    Open Now
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => setOpenNow(false)}
                    />
                  </Badge>
                )}
                {minRating > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    Rating {minRating}+
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => setMinRating(0)}
                    />
                  </Badge>
                )}
              </div> */}
            </div>

            {/* Libraries Grid */}
            {libraries?.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No libraries found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search term
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-0">
                {libraries?.map((library) => (
                  <Card
                    key={library._id}
                    className=" pt-0!  group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200"
                  >
                    <div className={`${library?.heroImg} h-48 relative`}>
                      <img src={library?.heroImg} alt={library?.name} className="w-full h-full object-cover" />
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={
                            library
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }
                        >
                          {library ? (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Open Now
                            </>
                          ) : (
                            "Closed"
                          )}
                        </Badge>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {library?.avgRating || 3}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 pt-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            { truncateText( library.name,14)}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {library.distance}
                          </div>
                        </div>
                        <div className="text-right flex items-center justify-center">
                          <div className="text-1xl font-bold text-blue-600">
                            ₹{library?.minPrice }
                          </div>
                          <div className="text-sm text-gray-500">/m</div>
                        </div>
                      </div>

                      {/* Facilities */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {library.facilities?.map((facility:string) => {
                          const facilityIcon = facilities.find(
                            (f) => f.label === facility
                          )?.icon;
                          return (
                            <Badge
                              key={facility}
                              variant="outline"
                              className="gap-1"
                            >
                              {facilityIcon}
                              {facility}
                            </Badge>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{library.seatsAvailable} seats available</span>
                        </div> */}
                        <Button
                          onClick={() => router.push(`explore/${library._id}`)}
                          className="group-hover:bg-blue-600 transition-colors"
                        >
                          View Details
                          <ChevronDown className="w-4 h-4 ml-2 transform group-hover:rotate-90 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Filters Component for reuse
function FiltersContent({
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  openNow,
  setOpenNow,
  selectedFacilities,
  toggleFacility,
  location,
  setLocation,
  clearFilters,
}: any) {
  return (
    <>
      <div className=" items-center justify-between hidden md:flex">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Location Filter */}
      {/* <div className="space-y-2">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location
        </h4>
        <Input
          placeholder="Enter city or area"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border-gray-200"
        />
      </div> */}

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          {/* <DollarSign className="w-4 h-4" /> */}₹ Fee Range
        </h4>
        <div className="px-2">
          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-6"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0]}</span>
            <span>₹5000</span>
          </div>
        </div>
      </div>

      {/* Open Now */}
      {/* <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Open Now
          </h4>
          <Checkbox
            checked={openNow}
            onCheckedChange={(checked) => setOpenNow(checked === true)}
          />
        </div>
      </div> */}

      {/* Rating */}
     

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Rating
          </h4>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                onClick={() => setMinRating(starValue)}
                className={`w-6 h-6 cursor-pointer transition ${
                  starValue <= minRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
     

      {/* Facilities */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Facilities</h4>
        <div className="space-y-3">
          {facilities.map((facility) => (
            <div key={facility.id} className="flex items-center space-x-3">
              <Checkbox
                id={facility.id}
                checked={selectedFacilities.includes(facility.label)}
                onCheckedChange={() => toggleFacility(facility.label)}
              />
              <label
                htmlFor={facility.id}
                className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {facility.icon}
                {facility.label}
              </label>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
