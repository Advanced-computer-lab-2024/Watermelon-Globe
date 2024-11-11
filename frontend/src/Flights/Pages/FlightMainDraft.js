'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Globe, Menu, Plane, Building2, Briefcase } from 'lucide-react'

export default function Component() {
  const [tripType, setTripType] = useState('one-way')
  const [passengers, setPassengers] = useState('1 Adult')
  const [cabinClass, setCabinClass] = useState('Economy')
  const [paymentTypes, setPaymentTypes] = useState('2 Payment Types')

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-2xl">wego</Link>
          <div className="flex items-center gap-4">
            <button className="text-white flex items-center gap-2">
              <Globe className="w-4 h-4" />
              EN
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-white">EGP</button>
            <button className="text-white px-4 py-1">LOGIN</button>
            <button className="bg-[#4FA52C] text-white px-4 py-1 rounded">GET STARTED</button>
            <button className="text-white"><Menu className="w-6 h-6" /></button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[600px]">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Forest background"
          width={1920}
          height={600}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="max-w-7xl mx-auto pt-32 px-4">
            <h1 className="text-white text-4xl font-bold mb-12">Discover the real value of travel</h1>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex gap-4 mb-4">
                <button className={`flex items-center gap-2 px-4 py-2 ${tripType === 'flights' ? 'text-[#4FA52C]' : 'text-gray-600'}`}>
                  <Plane className="w-5 h-5" />
                  Flights
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600">
                  <Building2 className="w-5 h-5" />
                  Hotels
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600">
                  <Briefcase className="w-5 h-5" />
                  WegoPro Business Travel
                  <span className="bg-orange-500 text-white text-xs px-1 rounded">NEW</span>
                </button>
              </div>

              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setTripType('one-way')}
                  className={`px-4 py-2 rounded-full ${tripType === 'one-way' ? 'bg-[#4FA52C] text-white' : 'text-gray-600'}`}
                >
                  One-way
                </button>
                <button
                  onClick={() => setTripType('round-trip')}
                  className={`px-4 py-2 rounded-full ${tripType === 'round-trip' ? 'bg-[#4FA52C] text-white' : 'text-gray-600'}`}
                >
                  Round-trip
                </button>
                <button
                  onClick={() => setTripType('multi-city')}
                  className={`px-4 py-2 rounded-full ${tripType === 'multi-city' ? 'bg-[#4FA52C] text-white' : 'text-gray-600'}`}
                >
                  Multi-city
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="From"
                  className="w-full p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="To"
                  className="w-full p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="Mon, 11 Nov 2024"
                  className="w-full p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="Return"
                  className="w-full p-3 border rounded"
                  disabled={tripType === 'one-way'}
                />
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  Direct flight only
                </label>
                
                <button className="px-4 py-2 border rounded flex items-center gap-2">
                  {passengers}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <button className="px-4 py-2 border rounded flex items-center gap-2">
                  {cabinClass}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <button className="px-4 py-2 border rounded flex items-center gap-2">
                  {paymentTypes}
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button className="bg-[#4FA52C] text-white px-8 py-2 rounded ml-auto">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border-y border-yellow-100 p-4 text-sm text-yellow-800">
        <div className="max-w-7xl mx-auto">
          Please be aware that the local Egyptian banks have imposed a restriction on the use of local debit and credit cards for international purchases. Kindly use an international card if possible. We regret the inconvenience caused.
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Top travel app icon"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>
            <h3 className="font-semibold mb-2">Top travel app in Egypt</h3>
            <p className="text-gray-600 text-sm">Highly rated in App Store & Google Play</p>
          </div>
          <div>
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Shop icon"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>
            <h3 className="font-semibold mb-2">Shop with confidence</h3>
            <p className="text-gray-600 text-sm">No hidden fees, taxes or other nasty surprises</p>
          </div>
          <div>
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Payment icon"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>
            <h3 className="font-semibold mb-2">Pay the way you want</h3>
            <p className="text-gray-600 text-sm">See only sellers who support your preferred methods</p>
          </div>
          <div>
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Booking icon"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>
            <h3 className="font-semibold mb-2">Instant booking</h3>
            <p className="text-gray-600 text-sm">For selected sellers, book with just a couple of clicks</p>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="max-w-7xl mx-auto pb-16 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Stories</h2>
          <Link href="/stories" className="text-[#4FA52C]">
            See all stories
          </Link>
        </div>
      </div>
    </div>
  )
}