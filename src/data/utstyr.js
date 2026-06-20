/**
 * Utstyr product data.
 *
 * Each item: { name, image?, body?, link? }
 *   image — filename under public/images/utstyr/ (no path prefix)
 *   body  — Norwegian description string
 *   link  — { href, label } or null
 *
 * Images sourced from 02-restored-static/images/utstyr/ (56 PNGs, transparent bg).
 * Two filenames were sanitised on copy:
 *   "Magellan eXplorist 500LE Handheld GPS1-01.png" → magellanGPS.png
 *   "BEVERPROGRIP+svart.png"                        → beverprogrip_svart.png
 * Fiske items have no images in the original source.
 */

export const CATEGORIES = [
  {
    id: 'kjokken',
    label: 'Kjøkkenhjørnet',
    items: [
      {
        name: 'Trangia Hard Anodized Ultralight 25-8 stormkjøkken',
        image: 'trangia258SK.png',
        body: 'Trangia 25-8 UL/HA er et komplett stormkjøkken i hardanodisert ultralett aluminium, beregnet for 3–4 personer. Settet inkluderer to gryter, stekepanne, lokk, vindskjerm, stativ, pottegrep og spritbrenner med reguleringsventil. Den harde anodiseringen gir god motstand mot riper og korrosjon. Produsert i Sverige av Trangia siden 1950-tallet.',
        link: { href: 'https://www.trangia.se', label: 'Trangia nettside' },
      },
      {
        name: 'Optimus Nova+ brenner ladd med parafin',
        image: 'optimus-nova-standard.png',
        body: 'Optimus Nova+ er en multifuel-brenner som kan bruke parafin, bensin og andre flytende brensler – ideelt for ekspedisjoner der gassbokser ikke er tilgjengelig. Brenneren fungerer pålitelig i ekstremt kaldt vær fordi flytende brensel ikke mister trykk slik gass gjør. Optimus er et svensk merke med lang historikk innen friluftsutstyr, nå del av Katadyn Group.',
        link: { href: 'https://www.katadyngroup.com', label: 'Optimus/Katadyn nettside' },
      },
      {
        name: 'Trangia brenselsflaske 1L',
        image: 'TrangiaBrenselflaskeSK.png',
        body: 'Trangias brenselsflaske på 1 liter er laget av HD-polyetylen med et patentert sikkerhetsventilsystem som forhindrer utilsiktet åpning under transport. Flasken tåler metanol, bensin og parafin og er designet for alle Trangia-kokeapparater. 1-liters størrelsen gir god rekkevidde mellom påfylling på langtur.',
        link: { href: 'https://www.trangia.se', label: 'Trangia nettside' },
      },
      {
        name: 'Sarek termos',
        image: 'SarekTermosSK.png',
        body: 'Sarek er en termos fra svenske Hammarplast, laget av rustfritt 18/8-stål med god isolasjonsevne som holder innholdet varmt i mange timer. Hammarplast har produsert plastikk- og stålprodukter siden 1947 og er en del av Orthex Group. En god termos er uunnværlig på vinterekspedisjoner der varmt vann tilgjengelig sparer tid og brensel.',
        link: { href: 'https://www.hammarplast.com', label: 'Hammarplast nettside' },
      },
      {
        name: 'Tallrikslåda',
        image: 'Tallrikslada.png',
        body: 'Tallrikslåda er et klassisk skandinavisk friluftsbestikk der boks og lokk begge fungerer som tallerken eller matboks. Settet rommer typisk to dype tallerkener, bolle, bestikk og salt- og pepperstrøm. Det lages i BPA-fri plast, er kompakt å pakke ned og er produsert i Sverige – et tidløst valg for turer med langvarig matlagingsbehov.',
        link: { href: 'https://edvardson.se/en/products/tallrikslada-outdoor-made-in-sweden', label: 'Edvardson – Tallrikslåda' },
      },
      {
        name: 'Quechua alu. drikkeflaske',
        image: 'G553.png',
        body: 'Quechua er Decathlons eget friluftsmerkevare, kjent for solid og rimelig turmateriell. Aluminiumsflasken er lett og holdbar, tåler frysing bedre enn termos-varianter og er mer miljøvennlig enn plast. En pålitelig og enkel drikkeflaske for aktive turer i norsk natur.',
        link: { href: 'https://www.decathlon.no', label: 'Decathlon nettside' },
      },
      {
        name: 'Nalgene Lexanflaske med thermocover',
        image: 'nal_lex_set_1l.png',
        body: 'Nalgene Lexan-flasker er laget av polykarbonat og er legendariske i friluftssammenheng for sin ekstremt høye holdbarhet og lekkasjefrie konstruksjon. Den medfølgende neopren-thermocover holder innholdet varmere om vinteren og kjøligere om sommeren, og beskytter mot støt. Lexan tåler frysing, kokende vann og kraftige slag uten å sprekke.',
        link: { href: 'https://www.nalgene.com', label: 'Nalgene nettside' },
      },
    ],
  },
  {
    id: 'bekledning',
    label: 'Bekledning',
    items: [
      {
        name: 'Lowe Alpine Multitasker Pro Balaclava',
        image: 'Lowe.png',
        body: 'Lowe Alpine er et britisk merke spesialisert på teknisk fjell- og klatrebekledning. Multitasker Pro-balaklavaen er et allsidig hodeplagget som kan brukes som lue, ansiktsmaske eller halsrør avhengig av behov, laget i teknisk fleeceblanding for rask tørking og god isolasjon. En svært allsidig hodebekledning for krevende vinterforhold.',
        link: { href: 'https://www.lowealpine.com', label: 'Lowe Alpine nettside' },
      },
      {
        name: 'Norrøna Nansen Yttervotter',
        image: 'nor_nansen_gtx.png',
        body: 'Norrøna Nansen er norske ekspedisjonsvotter designet for arktiske forhold. Yttervottene er laget med Gore-Tex-membran for full vanntetthet, med forsterkninger på tommel og håndflate mot slitasje. Nansen-serien er oppkalt etter Fridtjof Nansen og er blant Norrønas tøffeste ekspedisjonsprodukter for is- og snøferd.',
        link: { href: 'https://www.norrona.com', label: 'Norrøna nettside' },
      },
      {
        name: 'Innervotter Tovet (Irene Bakken)',
        image: 'votter.png',
        body: 'Håndlagde tovede ullvotter fra norsk håndverker Irene Bakken, spesialprodusert for krevende vinterforhold. Tovet ull gir enestående isolasjon selv i fuktige forhold – ullfibrene filtes sammen under varme og fukt til et tett og svært slitesterkt materiale. Disse innervottene brukes inni yttervottene for maksimal varmebeskyttelse under arktiske ekspedisjoner.',
        link: null,
      },
      {
        name: 'Pelslue av Bisam',
        image: 'bisam.png',
        body: 'En pelslue sydd av bisampels (nutria/myskbever) gir ekstrem kuldebeskyttelse for hode og ører. Bisampels kombinerer lett vekt med svært god isolasjonsevne og naturlig vannavvisning. En tradisjonell løsning for arktisk kulde med lang historikk fra polekspedisjoner og urfolkskultur i nord.',
        link: null,
      },
      {
        name: 'Helsport Fimbul Shell Jakke og Bukse',
        image: 'FimbulJakkeBukse.png',
        body: 'Helsport Fimbul Shell er en hardshell-kombinasjon av jakke og bukse for aktiv vinter- og fjellbruk. Jakke og bukse er laget i tolagssstoff med membran som er vanntett, vindtett og pustende – alle syesømmer er forseglet mot vann. Serien er designet for høy aktivitet i dårlig vær der pusteevne og bevegelsesfrihet er like viktig som vind- og vanntetthet.',
        link: { href: 'https://www.helsport.com', label: 'Helsport nettside' },
      },
      {
        name: 'Helsport Fimbul Down Expedition',
        image: 'FimbulDown.png',
        body: 'Helsport Fimbul Down Expedition er en dunjakke beregnet for de kaldeste ekspedisjonsforhold. Høykvalitets dun med høy fyldekraft (fill power) gir maksimal isolasjon per gram vekt, og jakken er designet for bivuak og stillestående leirtid i ekstrem kulde. Justerbar hette og mansjetter stenger ute trekk effektivt.',
        link: { href: 'https://www.helsport.com', label: 'Helsport nettside' },
      },
      {
        name: 'Norrøna Trollveggen Gore-Tex Gamasjer',
        image: 'norrona.png',
        body: 'Norrøna Trollveggen Gore-Tex-gamasjer er mellomhøye gamasjer laget for alpinklatring og krevende ski- og fjellturer. De er laget i Gore-Tex og gir vanntett, vindtett og pustende beskyttelse rundt beinet og støvelen, med fulllengde glidelås og elastisk stropp under foten. Trollveggen er Norrønas hardeste ekspedisjonsserie, brukt av profesjonelle fjellklatrere og polfarere.',
        link: { href: 'https://www.norrona.com/en-GB/products/trollveggen/trollveggen-gore-tex-gaiters-unisex/', label: 'Norrøna Trollveggen gamasjer' },
      },
      {
        name: 'Janus Ekstra',
        image: 'JanusEkstra.png',
        body: 'Janus Ekstra er et tykt ullundertøy i 100 % norsk ull, beregnet for de kaldeste vinterforholdene. Ull gir naturlig termoregulering og holder varmen selv i fuktige forhold. Janus Ekstra er det tyngste laget i Janus-sortimentet og er ideelt som isolerende mellomlag under en hardshell-drakt. Janus har produsert ullklær i Norge siden 1895.',
        link: { href: 'https://www.janus.no', label: 'Janus nettside' },
      },
      {
        name: 'Janus IRIS',
        image: 'JanusIris.png',
        body: 'Janus IRIS er et basislag i en blanding av 85 % merinoull og 15 % silke, som gir et svært mykt og lett første lag nær huden. Silkeinnslaget gir en behagelig glid og reduserer friksjon, mens merinoull regulerer fuktighet og temperatur naturlig. IRIS passer for aktive turer der du veksler mellom ulike aktivitetsnivåer.',
        link: { href: 'https://www.janus.no', label: 'Janus nettside' },
      },
      {
        name: 'Janus Design Wool',
        image: 'JanusDesignWool.png',
        body: 'Janus Design Wool er en serie ullundertøy i fin merinoull som kombinerer funksjonalitet med et moderne uttrykk. Plaggene er myke mot huden og naturlig antibakterielle, noe som gjør dem luktfrie over lang tids bruk uten tilgang til vask. De passer som første lag i et lagdelt bekledningssystem for alle årstider.',
        link: { href: 'https://www.janus.no', label: 'Janus nettside' },
      },
      {
        name: 'Janus balaclava',
        image: 'JanusBalaclava.png',
        body: 'Janus balaklava av 100 % ull dekker hode, hals og ansikt og gir effektiv beskyttelse mot kald vind og kulde. Naturlig ull absorberer fuktighet fra huden og regulerer temperaturen slik at hodet holder seg komfortabelt over lang tid. En uunnværlig del av hodebekledningssystemet i arktiske og subarktiske klimaer.',
        link: { href: 'https://www.janus.no', label: 'Janus nettside' },
      },
      {
        name: 'Janus hals',
        image: 'JanusHals.png',
        body: 'Janus halsvarmere i ull gir effektiv varmebeskyttelse rundt halsen og kan brukes under balaklava eller alene som lett tillegg i bekledningssystemet. Naturlig ull regulerer fuktighet og holder varmen uten å klebe seg til huden. En liten og lett detalj som utgjør stor komfortforskjell i kuldegrader under null.',
        link: { href: 'https://www.janus.no', label: 'Janus nettside' },
      },
      {
        name: 'Janus sokker',
        image: 'JanusSokker.png',
        body: 'Janus ullsokker er laget av norsk ull med forsterket hæl og tå for lang holdbarhet under krevende turbruk. Tykke ullsokker er avgjørende for å holde føttene varme i stive vinterstøvler under lange skimarsjer og vinterekspedisjoner. Janus er en av Norges ledende ullprodusenter med tradisjoner tilbake til 1895.',
        link: { href: 'https://www.janus.no', label: 'Janus nettside' },
      },
      {
        name: 'Sasta Ullsokker',
        image: 'product_525568wool_socks_330.png',
        body: 'Sasta er et finsk friluftsmerkevare med spesialisering på jaktutstyr og vinterbekledning. Sasta ullsokker er laget av høykvalitets ull med forsterkninger for lang holdbarhet i skistøvler og vinterfottøy. Det finske merket er kjent for robust og funksjonelt materiell tilpasset nordiske klimaer og er populært blant jegere, soldater og friluftsentusiaster.',
        link: { href: 'https://www.sasta.fi', label: 'Sasta nettside' },
      },
      {
        name: 'Aclima Woolnet trøye og longs (netting)',
        image: 'aclima.png',
        body: 'Aclima WoolNet er et basislag i strikket merinoull-nett som skaper luftlommer nær huden og gir svært god transpirasjon og temperaturregulering. Nettingstrukturen mellom huden og neste bekledningslag forbedrer fuktighets­transport ved varierende aktivitetsnivå. WoolNet-konseptet ble utviklet av Aclima i Krøderen, Norge, som har produsert ullklær siden 1939.',
        link: { href: 'https://www.aclima.com/en/coll/woolnet', label: 'Aclima WoolNet' },
      },
    ],
  },
  {
    id: 'bolig',
    label: 'Bolig & Sovepose',
    items: [
      {
        name: 'Helsport Fjellheimen 3 Camp (sommer)',
        image: 'HelsportFjellheimen3Camp.png',
        body: 'Helsport Fjellheimen 3 Camp er et lettvekts tunneltelt for tre personer beregnet på tresesongers bruk. Teltet er kjent for god stabilitet i vind, romslig utforming og lavt vektprofil – romslig nok for to voksne med fullt ekspedisjonsmateriell. Dobbeltvegget konstruksjon gir god ventilasjon og et generøst forrom for matlagning og bagasje i dårlig vær.',
        link: { href: 'https://www.helsport.com', label: 'Helsport nettside' },
      },
      {
        name: 'Helsport Svalbard (vinter)',
        image: 'svalbard.png',
        body: 'Helsport Svalbard er et ekspedisjonstelt konstruert for polare vinterforhold, med lang historikk fra Svalbard-ekspedisjoner og nordpolferd. Konstruksjonen tåler kraftig snølast og sterk vind takket være stive aluminiumsstenger og forsterket teltduk. Svalbard-teltet regnes som et av verdens mest ekspedisjonsprøvde telt og er fortsatt i Helsports sortiment.',
        link: { href: 'https://www.helsport.com', label: 'Helsport nettside' },
      },
      {
        name: 'Ajungilak Future Winter',
        image: 'AjungilakFutureWinter.png',
        body: 'Ajungilak Future Winter var en norskutviklet ekspedisjonssovepose beregnet for temperaturer ned mot -20 °C og kaldere. Ajungilak ble grunnlagt i 1855 og var lenge Norges ledende produsent av soveposer for arktisk bruk, inntil merket ble kjøpt opp av sveitsiske Mammut Sports Group. Produktlinjen finnes i dag under Mammut-paraplyen.',
        link: { href: 'https://www.mammut.com', label: 'Mammut/Ajungilak nettside' },
      },
      {
        name: 'Ajungilak Tyin 5-season',
        image: 'AjungilakTyin5Season.png',
        body: 'Ajungilak Tyin 5-season (nå Mammut Tyin MTI 5-Season) er en syntetfylt ekspedisjonssovepose beregnet på bruk fra tundra til taiga. Den veier ca. 3 kg og har komforttemperatur ned mot -13 °C og ekstremtemperatur på -25 °C. Syntetfyllet Ajungilak MTI Endurance beholder varmeegenskapene selv i fuktige forhold der dun ville miste isolasjonsevnen.',
        link: { href: 'https://www.mammut.com/us/en/products/2410-01662/tyin-mti-5-season', label: 'Mammut Tyin MTI 5-Season' },
      },
      {
        name: 'Bamse Extreme liggeunderlag',
        image: 'BamseExtreme.png',
        body: 'Bamse Extreme er Norges mest solgte skumliggeunderlag, produsert av Ajungilak (nå Mammut). Underlaget er laget av lukkede celleskum som gir fullstendig vannmotstand og beholder isolasjonsverdien selv under trykk – 14 mm tykt, 60 × 186 cm og 650 g, med R-verdi 3,5. Det er totalt fuktbestandig og absorberer ingen vann selv ved langvarig snøkontakt.',
        link: { href: 'https://www.mammut.com', label: 'Mammut/Ajungilak nettside' },
      },
      {
        name: 'Therm-a-Rest Ridge Deluxe liggeunderlag',
        image: 'TermaRest.png',
        body: 'Therm-a-Rest RidgeRest Deluxe er et lukket-celle-skumunderlag med profilert overflate (topper og daler) som gir økt isolasjon ved å fange luft mellom kropp og mark. Skumkjernen er lett, fullstendig fuktbestandig og klarer seg uten pumpe eller ventil. Therm-a-Rest er et amerikansk merke som har levert liggeunderlag til ekspedisjoner over hele verden siden 1971.',
        link: { href: 'https://www.thermarest.com', label: 'Therm-a-Rest nettside' },
      },
    ],
  },
  {
    id: 'diverse',
    label: 'Diverse',
    items: [
      {
        name: 'Norrøna Recon Pack 125 liter rammesekk',
        image: 'ReconPackSynkronflex125L.png',
        body: 'Norrøna Recon Pack 125 L Synkroflex er en stor ekspedisjonsryggsekk utviklet i samarbeid med norsk spesialforsvar og godkjent for militær bruk i Norge, Sverige og Danmark. Synkroflex-systemet lar ryggraden følge kroppsbevegelsene for stabil lastfordeling i krevende terreng. Den har to store sidefickor, kompresjonsstropper og aluminiumsramme.',
        link: { href: 'https://www.norrona.com/en-GB/products/recon/recon-125l-synkroflex-pack/', label: 'Norrøna Recon 125L' },
      },
      {
        name: 'Sea to Summit kartmappe large',
        image: 'mapcase.png',
        body: 'Sea to Summit TPU Guide Map Case er en vanntett kartmappe med sveiste sømmer og trykklåsesystem som tåler nedsylting i 10 meters dybde. Transparent topp gir rask avlesning uten å åpne mappen, og den kan henge rundt halsen for enkel tilgang under marsj. Et uunnværlig navigasjonshjelpemiddel for padlere, turgåere og orienteringsløpere.',
        link: { href: 'https://seatosummit.com/products/tpu-guide-map-case', label: 'Sea to Summit kartmappe' },
      },
      {
        name: 'Sea to Summit Drybag 8L & 35L',
        image: 'STSDrySack.png',
        body: 'Sea to Summit Dry Bags er vanntette pakkeposer i lett nylon med rullestenging, tilgjengelig i en rekke størrelser. De er essensielle for å holde klær, sovepose og elektronikk tørt under kanoturer, vading og vedvarende nedbør. Kombinasjonen av 8L og 35L gir fleksibel organisering av alt fra liten elektronikk til hele bekledningssystemet.',
        link: { href: 'https://seatosummit.com/collections/dry-bags', label: 'Sea to Summit Drybag-kolleksjon' },
      },
      {
        name: 'ALLY 16,5′ DR kano',
        image: 'kano.png',
        body: 'ALLY 16,5 DR er en sammenleggbar ekspedisjonskano produsert i Norge med aluminiumsramme og solid PVC-duk, konstruert for 2–3 personer med last. Den pakker ned til kompakt bærepose og kombinerer styrke, stabilitet og bærbarhet på en måte som er ideell for ekspedisjoner med kanostrekning mellom landetapper. ALLY-kanoer er i dag distribuert gjennom Bergans of Norway.',
        link: { href: 'https://www.bergans.com/en/p/811-ally-165', label: 'Bergans/ALLY 16,5 kano' },
      },
      {
        name: 'Silva Helios stormtenner',
        image: 'stormtenner.png',
        body: 'Silva Helios er vindtette stormtenner som fungerer pålitelig i sterk vind og fuktige forhold der vanlige fyrstikker ikke virker. Stormtenner regnes som obligatorisk sikkerhetsutstyr på vinterfjelltur og en vanntett eske holder tennerne klare for bruk selv etter å ha blitt gjennomvåt. Silva er et svensk merke med over 80 år innen kompasser og friluftsutstyr.',
        link: { href: 'https://www.silva.se', label: 'Silva nettside' },
      },
      {
        name: 'Ajungilak Bivouac Boots',
        image: 'ajungilac.png',
        body: 'Ajungilak Bivouac Boots er isolerte overboots laget for å bæres over eksisterende fottøy ved ekstremt lave temperaturer under bivuak og leiropphold. Laget av Ajungilaks ShelterTX-membran med MTI-isolasjon, holder de føttene varme i soveposen og under stillestående leirtid i arktisk kulde. Produktet er i dag under Mammut-paraplyen.',
        link: { href: 'https://www.mammut.com', label: 'Mammut/Ajungilak nettside' },
      },
      {
        name: 'Rottefella Snøspade',
        image: 'spade.png',
        body: 'Rottefella Snøspade er et lett og kompakt graveredskap med skaft i tre og blad i hardanodisert aluminium, med lang historikk i norsk vinterbruk og militær forsyning. Den er effektiv for graving i kompakt snø og brukes ved snøskred, vindskjul og leirbygging. Snøspade er obligatorisk sikkerhetsutstyr for vinterfjellturer i potensielt skredfarlig terreng.',
        link: { href: 'https://rottefella.com', label: 'Rottefella nettside' },
      },
      {
        name: 'Ortovox 320 søkestang',
        image: 'sokestang.png',
        body: 'Ortovox Probe ALU 320 er en lavinepeilesøkestang i aluminium som strekker seg til 320 cm, utstyrt med PFA hurtigmonteringssystem og dybdemarkering. Lang søkestang gir bedre rekkevidde for sondering i dyp snø og reduserer unødvendig gravearbeid. Ortovox er et ledende tysk merke innen skredutstyr, kjent for høy kvalitet på peilere, sonder og spader.',
        link: { href: 'https://www.ortovox.com', label: 'Ortovox nettside' },
      },
      {
        name: 'Adidas Evil Eye Explorer L',
        image: 'adidasexpl.png',
        body: 'Adidas Evil Eye Explorer L (modellnummer A134) er sportsbriller med 10-base desentrert polykarbonatlinse som gir 100 % UV-beskyttelse og høy slagfasthet, beregnet på ansikter med stor form. Lett ramme og UV-beskyttelse gjør dem velegnet for lange skiturer med sterk soleksponering i hvit snø. Modellen er utgått, men Adidas fortsetter å produsere sportsoptikk.',
        link: { href: 'https://www.adidas.com', label: 'Adidas nettside' },
      },
      {
        name: 'ID2 goggles',
        image: 'ID2.png',
        body: 'Adidas ID2 er skibriller med ClimaCool-ventilasjonssystem og sfærisk dobbeltlinse med antidugbelegg for klar sikt i all slags vær. Brillene er utstyrt med Nano-Foam-innfatning for behagelig passform og kom i varianter med 2-frame levelling-teknologi for optimal tilpasning. ID2 er utgått, men ble anerkjent som en teknologisk fremragende skibrille for sin tid.',
        link: { href: 'https://www.adidas.com', label: 'Adidas nettside' },
      },
      {
        name: 'Alfa Bever Pro Grip+',
        image: 'beverprogrip_svart.png',
        body: 'Alfa Bever Pro Grip+ er norskproduserte fjellski-støvler fra Alfa Sko, laget i fullnappslær med Gore-Tex-membran og Vibram-såle for solid grep i variert terreng. Støvelen har et stabilt dobbelllåsesystem for ankelbeskyttelse og er beregnet på NNN BC-bindinger og krevende vinterekspedisjoner. Alfa er en av Norges eldste skofabrikanter med tradisjoner for håndverksmessig kvalitet.',
        link: { href: 'https://www.alfa.no', label: 'Alfa nettside' },
      },
      {
        name: 'Buck Øks',
        image: 'buckOks.png',
        body: 'Buck Knives er et amerikansk merkevare grunnlagt i 1902 og kjent for holdbarhet og livslang garanti på sine produkter. Buck-håndøksen er kompakt og lett nok for ekspedisjonssekken og er effektiv til vedhogst og leirplassklargjøring. Høykarbonstålseggen holder skarpheten godt over lang tids kontinuerlig bruk.',
        link: { href: 'https://www.buckknives.com', label: 'Buck Knives nettside' },
      },
      {
        name: 'Buck diamantbryne',
        image: 'buckDiamant.png',
        body: 'Buck diamantbryne er et sliping-instrument med diamantbelegg for vedlikehold av kniveggen ute i felt. Diamantabrasiv sliper raskere og mer effektivt enn tradisjonell slipstein, uten behov for olje eller vann. Et lett og kompakt bryne er standard ekspedisjonsutstyr – en skarp kniv er sikrere og mer funksjonell enn en sløv.',
        link: { href: 'https://www.buckknives.com', label: 'Buck Knives nettside' },
      },
      {
        name: 'Helle Fjellkniven',
        image: 'helleKniv.png',
        body: 'Helle Fjellkniven er en norskprodusert fastbladkniv i laminert 12C27 rustfritt stål med et 95 mm droppointblad for god kontroll ved skinning og presisjonsskjæring. Skaftet er laget av krympet bjørk og gir et godt grep, og kniven leveres med tradisjonell lærslire. Helle har produsert kniver i Holmedal, Norge siden 1932 og kombinerer håndverkstradisjon med norsk stål.',
        link: { href: 'https://www.helle.no/fjellkniven', label: 'Helle Fjellkniven' },
      },
      {
        name: 'Petzl Tikka Plus hodelykt',
        image: 'PetzlTikkaPlusHodelykt.png',
        body: 'Petzl Tikka Plus var en lett hodelykt under 78 g med hvit høyytelse-LED og rød LED, som ga tre lysstyrkenivåer pluss stroboskopfunksjon. LED-teknologien gir lang batteritid og stabil lyskvalitet selv i kald temperatur der alkaliske batterier ellers mister kapasitet. Tikka-serien er Petzls mest populære rekke for friluftsliv og regnes som standarden innen hodelykter.',
        link: { href: 'https://www.petzl.com', label: 'Petzl nettside' },
      },
      {
        name: 'Silva Expedition 15 kompass',
        image: 'silva15.png',
        body: 'Silva Expedition 15 er et profesjonelt speilkompass med klinometermåler for presisjonsnavigasjon i krevende terreng. Speilkompaseset muliggjør nøyaktig peilingssetting mens man ser opp, og klinometeret måler hellingsvinkel – nyttig for skredvurdering. Silvakompasser er produsert i Sverige siden 1930-tallet og er standard innen profesjonell friluftsorientering.',
        link: { href: 'https://www.silva.se', label: 'Silva nettside' },
      },
      {
        name: 'Kart: 1 : 50 000 (M711)',
        image: 'Hovedkartserien125px.png',
        body: 'M711-serien er Statens kartverks topografiske kart i målestokk 1:50 000 som dekker hele fastlands-Norge i 727 kartblad, opprinnelig produsert for militær og sivil bruk. Kartene er svært detaljrike med 1 × 1 km rutenett, høydekurver, veier, vann, bebyggelse og terrengtyper. 1:50 000-skala er standardmålestokken for ekspedisjonsnavigasjon i norsk fjellterreng.',
        link: { href: 'https://www.kartverket.no', label: 'Kartverket nettside' },
      },
    ],
  },
  {
    id: 'fiske',
    label: 'Fiske',
    items: [
      {
        name: 'Berkley Lightning IM6 8′ 3–15g stang med Cardinal 101F snelle med veske og 270m 0,12 Fireline',
        image: null,
        body: 'Berkley Lightning IM6 er en lett og sensitiv fiskestang i høymodul IM6-grafitt, satt opp med en Cardinal 101F-snelle fra ABU – en klassiker innen ferskvannsfiske. 270 meter Fireline i 0,12 mm diameter gir lang kast og god følelse, godt egnet for spinnerfiske etter ørret og harr i norske fjellvann og elver. Slike lette bestikk var typisk ekspedisjonsutstyr for supplering av matforsyningen langs norske vassdrag.',
        link: { href: 'https://www.berkley-fishing.com', label: 'Berkley nettside' },
      },
      {
        name: 'Fisker mest med spesialsluker (12 grams) eller mark',
        image: null,
        body: 'Under ekspedisjonen ble det fisket mest med 12-grams spesialsluker og meitemark, avhengig av lokale fiskeforhold i de norske vassdragene langs ruten. Spesialsluker i mellomvekt er effektive for å rekke langt ut i elver og fjellvann, mens meitemark er et allsidig agn for ørret og røye. Fisk fra norske vassdrag var et verdifullt næringsrikt supplement til ekspedisjonskostholdet.',
        link: null,
      },
    ],
  },
  {
    id: 'elektronikk',
    label: 'Elektronikk',
    items: [
      {
        name: 'Fujifilm Finepix S 5600',
        image: 'Fujifilm-finepix-S5200-S6000.png',
        body: 'Fujifilm FinePix S5600 er et digitalt brokamera med 5,1 megapiksel SuperCCD HR-sensor og 10× optisk zoom (38–380 mm), introdusert i 2005. Kameraet hadde VGA-videoopptak i 30 fps og ISO-rekkevidde 64–1600, og var populært blant reisefotografer for kombinasjonen av kompakthet og lang zoom. Modellen er i dag utgått og erstattet av Fujifilms moderne X-serie.',
        link: { href: 'https://www.fujifilm-x.com/global/', label: 'Fujifilm nettside' },
      },
      {
        name: 'Canon MD110 DV-Kamera',
        image: 'canon_md110_minidv_camcorder.png',
        body: 'Canon MD110 er et kompakt MiniDV-videokamera med 35× optisk zoom og 2,7 tommer bredskjerm-LCD, beregnet på forbrukerbruk og dokumentasjon. MiniDV-formatet ga utmerket bildekvalitet for sin tid, og kassettene var kompakte og lette å bære på langtur. Kameraet er i dag utgått, og DV-kassettformatet er forlengst erstattet av digital lagring på minnekort.',
        link: { href: 'https://www.canon.com', label: 'Canon nettside' },
      },
      {
        name: 'Magellan eXplorist 500 LE GPS',
        image: 'magellanGPS.png',
        body: 'Magellan eXplorist 500 LE er en robust håndholdt GPS med 16-fargers skjerm, vanntett konstruksjon og innebygd basiskartografi, beregnet på fotturer og ekspedisjon. Limited Edition-varianten inkluderte utvidede kartdata for detaljert navigasjon i ulendt terreng. Modellen ble avviklet rundt 2006–2007 og er i dag erstattet av moderne smarttelefon-GPS og spesialiserte håndholdte enheter.',
        link: { href: 'https://www.magellangps.com', label: 'Magellan GPS nettside' },
      },
      {
        name: 'SILVA Solar II Solcelle',
        image: 'MidProductImages-Silva-solar_powerpack_lge.png',
        body: 'SILVA Solar II er et sammenleggbart 12-volts solcellepanel på 4,75 watt beregnet på lading av mobiltelefon, GPS og annet utstyr via bilkontakt-adapter. Panelet veier 300 g og måler 18 × 14 cm sammenfoldet – et pionerprodukt for ekspedisjonslading uten tilgang til strømnett i dager og uker av gangen. Produktet er utgått, men Silva fortsetter å produsere kompasser og friluftsutstyr fra Sverige.',
        link: { href: 'https://www.silva.se', label: 'Silva nettside' },
      },
      {
        name: 'SPOT Satellite Personal Tracker',
        image: 'spot.png',
        body: 'SPOT Satellite Personal Tracker var en av de første satellittbaserte nødsignal- og sporingsenheter for privatpersoner, og brukte Globalstar-nettverket for å sende posisjon og nødmeldinger der mobilnettet ikke rakk. Enheten ga ekspedisjonsdeltakere og pårørende mulighet til å følge posisjonen i tilnærmet sanntid. SPOT har i dag oppdaterte modeller med toveis meldingsfunksjon på findmespot.com.',
        link: { href: 'https://www.findmespot.com', label: 'SPOT Satellite Tracker' },
      },
    ],
  },
  {
    id: 'ski',
    label: 'Skiutstyr',
    items: [
      {
        name: 'Åsnes Amundsen Fjellski med kortfellelås',
        image: 'amundsen.png',
        body: 'Åsnes Amundsen BC er norske fjellski i poppelkjerne og cap-konstruksjon med full stålkant og tydelig vokslomme. Skiene er stive nok for stabil retningskjøring og trekking av pulk, men slanke nok for preparerte løyper. Kortfellelåsen (Skinlock) fester klatreskinn på sekunder – Åsnes er det eneste selskapet i verden som fortsatt produserer fjellski.',
        link: { href: 'https://www.en.asnes.com/produkt/amundsen-bc/', label: 'Åsnes Amundsen BC' },
      },
      {
        name: 'Crispi Sydpolen 75mm Skistøvler',
        image: 'crispiSydpolen.png',
        body: 'Crispi Sydpolen er en tung ekspedisjonsski-støvel i fullnappslær med Gore-Tex-membran og innebygd ABSS (Ankle Bone Support System) for ankelbeskyttelse på lange turer, designet for 75mm telemark-normbindinger. Stivt lær med kraftig konstruksjon gir solid ankelstøtte og varmeisolasjon i polarne temperaturer. Crispi er en italiensk produsent med spesialisering på tur- og fjellstøvler.',
        link: { href: 'https://www.crispi.no', label: 'Crispi nettside' },
      },
      {
        name: 'Rottefella Super Telemark m/wire, oppbygningsplater og hælløfter',
        image: 'superTelemark.png',
        body: 'Rottefella Super Telemark er et klassisk tre-pins 75mm bindingssystem med wire for telemarkkjøring og fjellski med tung last. Wire-løkken gir økt hælkontroll i krevende nedkjøringer, og inkluderte oppbygningsplater og hælhever tilpasser bindingen til ulike støvler og stigningsforhold. Super Telemark veier kun 370 g og er fortsatt tilgjengelig på rottefella.com.',
        link: { href: 'https://rottefella.com/en/backcountry/75-mm', label: 'Rottefella 75mm binding' },
      },
      {
        name: 'Swix Extreme Composite skistaver',
        image: 'swixExtreme.png',
        body: 'Swix Mountain Extreme Composite er lette og holdbare fjellskistaver i karbonfiber-kompositt beregnet for krevende ferdsel i løst spor, bakke og ekspedisjon. De har et ergonomisk EVA- og korkuretangrep for komfort over lange dager og justerbar stropp. Staven veier 212 g ved 155 cm lengde og er et av Swix sine mest anerkjente friluftsstavdesign.',
        link: { href: 'https://swixsport.com/en/poles/nordic-ski-touring-poles/mountain-extreme/', label: 'Swix Mountain Extreme staver' },
      },
      {
        name: 'Åsnes Nansen 2-delt stav (sammenleggbare reservestaver)',
        image: 'reservestaver.png',
        body: 'Åsnes Nansen 2-delt stav er en sammenleggbar skistav i 7075-aluminium og karbon med Flick-lock-lås og justerbart lengdeintervall 110–155 cm. Det lange EVA-grepet gjør det lett å variere grepet etter terrenget, og staven pakker ned kompakt som reservestav i pulken eller sekken. Modellen er oppkalt etter polarhelten Fridtjof Nansen.',
        link: { href: 'https://www.en.asnes.com/produkt/nansen-2-part-alloycarbon/', label: 'Åsnes Nansen 2-delt stav' },
      },
      {
        name: 'Fjellpulken Ekspedisjon 168 med forsterket ekspedisjonsdrag og ekspedisjonssele',
        image: 'fjellpulken.png',
        body: 'Fjellpulken Ekspedisjon 168 er en 168 cm lang ekspedisjonspulk i glassfibararmert polyester, produsert i Norge og brukt på polare ekspedisjoner og norges­vandringer i generasjoner. Det forsterkede ekspedisjonsdrag-og-sele-systemet fordeler lasten ergonomisk mellom kropp og pulk under lange marsjer. Fjellpulken AS er etablert i tilknytning til Svalbard og leverer pulker til militær og polarbefaring.',
        link: { href: 'https://www.fjellpulken.com', label: 'Fjellpulken nettside' },
      },
    ],
  },
]
