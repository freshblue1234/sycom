import  { ArrowRight } from 'lucide-react'
import nshutiMoiseImg from '../assets/ceo.jpg'
import murengeziSamuelImg from '../assets/Murengezi Samuel,company analysist and consoler.jpg'
import ishimweShadadImg from '../assets/Ishimwe Shadad ,developer.jpg'
import barakaSalvatorImg from '../assets/Baraka salvator,copany representative.jpg'

export default function Team() {
  const team = [
    {
      name: "Nshuti Moise",
      role: "CEO and Founder",
      description: "Visionary leader with a deep passion for technology, driving Sycom Industry's mission to shape the future through smart solutions.",
      portfolio: "https://nshutimoise.vercel.app/",
      image: nshutiMoiseImg
    },
    {
      name: "Murengezi Samuel",
      role: "Company Analyst and Consultant",
      description: "Strategic thinker who bridges tech with real-world solutions. He ensures Sycom Industry delivers measurable value and user-centric innovation.",
      portfolio: "https://blvpeppa.vercel.app/",
      image: murengeziSamuelImg
    },
    
    {
      name: "Baraka Salvator",
      role: "Company Representative",
      description: "Builds strong external relationships and communicates Sycom Industry's value to the world. Handles partnerships and public representation.",
      portfolio: "https://barakasalvator.netlify.app",
      image: barakaSalvatorImg
    },
    {
      name: "Ishimwe Shadad",
      role: "Developing Manager",
      description: "Expert in scalable systems and frontend/backend synergy. Leads the development process to turn ideas into functional, beautiful software.",
      portfolio: "https://shadadportfolio.netlify.app",
      image: ishimweShadadImg
    }
  ]

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600">The experts behind our success</p>
        </div>

        <div className="flex overflow-x-auto snap-x gap-6 px-4 py-6 scrollbar-hide">
          {team.map((member, index) => (
            <div key={index} className="snap-center shrink-0 bg-white shadow-lg rounded-xl p-6 w-80">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-gray-800 text-center">{member.name}</h3>
              <p className="text-sm text-gray-500 text-center mb-3">{member.role}</p>
              <p className="text-sm text-gray-600 mb-4 text-center">{member.description}</p>
              <div className="text-center">
                <a 
                  href={member.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-dark-blue-600 text-white px-3 py-1 rounded hover:bg-dark-blue-700 transition text-sm"
                >
                  View Portfolio <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
 