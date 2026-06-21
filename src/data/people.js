// ─── Verbatim from 02-restored-static/omoss.html ─────────────────────────────
// Etappe name strings are normalized to match the canonical fra/til values in
// Reiserute.jsx so cross-referencing works without string-matching failures.
// Corrections applied:
//   Jarle  E7: 'Lønsdal – Hattfjelldal' → 'Lønsdal – Umbukta'  (Umbukta is official til)
//   Rasmus E8: 'Hattfjelldal – Nordli'  → 'Umbukta – Nordli'   (Umbukta is official fra)
//   Anders E9: 'Nordli – Meråker'       → 'Sørli – Meråker'    (Sørli is official fra)
//   Vegard E5: 'Fauske (Sulitjelma) – Lønsdal' → 'Sulitjelma – Lønsdal' (canonical fra)
//   Truls E10: 'Tydal – Elgå' → 'Tydal (Gressli) – Elgå'      (canonical fra)
// Flagged, not yet changed:
//   Emil  E1-4: 'Etappe 1–4: Nordkapp – Fauske' — range format; won't match individual
//   canonical etappe strings. Needs a decision: keep compact display string vs expand to
//   4 separate entries ['Etappe 1: Nordkapp – Skaidi', ...] for reliable cross-referencing.

export const PEOPLE = [
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
    etapper: ['Etappe 5: Sulitjelma – Lønsdal'],
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
    etapper: ['Etappe 6: Hegra – Gressli', 'Etappe 7: Lønsdal – Umbukta'],
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
    etapper: ['Oppvarmingstur i Finland', 'Etappe 10: Tydal (Gressli) – Elgå'],
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
      "Liker | Dingser, mac'en, bandana, alle slags prosjekt, en god bok, brettspill og god kaffe, og ei viss frøken fra Sunnmøre...",
    ],
  },
  {
    id: 'Rasmus',
    name: 'Rasmus Bøckmann',
    alder: null,
    oppvokst: null,
    studerer: null,
    etapper: ['Etappe 8: Umbukta – Nordli'],
    bio: ['Omtale kommer...'],
  },
  {
    id: 'Anders',
    name: 'Anders Engum',
    alder: null,
    oppvokst: null,
    studerer: null,
    etapper: ['Etappe 9: Sørli – Meråker'],
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
