"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Icons included directly or from lucide-react

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "book">("contact");
  const API_URL = "https://h0ko7cn4ja.execute-api.eu-west-2.amazonaws.com";

  // Contact Form
  const { register: registerContact, handleSubmit: handleContactSubmit, reset: resetContact, formState: { errors: contactErrors, isSubmitting: contactSubmitting } } = useForm();
  const [contactStatus, setContactStatus] = useState<string | null>(null);

  const onContactSubmit = async (data: any) => {
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setContactStatus("Message sent successfully! We'll get back to you soon.");
        resetContact();
      } else {
        setContactStatus("Something went wrong. Please try again.");
      }
    } catch (e) {
      setContactStatus("Error sending message.");
    }
  };

  // Booking Form
  const { register: registerBooking, handleSubmit: handleBookingSubmit, reset: resetBooking, formState: { errors: bookingErrors, isSubmitting: bookingSubmitting } } = useForm();
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const onBookingSubmit = async (data: any) => {
    try {
      const res = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setBookingStatus("Booking request received! We'll confirm via email/phone shortly.");
        resetBooking();
      } else {
        setBookingStatus("Something went wrong. Please try again.");
      }
    } catch (e) {
      setBookingStatus("Error sending booking request.");
    }
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-olive mb-4">Get in Touch / Book a Table</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you. Whether it's a question, a booking, or just a hello.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="bg-cream p-8 rounded-xl shadow-sm border border-sand">
            <h2 className="text-2xl font-serif font-bold text-brown mb-6">Visit Us</h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-olive mt-1" />
                <div>
                  <p className="font-semibold">3a Atholl Road</p>
                  <p>Pitlochry, PH16 5BX</p>
                  <p>Scotland</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-olive" />
                <p>01796 473 000</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-olive" />
                <a href="mailto:hello@jessiescafe.com" className="hover:underline">hello@jessiescafe.com</a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-olive" />
              <h2 className="text-2xl font-serif font-bold text-brown">Opening Hours</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between border-b border-gray-100 pb-2"><span>Mon - Thu</span> <span>9:00 AM - 4:00 PM</span></li>
              <li className="flex justify-between border-b border-gray-100 pb-2"><span>Fri - Sat</span> <span>9:00 AM - 9:00 PM</span></li>
              <li className="flex justify-between border-b border-gray-100 pb-2"><span>Sunday</span> <span>10:00 AM - 4:00 PM</span></li>
            </ul>
            <p className="mt-6 text-sm text-olive italic">Kitchen closes 30 mins before closing time.</p>
          </div>
        </div>

        {/* Forms */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-sand">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`pb-4 px-6 font-semibold text-lg transition-colors ${activeTab === 'contact' ? 'text-olive border-b-2 border-olive' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setActiveTab('contact')}
            >
              Send Message
            </button>
            <button
              className={`pb-4 px-6 font-semibold text-lg transition-colors ${activeTab === 'book' ? 'text-olive border-b-2 border-olive' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setActiveTab('book')}
            >
              Book a Table
            </button>
          </div>

          {activeTab === 'contact' ? (
            <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input {...registerContact("name", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" placeholder="Your Name" />
                {contactErrors.name && <span className="text-red-500 text-sm">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input {...registerContact("email", { required: true })} type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" placeholder="your@email.com" />
                {contactErrors.email && <span className="text-red-500 text-sm">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea {...registerContact("message", { required: true })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" placeholder="How can we help?" />
                {contactErrors.message && <span className="text-red-500 text-sm">Required</span>}
              </div>
              <button disabled={contactSubmitting} type="submit" className="w-full py-3 bg-olive text-white font-bold rounded-md hover:bg-brown transition-colors shadow-md disabled:opacity-50">
                {contactSubmitting ? "Sending..." : "Send Message"}
              </button>
              {contactStatus && <p className="text-center font-medium text-olive">{contactStatus}</p>}
            </form>
          ) : (
            <form onSubmit={handleBookingSubmit(onBookingSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input {...registerBooking("name", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" placeholder="Your Name" />
                {bookingErrors.name && <span className="text-red-500 text-sm">Required</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input {...registerBooking("date", { required: true })} type="date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" />
                  {bookingErrors.date && <span className="text-red-500 text-sm">Required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input {...registerBooking("time", { required: true })} type="time" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" />
                  {bookingErrors.time && <span className="text-red-500 text-sm">Required</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <input {...registerBooking("guests", { required: true, min: 1 })} type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" placeholder="2" />
                  {bookingErrors.guests && <span className="text-red-500 text-sm">Required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input {...registerBooking("phone", { required: true })} type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" placeholder="07654..." />
                  {bookingErrors.phone && <span className="text-red-500 text-sm">Required</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input {...registerBooking("email", { required: true })} type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-olive focus:border-transparent outline-none transition-all" placeholder="your@email.com" />
                {bookingErrors.email && <span className="text-red-500 text-sm">Required</span>}
              </div>

              <button disabled={bookingSubmitting} type="submit" className="w-full py-3 bg-brown text-white font-bold rounded-md hover:bg-olive transition-colors shadow-md disabled:opacity-50">
                {bookingSubmitting ? "Booking..." : "Request Booking"}
              </button>
              {bookingStatus && <p className="text-center font-medium text-brown">{bookingStatus}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
