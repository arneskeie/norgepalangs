import React, { useState } from 'react'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'

// ─── Verbatim from 02-restored-static/omoss.html ─────────────────────────────
const PEOPLE = [
  {
    id: 'Montarou',
    name: 'Marius Høver Montarou',
    alder: '23',
    oppvokst: 'Asker',
    studerer: 'Siv.ing. Industriell Design ved NTNU',
    etapper: ['Hele turen'],
    bio: [
      'Jeg har, etter å ha gått sammenhengende på skole siden jeg var 7 (16 år!), funnet ut at det er på tide med en pause for å gjøre det jeg helst vil. Og hva passer vel bedre å bruke to semestre til enn å krysse landet til beins? Det blir et vanvittig eventyr!',
      'Liker | studiet mitt, musikk, Saaben min, gode produkter, gitaren min, å være på langtur i skog, fjell og vidde, være oppe om natten, se film, å drikke melk med sjokolade i munnen, den første slurken av en glasscola.',
      'Liker ikke | å stå opp tidlig, sitte på buss i 8 timer, ting som ikke fungerer, dårlige løsninger, stress, å drikke vann istedenfor melk til frokost fordi jeg ikke har mer melk igjen, den siste slurken av en 1,5 liters colaflaske.',
      'Ellers er jeg på evig søken etter storørret, villmarkssus og nye utfordringer. Til daglig bor jeg i Trondheim og jobber på XXL ved siden av studiet.',
    ],
  },
  {
    id: 'Emil',
    name: 'Emil C. Engebrigtsen',
    alder: '25',
    oppvokst: 'Oslo / Ylvingen',
    studerer: 'Filosofi, Kinesisk',
    etapper: ['Etappe 1–4: Nordkapp – Fauske'],
    bio: [
      'Barndomsvenn og bror, om ikke i blodet så desto mer i ånden. Emil går fra Nordkapp til der vi måtte befinne oss etter ca syv-åtte uker, antageligvis et sted mellom Brønnøysund og Mo i Rana.',
    ],
  },
  {
    id: 'Vegard',
    name: 'Vegard Magnus Malme',
    alder: '23',
    oppvokst: 'Oslo',
    studerer: 'Bachelor i Idrett ved HiO',
    etapper: ['Etappe 5: Fauske (Sulitjelma) – Lønsdal'],
    bio: [
      'Jeg er en veldig aktiv person som driver mye med idrett og da spesielt fotball. Hverdagene mine bruker jeg på en bachelorgrad innenfor idrett, friluftsliv og helse. Før dette studiet var friluftsinteressen temmelig laber, men dette har endret seg de siste årene.',
    ],
  },
  {
    id: 'Jarle',
    name: 'Jarle Haagenrud',
    alder: '23',
    oppvokst: 'Asker',
    studerer: 'Siv.ing. Bygg & Konstruksjon ved NTNU',
    etapper: ['Etappe 6: Hegra – Gressli', 'Etappe 7: Lønsdal – Hattfjelldal'],
    bio: [
      'Som mindre var jeg mye på tur i marka hjemme i Asker. Interessen for å være ute førte meg etterhvert til Lofoten FHS hvor jeg gikk på linja Friluftsliv – Telemark/Klatring. I Lofoten fikk min interesse for klatring utvikle seg, og det er i de senere årene den som har ført meg ut i naturen.',
      'Da trives jeg best når tempoet skrus ned, presseningen spennes, og bålet varmer. Turene gir en veldig god avveksling fra hverdagen, og fører til ro og fred i sjela.',
    ],
  },
  {
    id: 'Andreas',
    name: 'Andreas Økland',
    alder: '23',
    oppvokst: 'Asker',
    studerer: 'Siv.ing. Produktutvikling & Produksjon ved NTNU',
    etapper: ['Etappe 6: Hegra – Gressli'],
    bio: [
      'Er til daglig kaptein i innespeideren og har etter snart fire år i Trondheim fortsatt ikke satt mine bein i Bymarka. Jeg hadde ingen tro på at Marius skulle gjennomføre NPL-prosjektet sitt når han først nevnte det, og jeg er mest med for å sjekke at han snakker sant.',
      'Etter å ha vært med på en ukesetappe i høst håper jeg på å også rekke en to-ukersetappe til våren.',
    ],
  },
  {
    id: 'Truls',
    name: 'Truls Stende',
    alder: '23',
    oppvokst: 'Asker',
    studerer: 'Statsvitenskap',
    etapper: ['Oppvarmingstur i Finland', 'Etappe 10: Tydal – Elgå'],
    bio: [
      'Min interesse for fisking begynte ved Høymyrdammen, et par hundre meter fra boligfeltet hvor jeg og Marius vokste opp. Fiskeinteressen utviklet seg videre til friluftsinteresse, og de siste fire sommerene har jeg og Marius vært på lange turer på Finnmarksvidda, i grensetraktene mellom Norge og Sverige, og nå sist en måned ved Inarisjøen. Jeg skal delta på noen våretapper.',
    ],
  },
  {
    id: 'Sverre',
    name: 'Sverre Wiik Øberg',
    alder: '25',
    oppvokst: 'Oslo',
    studerer: 'Siv.ing. Industriell Design ved NTNU',
    etapper: ['Etappe 11 del I: Elgå – Ringebu', 'Etappe 11 del II: Ringebu – Fagernes', 'Etappe 12: Fagernes – Geilo'],
    bio: [
      'Turglad herremann som liker meg like godt til lands som til vanns. Har alltid vært en aktiv fyr, stått mye på ski, kjørt brett og vært mye på turer. Tar gjerne rollen som kokk og kaffimeister, men er dugendes til å fikse det aller meste!',
      'Har jobbet, bygget hus og studert med Marius.',
      'Liker | Dingser, mac\'en, bandana, alle slags prosjekt, en god bok, brettspill og god kaffe, og ei viss frøken fra Sunnmøre...',
    ],
  },
  {
    id: 'Rasmus',
    name: 'Rasmus Bøckmann',
    alder: null,
    oppvokst: null,
    studerer: null,
    etapper: ['Etappe 8: Hattfjelldal – Nordli'],
    bio: ['Omtale kommer...'],
  },
  {
    id: 'Anders',
    name: 'Anders Engum',
    alder: null,
    oppvokst: null,
    studerer: null,
    etapper: ['Etappe 9: Nordli – Meråker'],
    bio: ['Omtale kommer...'],
  },
  {
    id: 'Karin',
    name: 'Karin Olsson',
    alder: null,
    oppvokst: null,
    studerer: null,
    etapper: ['Etappe 13: Ustaoset – Haukeliseter', 'Etappe 14: Haukeliseter – Ljosland'],
    bio: ['Omtale kommer...'],
  },
]

function PersonCard({ person, base, isActive, onSelect }) {
  return (
    <article
      className={`bg-slate-900 rounded-lg p-6 cursor-pointer transition-colors ${
        isActive ? 'ring-2 ring-orange-400/40' : 'hover:bg-slate-800/70'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        <img
          src={`${base}images/profiles/${person.id}.jpg`}
          alt={person.name}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0 grayscale"
          style={isActive ? { filter: 'none' } : undefined}
        />
        <div className="min-w-0">
          <h3 className="font-serif font-medium text-base text-slate-100 leading-tight">{person.name}</h3>
          <div className="mt-2 space-y-1">
            {person.etapper.map((e) => (
              <p key={e} className="font-sans font-medium text-xs text-orange-400 uppercase tracking-widest">{e}</p>
            ))}
          </div>
        </div>
      </div>

      {isActive && (
        <div className="mt-6 pt-6 border-t border-white/[.06]">
          {(person.alder || person.oppvokst || person.studerer) && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mb-5">
              {person.alder && (
                <>
                  <dt className="font-sans font-medium text-xs text-slate-500 uppercase tracking-widest">Alder</dt>
                  <dd className="font-sans text-sm text-slate-300">{person.alder}</dd>
                </>
              )}
              {person.oppvokst && (
                <>
                  <dt className="font-sans font-medium text-xs text-slate-500 uppercase tracking-widest">Oppvokst i</dt>
                  <dd className="font-sans text-sm text-slate-300">{person.oppvokst}</dd>
                </>
              )}
              {person.studerer && (
                <>
                  <dt className="font-sans font-medium text-xs text-slate-500 uppercase tracking-widest">Studerer</dt>
                  <dd className="font-sans text-sm text-slate-300">{person.studerer}</dd>
                </>
              )}
            </dl>
          )}
          <div className="space-y-3">
            {person.bio.map((para, i) => (
              <p key={i} className="font-sans text-[1.125rem] text-slate-400 leading-normal text-pretty">{para}</p>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default function OmOss() {
  const base = import.meta.env.BASE_URL
  const [activeId, setActiveId] = useState('Montarou')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader variant="compact" currentPage="omoss.html" />
      <main className="max-w-content mx-auto px-6 py-12 md:py-20">
        <p className="eyebrow mb-4">Om oss</p>
        <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] text-slate-50 leading-[0.95] mb-4">
          Folka bak turen.
        </h1>
        <p className="section-description max-w-[560px] mb-14 text-pretty">
          Norge på langs ble gått av én person, men aldri alene. Ti personer bidro til eventyret — som turledsagere, venner og motivatorer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PEOPLE.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              base={base}
              isActive={activeId === person.id}
              onSelect={() => setActiveId(activeId === person.id ? null : person.id)}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
