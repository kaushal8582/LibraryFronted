// app/contact/page.tsx
'use client';

import Footer from '@/components/hero/Footer';
import Nav from '@/components/hero/Nav';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  User, 
  MailIcon,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "support@libtrack.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-6pm PST"
    },
    // {
    //   icon: <MapPin className="w-6 h-6" />,
    //   title: "Office",
    //   details: "123 Innovation Drive",
    //   subDetails: "Suite 404, Tech Park, CA 94043",
    //   description: "Schedule a visit"
    // }
  ];

  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'press', label: 'Press & Media' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
        <Nav/>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <MessageSquare className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you. Fill out the form below or use our contact details to get in touch.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="lg:pr-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
              <div className="w-24 h-1 bg-blue-600"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Send another message
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MailIcon className="w-4 h-4" />
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                        <MailIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4" />
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:pl-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Reach Us</h2>
              <div className="w-24 h-1 bg-blue-600"></div>
              <p className="text-gray-600 mt-4">
                Prefer to reach out directly? Here are all the ways you can get in touch with our team.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-600">
                        {method.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-gray-900 font-medium mb-1">{method.details}</p>
                      {method.subDetails && (
                        <p className="text-gray-600">{method.subDetails}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{method.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
            {/* <div className="mt-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Our Office</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">123 Innovation Drive</p>
                    <p className="text-gray-600">Suite 404, Tech Park, CA 94043</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-gray-900 font-medium">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  </div>
                </div>
              </div>
              
            
              <div className="mt-6 bg-white rounded-xl p-4 shadow-inner">
                <div className="aspect-video bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 font-medium">Interactive Map</p>
                    <p className="text-gray-400 text-sm">Location display</p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Response Time Info */}
            {/* <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quick Response Guarantee</h4>
                  <p className="text-sm text-gray-600">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* FAQ Preview */}
        {/* <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Check out our FAQ section for quick answers to common questions about LibTrack.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors">
            Visit FAQ Center
            <ArrowRight className="w-4 h-4" />
          </button>
        </div> */}
      </div>

      <Footer/>
    </div>
  );
}