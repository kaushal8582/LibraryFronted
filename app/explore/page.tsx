'use client'

import React, { useState } from 'react'
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
  Check
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Footer } from 'react-day-picker'
import Nav from '@/components/hero/Nav'

const libraries = [
  {
    id: 1,
    name: "The Book Nook",
    distance: "1.2 km away",
    price: "¥1800 / month",
    rating: 4.8,
    facilities: ["Wi-Fi", "AC", "Parking", "Coffee"],
    openNow: true,
    seatsAvailable: 12,
    description: "A cozy library with vintage decor and quiet reading corners",
    image: "bg-gradient-to-br from-amber-100 to-orange-100"
  },
  {
    id: 2,
    name: "Scholar's Haven",
    distance: "2.5 km away",
    price: "¥1500 / month",
    rating: 4.5,
    facilities: ["Wi-Fi", "AC", "24/7 Access"],
    openNow: true,
    seatsAvailable: 8,
    description: "Modern study space with group study rooms",
    image: "bg-gradient-to-br from-blue-100 to-cyan-100"
  },
  {
    id: 3,
    name: "The Reader's Corner",
    distance: "0.8 km away",
    price: "¥2200 / month",
    rating: 4.9,
    facilities: ["Wi-Fi", "AC", "Parking", "Printing"],
    openNow: false,
    seatsAvailable: 6,
    description: "Premium library with silent zones and private cabins",
    image: "bg-gradient-to-br from-emerald-100 to-teal-100"
  },
  {
    id: 4,
    name: "Knowledge Hub",
    distance: "3.1 km away",
    price: "¥1200 / month",
    rating: 4.3,
    facilities: ["Wi-Fi", "Coffee", "Group Study"],
    openNow: true,
    seatsAvailable: 15,
    description: "Community library with extensive book collection",
    image: "bg-gradient-to-br from-violet-100 to-purple-100"
  },
  {
    id: 5,
    name: "Silent Study Loft",
    distance: "1.8 km away",
    price: "¥2500 / month",
    rating: 4.7,
    facilities: ["Wi-Fi", "AC", "24/7 Access", "Printing", "Coffee"],
    openNow: true,
    seatsAvailable: 4,
    description: "Exclusive silent study environment",
    image: "bg-gradient-to-br from-rose-100 to-pink-100"
  },
  {
    id: 6,
    name: "Campus Library",
    distance: "0.5 km away",
    price: "¥900 / month",
    rating: 4.2,
    facilities: ["Wi-Fi", "AC", "Study Materials"],
    openNow: false,
    seatsAvailable: 20,
    description: "University-affiliated library with academic resources",
    image: "bg-gradient-to-br from-sky-100 to-blue-100"
  }
]

const facilities = [
  { id: "wifi", label: "Wi-Fi", icon: <Wifi className="w-4 h-4" /> },
  { id: "ac", label: "AC", icon: <Snowflake className="w-4 h-4" /> },
  { id: "parking", label: "Parking", icon: <Users className="w-4 h-4" /> },
  { id: "coffee", label: "Coffee", icon: <Coffee className="w-4 h-4" /> },
  { id: "printing", label: "Printing", icon: <BookOpen className="w-4 h-4" /> },
  { id: "power", label: "Power Outlets", icon: <Battery className="w-4 h-4" /> },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([500, 5000])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [minRating, setMinRating] = useState(4)
  const [openNow, setOpenNow] = useState(true)
  const [location, setLocation] = useState('')

  const filteredLibraries = libraries.filter(library => {
    const matchesSearch = library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         library.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = parseInt(library.price.replace(/[^0-9]/g, '')) >= priceRange[0] &&
                        parseInt(library.price.replace(/[^0-9]/g, '')) <= priceRange[1]
    const matchesRating = library.rating >= minRating
    const matchesOpenNow = !openNow || library.openNow
    const matchesFacilities = selectedFacilities.length === 0 || 
                             selectedFacilities.every(facility => 
                               library.facilities.includes(facility))
    const matchesLocation = !location || 
                           library.distance.includes(location) || 
                           library.name.toLowerCase().includes(location.toLowerCase())

    return matchesSearch && matchesPrice && matchesRating && matchesOpenNow && 
           matchesFacilities && matchesLocation
  })

  const toggleFacility = (facilityId: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facilityId)
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setPriceRange([500, 5000])
    setSelectedFacilities([])
    setMinRating(4)
    setOpenNow(true)
    setLocation('')
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto">
          <div className="flex items-center justify-between ">
          <Nav/>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filterss
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
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
              </SheetContent>
            </Sheet>
          </div>

         
        </div>
      </div>

      <div className="container mx-auto px-4 py-2">
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
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by library name, area, or facilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-gray-200 focus-visible:ring-blue-500"
            />
          </div>
            
            <div className="flex items-center justify-between mb-8">
              
              <div>
                
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Libraries
                  <span className="text-gray-500 ml-2">({filteredLibraries.length})</span>
                </h2>
                <p className="text-gray-600 mt-1">Based on your preferences</p>
              </div>
              
              {/* Active Filters */}
              <div className="flex flex-wrap gap-2">
                {selectedFacilities.length > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedFacilities.length} facilities
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedFacilities([])} />
                  </Badge>
                )}
                {openNow && (
                  <Badge variant="secondary" className="gap-1">
                    Open Now
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setOpenNow(false)} />
                  </Badge>
                )}
                {minRating > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    Rating {minRating}+
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setMinRating(0)} />
                  </Badge>
                )}
              </div>
            </div>

            {/* Libraries Grid */}
            {filteredLibraries.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No libraries found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLibraries.map((library) => (
                  <Card key={library.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200">
                    <div className={`${library.image} h-48 relative`}>
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={library.openNow ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                          {library.openNow ? (
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
                          {library.rating}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{library.name}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {library.distance}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{library.price}</div>
                          <div className="text-sm text-gray-500">per month</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{library.description}</p>
                      
                      {/* Facilities */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {library.facilities.map((facility, idx) => {
                          const facilityIcon = facilities.find(f => f.label === facility)?.icon
                          return (
                            <Badge key={idx} variant="outline" className="gap-1">
                              {facilityIcon}
                              {facility}
                            </Badge>
                          )
                        })}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{library.seatsAvailable} seats available</span>
                        </div>
                        <Button className="group-hover:bg-blue-600 transition-colors">
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


    </div>
  )
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
  clearFilters
}: any) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filterss
        </h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
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
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Fee Range
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
            <span>¥{priceRange[0]}</span>
            <span>¥{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Open Now */}
      <div className="space-y-3">
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
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <Star className="w-4 h-4" />
          Rating
        </h4>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setMinRating(rating + 1)}
              className="flex-1"
            >
              {rating}+
            </Button>
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
  )
}