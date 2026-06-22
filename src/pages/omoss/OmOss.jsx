import React, { useState } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import BottomSheet from '../../components/BottomSheet.jsx'
import SheetContent from '../../components/SheetContent.jsx'
import { PEOPLE } from '../../data/people.js'

const BASE = import.meta.env.BASE_URL

// Splits "Etappe N[ del X]: Route" at the first colon.
// Strings with no colon (e.g. "Hele turen") are returned fully as prefix.
function parseEtappe(str) {
  const colonIdx = str.indexOf(':')
  if (colonIdx < 0) return { prefix: str, route: '' }
  return { prefix: str.slice(0, colonIdx + 1), route: str.slice(colonIdx + 1) }
}

// Two-tone: "Etappe N:" prefix in orange-400, route in slate-500.
function EtappeLabel({ text }) {
  const { prefix, route } = parseEtappe(text)
  return (
    <>
      <span className="text-orange-400">{prefix}</span>
      {route && <span className="text-slate-500">{route}</span>}
    </>
  )
}

function PersonCard({ person, onSelect }) {
  return (
    <article
      className="bg-slate-900 rounded-lg p-5 md:p-6 cursor-pointer hover:bg-slate-800/70 transition-colors group"
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        {/* Circular thumbnail — wrapper clips overflow so the scaled img hides the
            3–4px white border baked into the source JPGs (70×70px source). scale-[1.15]
            baseline pushes the white edge outside the 56px clip circle; group-hover
            adds the hover zoom on top. */}
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={`${BASE}images/profiles/${person.id}.jpg`}
            alt={person.name}
            className="w-full h-full object-cover scale-[1.15] transition-transform duration-300 group-hover:scale-[1.21] will-change-transform"
          />
        </div>
        <div className="min-w-0">
          <h3 className="card-title text-slate-100">
            {person.name}
          </h3>
          <div className="mt-2 space-y-1">
            {person.etapper.map((e) => (
              <p key={e} className="font-sans font-medium text-xs uppercase tracking-widest">
                <EtappeLabel text={e} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function PersonBio({ bio }) {
  return (
    <div className="space-y-3">
      {bio.map((para, i) => (
        <p key={i} className="font-sans text-[1.125rem] text-slate-300 leading-normal text-pretty">{para}</p>
      ))}
    </div>
  )
}

export default function OmOss() {
  const [selectedPerson, setSelectedPerson] = useState(null)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="omoss.html" />
      <main className="max-w-content mx-auto px-6 py-12 md:py-20">
        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-4">
          Om oss
        </h1>
        <p className="section-description mb-14 text-pretty">
          Norge på langs ble gått av én person, men aldri alene. Ti personer bidro til eventyret — som turledsagere, venner og motivatorer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PEOPLE.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onSelect={() => setSelectedPerson(person)}
            />
          ))}
        </div>
      </main>

      <BottomSheet
        open={selectedPerson !== null}
        onOpenChange={(isOpen) => { if (!isOpen) setSelectedPerson(null) }}
        ariaLabel={selectedPerson?.name ?? 'Person'}
      >
        {selectedPerson && (
          <SheetContent
            layout="profile"
            image={`${BASE}images/profiles/${selectedPerson.id}.jpg`}
            title={selectedPerson.name}
            subtitle={
              /* tracking-[0.1em] overrides .eyebrow's tracking-[0.2em] (inherited).
                 <br /> between etappes keeps all content inline-valid inside <p>. */
              <span className="tracking-[0.1em]">
                {selectedPerson.etapper.map((e, i) => (
                  <React.Fragment key={e}>
                    {i > 0 && <br />}
                    <EtappeLabel text={e} />
                  </React.Fragment>
                ))}
              </span>
            }
            meta={[
              { label: 'Alder', value: selectedPerson.alder },
              { label: 'Oppvokst i', value: selectedPerson.oppvokst },
              { label: 'Studerer', value: selectedPerson.studerer },
            ]}
            body={<PersonBio bio={selectedPerson.bio} />}
          />
        )}
      </BottomSheet>

      <SiteFooter />
    </div>
  )
}
