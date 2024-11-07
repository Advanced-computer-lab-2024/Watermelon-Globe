"use client"

import { useState, useEffect } from 'react'
import { Calendar, Clock, DollarSign, Globe, MapPin, Star, Users, Accessibility } from "lucide-react"

import '../../pages/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../pages/Navbar.css';
import Navbar from '../../pages/Navbar.jsx';
import ItinerarySlider from '../Components/ItenerarySlider.js'


export default function YourMainPage() {
  return (
    <div>
      <header className="bg-white shadow-md">
        <Navbar />
      </header>
      <main>
        <ItinerarySlider />
      </main>
    </div>
  )
}
  
