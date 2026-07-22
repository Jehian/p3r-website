import { useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/persona 3 reload pause screen [loop].mp4'
import main2 from './assets/far lout.mp4'
import P3Menu from './P3Menu'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import MusicPlayer from './MusicPlayer'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  const [videoLoaded, setVideoLoaded] = useState(false)
  return (
    <div id="menu-screen">
      <video 
        src={menuVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
        onPlay={() => setVideoLoaded(true)}
        style={{
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out'
        }}
      />
      <P3Menu onNavigate={(page) => {
        if (page === 'github') {
          window.open('https://github.com/Jehian', '_blank')
        } else if (page === 'youtube') {
          window.open('https://www.youtube.com/@admetxt', '_blank')
        } else {
          navigate(`/${page}`)
        }
      }} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <AnimatedRoutes />
      <MusicPlayer />
    </>
  )
}
