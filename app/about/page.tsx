import { AboutContent } from '@/components/AboutContent'
import { AboutIntro } from '@/components/AboutIntro'
import { AboutTeam } from '@/components/AboutTeam'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/Navigation'
import React from 'react'

function page() {
  return (
    <>
    <Navigation />
    <main className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
        <AboutIntro />
        <AboutContent />
        <AboutTeam />
        <Footer />
    </main>
    </>
  )
}

export default page