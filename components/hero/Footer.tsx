import React from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  MapPin, 
  DollarSign, 
  UserPlus,
  Info, 
  Phone, 
  Briefcase, 
  Shield, 
  FileText,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'
import { LibTrackLogo1 } from '../logo'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <LibTrackLogo1 />
            <p className="text-gray-400">
              Your gateway to quiet study spaces. Find the perfect environment for 
              focused learning and productivity.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4 pt-4">
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/explore" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Explore
                </Link>
              </li>
          
              <li>
                <Link 
                  href="/auth/register" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about-us" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Info className="w-4 h-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact-us" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Contact
                </Link>
              </li>
            
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-of-service" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>


        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} LibTrack. All rights reserved.
            </p>
   
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer