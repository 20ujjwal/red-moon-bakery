import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuCategory from './components/MenuCategory'
import Specials from './components/Specials'
import AboutSection from "./components/AboutSection"; 
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen text-gray-800">
      <Navbar />
      <main>
        <Hero />
        <MenuCategory /> 
        <Specials />
         <AboutSection /> 
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
