import { ContactForm } from '@/components/ContactFrom'
import { ContactIntro } from '@/components/contactIntro'
import { Footer } from '@/components/footer'
import { Location } from '@/components/location'
import { NavWrapper } from '@/components/NavWrapper'
import React from 'react'

function page() {
  return (
    <>
      <NavWrapper />
      <main className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
        <ContactIntro />
        <Location />
        <ContactForm />
        <Footer />
      </main>
    </>
  )
}

export default page
