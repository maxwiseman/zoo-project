"use client"

import { useState } from "react"
import {
  IconAlertTriangle,
  IconAtom,
  IconBrain,
  IconChevronDown,
  IconDna,
  IconDroplet,
  IconFlame,
  IconLeaf,
  IconMenu2,
  IconMicroscope,
  IconShield,
  IconSword,
  IconTree,
  IconX,
} from "@tabler/icons-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// ─── Nav ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "classification", label: "Classification" },
  { id: "ecology", label: "Ecology" },
  { id: "anatomy", label: "Anatomy" },
  { id: "genetics", label: "Genetics" },
  { id: "evolution", label: "Evolution" },
  { id: "conservation", label: "Conservation" },
  { id: "statement", label: "Statement" },
]

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Zoo Knoxville · Group 2
            </span>
            <span className="font-heading text-sm font-medium">
              Frog vs Croc
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden gap-0.5 md:flex">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </button>
        </div>

        {open && (
          <div className="grid grid-cols-2 gap-1 pb-3 md:hidden">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function SectionHeading({
  id,
  icon: Icon,
  children,
}: {
  id: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  children: React.ReactNode
}) {
  return (
    <div id={id} className="mb-4 flex items-center gap-2 scroll-mt-20">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon size={16} className="text-primary" />
      </div>
      <h2 className="font-heading text-xl font-semibold">{children}</h2>
    </div>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading mb-2 mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </h3>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <Card size="sm" className={cn(accent && "ring-primary/30")}>
      <CardContent className="flex gap-3 pt-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon size={15} className="text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="font-heading text-sm font-semibold leading-snug">
            {value}
          </p>
          {sub && (
            <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function CompareCard({
  frogContent,
  crocContent,
  title,
}: {
  frogContent: React.ReactNode
  crocContent: React.ReactNode
  title?: string
}) {
  return (
    <div className="space-y-2">
      {title && <SubHeading>{title}</SubHeading>}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-1.5 text-primary-foreground">
              <span>🐸</span> Golden Dart Frog
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            {frogContent}
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-1.5 text-foreground">
              <span>🐊</span> Cuban Crocodile
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            {crocContent}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Callout({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <Alert className="my-4 border-primary/20 bg-primary/5">
      <Icon size={16} className="text-primary" />
      <AlertTitle className="text-foreground">{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

// ─── Taxonomy table data ──────────────────────────────────────────────────────

const TAXONOMY = [
  ["Kingdom", "Animalia", "Animalia"],
  ["Phylum", "Chordata", "Chordata"],
  ["Class", "Amphibia", "Reptilia"],
  ["Order", "Anura", "Crocodilia"],
  ["Family", "Dendrobatidae", "Crocodylidae"],
  ["Genus", "Phyllobates", "Crocodylus"],
  ["Species", "P. terribilis", "C. rhombifer"],
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <div className="min-h-svh">
      <Nav />

      {/* Hero */}
      <header className="border-b bg-muted/30 py-10 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 text-[10px] uppercase tracking-widest">
            Zoo Knoxville Capstone · Presentations 2:30–3:00
          </Badge>
          <h1 className="font-heading mb-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            <span className="text-primary-foreground">Golden Dart Frog</span>
            <span className="mx-2 text-muted-foreground">vs</span>
            <span>Cuban Crocodile</span>
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
            A comparative biology study of two ectothermic chordates —{" "}
            <em>Phyllobates terribilis</em> (Amphibia) and{" "}
            <em>Crocodylus rhombifer</em> (Reptilia) — and how 370&nbsp;million
            years of divergent evolution produced radically different solutions
            to the same biological challenges.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Badge>🐸 Amphibia</Badge>
            <Badge variant="secondary">🐊 Reptilia</Badge>
            <Badge variant="outline">Phylum Chordata</Badge>
            <Badge variant="destructive">Both Endangered</Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-10 px-4 py-10 pb-20">

        {/* ── CLASSIFICATION ─────────────────────────────────────────── */}
        <section>
          <SectionHeading id="classification" icon={IconMicroscope}>
            Classification
          </SectionHeading>
          <p className="mb-4 text-sm text-muted-foreground">
            Both species belong to Phylum Chordata but diverged approximately{" "}
            <strong className="text-foreground">360–370 million years ago</strong>{" "}
            in the Late Devonian.
          </p>

          <Card>
            <CardContent className="px-0 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground">Rank</TableHead>
                    <TableHead className="text-primary-foreground">🐸 Dart Frog</TableHead>
                    <TableHead>🐊 Crocodile</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TAXONOMY.map(([rank, frog, croc]) => (
                    <TableRow key={rank}>
                      <TableCell className="text-muted-foreground">{rank}</TableCell>
                      <TableCell className="italic text-primary-foreground">{frog}</TableCell>
                      <TableCell className="italic">{croc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <SubHeading>Evolutionary History & Cladogram</SubHeading>
          <Card size="sm">
            <CardContent className="pt-3">
              <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-muted-foreground">
{`Chordata
├── Lissamphibia (Amphibians) — diverged ~360-370 Ma
│   └── Anura (Frogs)
│       └── Dendrobatidae
│           └── Phyllobates terribilis  🐸
│               (described 1978 — Myers, Malkin & Daly)
│
└── Amniota
    └── Sauropsida (Reptiles + Birds)
        └── Archosauria — diverged ~250 Ma
            └── Crurotarsi → Crocodilia ~83.5 Ma
                └── Crocodylus rhombifer  🐊
                    (described 1807 — Cuvier)`}
              </pre>
            </CardContent>
          </Card>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <StatCard icon={IconAtom} label="Dendrobatidae split" value="~38.5 Ma" sub="Late Eocene" />
            <StatCard icon={IconAtom} label="Crocodilia appears" value="~83.5 Ma" sub="Late Cretaceous" />
            <StatCard icon={IconMicroscope} label="Frog described" value="1978" sub="Myers, Malkin & Daly" />
            <StatCard icon={IconMicroscope} label="Croc described" value="1807" sub="Georges Cuvier" />
          </div>
        </section>

        <Separator />

        {/* ── ECOLOGY & BEHAVIOR ─────────────────────────────────────── */}
        <section>
          <SectionHeading id="ecology" icon={IconTree}>
            Ecology & Behavior
          </SectionHeading>

          <CompareCard
            title="Natural Habitat"
            frogContent={
              <>
                Endemic to Colombia's{" "}
                <strong className="text-foreground">Chocó biogeographic region</strong>. Total range
                just <strong className="text-foreground">1,473 km²</strong> in Cauca & Valle del
                Cauca, 50–200 m elevation. Annual rainfall{" "}
                <strong className="text-foreground">&gt;5,000 mm</strong>, humidity 80–90%,
                temp 24–28°C year-round.
              </>
            }
            crocContent={
              <>
                Restricted to Cuba's{" "}
                <strong className="text-foreground">Zapata Swamp</strong> and Isla de la Juventud —
                freshwater marshes and densely vegetated rivers. Tropical climate, 22–32°C. Preferred
                body temp of <strong className="text-foreground">30–33°C</strong> achieved through
                basking.
              </>
            }
          />

          <SubHeading>Food Web & Trophic Level</SubHeading>
          <div className="grid grid-cols-2 gap-3">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wide text-primary-foreground">
                  🐸 Secondary Consumer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs text-muted-foreground">
                <p>↑ Fire-bellied snake (only predator)</p>
                <p className="font-semibold text-foreground">● Dart Frog</p>
                <p>↓ Ants, termites, mites, beetles</p>
                <p>↓ Algae, leaf litter (tadpoles)</p>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                  🐊 Apex Predator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs text-muted-foreground">
                <p>↑ No natural adult predators</p>
                <p className="font-semibold text-foreground">● Cuban Croc</p>
                <p>↓ Fish, turtles, small mammals</p>
                <p>↓ Invertebrates, carrion</p>
              </CardContent>
            </Card>
          </div>

          <SubHeading>Behavior</SubHeading>
          <Card>
            <CardContent className="px-0 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground">Behavior</TableHead>
                    <TableHead className="text-primary-foreground">🐸 Frog</TableHead>
                    <TableHead>🐊 Croc</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Activity", "Strictly diurnal", "Mostly nocturnal"],
                    ["Social", "Groups of 4–7", "Solitary / territorial"],
                    ["Mating", "Polygynandrous, year-round", "Seasonal, internal fert."],
                    ["Courtship", "Trill + tactile stroking", "Vocalizations, infrasound"],
                  ].map(([b, f, c]) => (
                    <TableRow key={b}>
                      <TableCell className="text-muted-foreground">{b}</TableCell>
                      <TableCell className="text-primary-foreground">{f}</TableCell>
                      <TableCell>{c}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Callout icon={IconFlame} title="Aposematism">
            The dart frog&apos;s toxicity enables a bold, highly visible lifestyle — no need
            to hide. The vivid golden body is an honest advertisement of lethality, a
            strategy called <strong>aposematism</strong>. Natural selection maintains this
            coloration because predators that learn to avoid it survive longer.
          </Callout>
        </section>

        <Separator />

        {/* ── ANATOMY & ADAPTATIONS ──────────────────────────────────── */}
        <section>
          <SectionHeading id="anatomy" icon={IconShield}>
            Anatomy & Adaptations
          </SectionHeading>

          <Tabs defaultValue="heart">
            <TabsList className="mb-4 h-auto w-full flex-wrap gap-1 bg-muted p-1">
              <TabsTrigger value="heart">Heart</TabsTrigger>
              <TabsTrigger value="respiration">Respiration</TabsTrigger>
              <TabsTrigger value="skin">Skin</TabsTrigger>
              <TabsTrigger value="thermoreg">Thermoregulation</TabsTrigger>
            </TabsList>

            <TabsContent value="heart">
              <CompareCard
                frogContent={
                  <>
                    <strong className="text-foreground">Three-chambered</strong> — 2 atria +
                    1 undivided ventricle. A{" "}
                    <strong className="text-foreground">spiral valve</strong> in the conus
                    arteriosus achieves ~<strong className="text-foreground">70–80%</strong>{" "}
                    blood separation. Allows shunting away from lungs when submerged, relying
                    on cutaneous respiration instead.
                  </>
                }
                crocContent={
                  <>
                    <strong className="text-foreground">Four-chambered</strong> — complete
                    ventricular separation, ~<strong className="text-foreground">100%</strong>{" "}
                    separation normally. The{" "}
                    <strong className="text-foreground">Foramen of Panizza</strong> enables
                    full pulmonary bypass during dives. Heart drops to{" "}
                    <strong className="text-foreground">2–3 bpm</strong>. CO₂-rich shunted
                    blood boosts gastric acid during digestion — the most acidic stomachs of
                    any vertebrate.
                  </>
                }
              />
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard icon={IconDroplet} label="Frog chambers" value="3" sub="2 atria + 1 ventricle" />
                <StatCard icon={IconDroplet} label="Croc chambers" value="4" sub="2 atria + 2 ventricles" />
                <StatCard icon={IconDroplet} label="Frog separation" value="~70–80%" sub="Via spiral valve" />
                <StatCard icon={IconDroplet} label="Croc separation" value="~100%" accent sub="With dive shunt" />
              </div>
            </TabsContent>

            <TabsContent value="respiration">
              <CompareCard
                frogContent={
                  <>
                    <strong className="text-foreground">Buccal pumping</strong> — positive-pressure
                    mouth-floor pumping fills simple sac-like lungs. Skin handles{" "}
                    <strong className="text-foreground">up to 80% of CO₂ elimination</strong> and
                    20–50% of O₂ uptake. This dual strategy chains the frog to humid environments —
                    dry skin means suffocation.
                  </>
                }
                crocContent={
                  <>
                    <strong className="text-foreground">Hepatic piston</strong> — the
                    diaphragmaticus muscle pulls the liver caudally like a syringe. Lungs exhibit{" "}
                    <strong className="text-foreground">one-way airflow like birds</strong> — air
                    moves through parabronchial tubes in one direction during both inhale and exhale,
                    extracting more O₂ per breath.
                  </>
                }
              />
            </TabsContent>

            <TabsContent value="skin">
              <CompareCard
                frogContent={
                  <>
                    Thin, moist, highly permeable. Two gland types:{" "}
                    <strong className="text-foreground">mucous glands</strong> (continuous
                    moisture) and{" "}
                    <strong className="text-foreground">granular poison glands</strong>{" "}
                    (reflexive BTX release). Functions simultaneously as a respiratory organ,
                    water-absorption surface, and chemical weapon. Acutely vulnerable to
                    desiccation, pollutants, and chytrid fungus.
                  </>
                }
                crocContent={
                  <>
                    Thick keratinized epidermis with{" "}
                    <strong className="text-foreground">osteoderms</strong> (bony plates,
                    ~67 MPa tensile strength) for armor and thermal storage. ~9,000{" "}
                    <strong className="text-foreground">integumentary sense organs (ISOs)</strong>{" "}
                    — dome-shaped mechanoreceptors more sensitive than primate fingertips.
                    Near-zero water loss.
                  </>
                }
              />
              <Callout icon={IconShield} title="The Core Trade-off">
                The frog&apos;s permeable skin is multi-functional but environmentally dependent.
                The crocodile&apos;s keratinized scales represent the amniote innovation of
                waterproofing, enabling terrestrial independence. The frog integrates with its
                environment; the crocodile seals itself off from it.
              </Callout>
            </TabsContent>

            <TabsContent value="thermoreg">
              <CompareCard
                frogContent={
                  <>
                    Cannot bask — permeable skin would desiccate fatally. Instead relies on{" "}
                    <strong className="text-foreground">microhabitat selection</strong>,
                    retreating under leaf litter near water. The stable 24–28°C Chocó rainforest
                    effectively serves as an{" "}
                    <strong className="text-foreground">external thermostat</strong>.
                  </>
                }
                crocContent={
                  <>
                    Active thermoregulation: basking, sun orientation,{" "}
                    <strong className="text-foreground">mouth gaping</strong> (~26°) for
                    evaporative brain cooling, differential vascular control. Osteoderms store
                    heat. Warms faster than it cools — functionally approaches{" "}
                    <strong className="text-foreground">homeothermy</strong> during the day.
                  </>
                }
              />
            </TabsContent>
          </Tabs>

          <SubHeading>Key Stats</SubHeading>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={IconSword} label="Batrachotoxin (BTX)" value="1 mg / frog" sub="Lethal to 10–20 humans. No antidote." accent />
            <StatCard icon={IconLeaf} label="Frog size" value="37–55 mm SVL" sub="Up to 30 g — largest dendrobatid" />
            <StatCard icon={IconShield} label="Osteoderm strength" value="~67 MPa" sub="Bony armor in crocodile dermis" />
            <StatCard icon={IconLeaf} label="Croc size" value="Up to 3.5 m" sub="Males ~70–80 kg" />
          </div>
        </section>

        <Separator />

        {/* ── GENETICS ───────────────────────────────────────────────── */}
        <section>
          <SectionHeading id="genetics" icon={IconDna}>
            Genetics
          </SectionHeading>

          <SubHeading>BTX Resistance — How the Frog Survives Its Own Poison</SubHeading>
          <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
            Tarvin et al. (2016) identified{" "}
            <strong className="text-foreground">5 amino acid substitutions</strong> in Nav1.4
            (muscle sodium channel). Wang & Wang (2017) pinpointed the key mutation:{" "}
            <strong className="text-foreground">N1584T</strong> (asparagine → threonine, one
            nucleotide change AAC → ACC) — confers near-complete BTX resistance while preserving
            normal channel function. Abderemane-Ali et al. (2021) found this alone is
            insufficient, suggesting an additional{" "}
            <em>&ldquo;toxin sponge&rdquo;</em> blood protein.
          </p>

          <Callout icon={IconBrain} title="How Batrachotoxin Works">
            BTX (C₃₁H₄₂N₂O₆, MW 538.67 Da) permanently opens voltage-gated sodium channels
            (Nav) — shifting activation threshold by −30 to −50 mV and eliminating inactivation.
            Result: continuous Na⁺ influx, membrane depolarization, muscle paralysis, cardiac
            arrest. Mouse LD₅₀ = 2 µg/kg — 10× more potent than tetrodotoxin,{" "}
            1,000× more toxic than cyanide.
          </Callout>

          <SubHeading>Dietary Sequestration</SubHeading>
          <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
            The frog does <em>not</em> synthesize BTX — it sequesters it from its diet. Daly
            et al. (1980): F1 offspring raised on commercial insect diets had{" "}
            <strong className="text-foreground">zero detectable BTX</strong>. Source: beetles of
            family <strong className="text-foreground">Melyridae</strong> (genus{" "}
            <em>Choresine</em>), ~1.8 µg BTX per beetle. A frog accumulates ~1,000 µg lifetime —
            requiring hundreds of beetles.
          </p>

          <SubHeading>Coloration Genetics & Genome</SubHeading>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={IconDna} label="mc1r" value="Melanocortin receptor" sub="Most divergent SNP between color morphs" />
            <StatCard icon={IconDna} label="gch1" value="Pteridine synthesis" sub="Yellow pigment pathway" />
            <StatCard icon={IconDna} label="rbp1 / rbp2" value="Carotenoid metabolism" sub="Orange pigment pathway" />
            <StatCard icon={IconDna} label="Genome size" value="~12.6 Gb" sub="~4× human; 88% repetitive elements. Sequenced 2025." accent />
          </div>
        </section>

        <Separator />

        {/* ── EVOLUTION ──────────────────────────────────────────────── */}
        <section>
          <SectionHeading id="evolution" icon={IconAtom}>
            Evolution (Comparative)
          </SectionHeading>
          <p className="mb-4 text-sm text-muted-foreground">
            The rubric asks for a comparative analysis. Below are the key evolutionary
            contrasts between Amphibia and Reptilia as illustrated by these two species.
          </p>

          <SubHeading>Reproduction</SubHeading>
          <Card>
            <CardContent className="px-0 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground">Feature</TableHead>
                    <TableHead className="text-primary-foreground">🐸 Frog</TableHead>
                    <TableHead>🐊 Croc</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Fertilization", "External", "Internal (cartilaginous penis)"],
                    ["Eggs", "Jelly-coated, 8–20", "Hard-shelled, 14–25"],
                    ["Egg location", "Moist leaf litter", "Mound nests"],
                    ["Sex determination", "Genetic (chromosomal)", "Temperature-dependent (TSD)"],
                    ["Incubation", "11–12 days", "58–70 days"],
                    ["Larval stage", "Tadpole → metamorphosis", "Miniature adult (no metamorphosis)"],
                    ["Parental care", "Male guards eggs + carries tadpoles", "Female guards nest + carries hatchlings"],
                  ].map(([f, fr, cr]) => (
                    <TableRow key={f}>
                      <TableCell className="text-muted-foreground">{f}</TableCell>
                      <TableCell className="text-primary-foreground">{fr}</TableCell>
                      <TableCell>{cr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Callout icon={IconAtom} title="Ancestral vs. Derived">
            The frog&apos;s external fertilization and aquatic tadpole stage are the{" "}
            <strong>ancestral amphibian condition</strong> — reproduction tied to water.
            The crocodile&apos;s internal fertilization, calcified eggshell, and
            temperature-dependent sex determination are{" "}
            <strong>amniote innovations</strong> that freed reproduction from aquatic dependency.
            Yet <em>both</em> show notable parental care — unusual among ectotherms.
          </Callout>

          <SubHeading>Evolutionary Relationship Evidence</SubHeading>
          <Accordion multiple>
            <AccordionItem value="morphological">
              <AccordionTrigger>Morphological Evidence</AccordionTrigger>
              <AccordionContent>
                Both are ectothermic tetrapods with four limbs, bilateral symmetry, a closed
                circulatory system, and a vertebral column — evidence of common chordate ancestry.
                Homologous limb bones (humerus, radius/ulna, femur, tibia/fibula) trace directly
                to shared Devonian tetrapod ancestors.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="genetic">
              <AccordionTrigger>Genetic Evidence</AccordionTrigger>
              <AccordionContent>
                Shared Hox gene clusters, conserved Nav channel gene families (present in both,
                divergently modified), and homologous cardiac transcription factors (Nkx2.5, GATA4)
                all reflect deep vertebrate common ancestry ~360–370 Ma.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="developmental">
              <AccordionTrigger>Developmental Evidence</AccordionTrigger>
              <AccordionContent>
                Both pass through a pharyngeal arch stage during embryo development — a defining
                chordate synapomorphy. The frog retains an aquatic larval stage (tadpole); the
                crocodile&apos;s amniote egg recreates the aquatic environment internally via
                extra-embryonic membranes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="homeostasis">
              <AccordionTrigger>Integration & Homeostasis</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  <strong className="text-foreground">Frog — environmental integration:</strong>{" "}
                  Permeable skin doubles as respiratory organ. Cutaneous gas exchange supplements
                  simple lungs. Chemical defense replaces physical armor. The stable rainforest
                  serves as an external homeostatic component.
                </p>
                <p>
                  <strong className="text-foreground">Crocodile — physiological sophistication:</strong>{" "}
                  Four-chambered heart with shunt, unidirectional lung airflow, hepatic piston
                  ventilation, impermeable sensory skin, active thermoregulation — all grant
                  independence from the immediate environment.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* ── CONSERVATION ───────────────────────────────────────────── */}
        <section>
          <SectionHeading id="conservation" icon={IconLeaf}>
            Conservation
          </SectionHeading>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <Card size="sm" className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-1.5 text-destructive">
                  <IconAlertTriangle size={14} /> 🐸 Endangered
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1">
                <p>IUCN B1ab(iii) · 2017</p>
                <p>Range: &lt;5 localities, 1,473 km²</p>
                <p>No reliable population census</p>
              </CardContent>
            </Card>
            <Card size="sm" className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-1.5 text-destructive">
                  <IconAlertTriangle size={14} /> 🐊 Critically Endangered
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1">
                <p>&lt;2,400 mature individuals</p>
                <p>~49% show hybrid genetics</p>
                <p>Zapata Swamp, Cuba</p>
              </CardContent>
            </Card>
          </div>

          <SubHeading>Threats to the Dart Frog</SubHeading>
          <div className="space-y-2 mb-4">
            {[
              ["🪓", "Illegal logging", "Chocó provides >50% of Colombia's national timber despite being 1/6 of its forests"],
              ["⛏️", "Gold mining mercury", "265+ tons of mercury used in Chocó (2017–2022), devastating waterways"],
              ["🌿", "Coca cultivation", "Deforestation driven by drug trade in conflict zones"],
              ["🔫", "Armed conflict", "ELN & AGC control territory overlapping the frog's range — enforcement nearly impossible"],
              ["🍄", "Chytrid fungus (Bd)", "100% mortality in exposed dendrobatids in controlled experiments"],
            ].map(([icon, threat, detail]) => (
              <Card key={threat} size="sm">
                <CardContent className="flex gap-3 pt-3">
                  <span className="text-lg leading-none">{icon}</span>
                  <div>
                    <p className="text-sm font-medium">{threat}</p>
                    <p className="text-xs text-muted-foreground">{detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <SubHeading>Zoo Knoxville & Global Efforts</SubHeading>
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground leading-relaxed">
              <p className="mb-3">
                Zoo Knoxville operates the{" "}
                <strong className="text-foreground">
                  Clayton Family Amphibian & Reptile Conservation (ARC) Campus
                </strong>{" "}
                — a 2.5-acre, 12,000+ sq ft facility housing 95+ reptile and amphibian species,
                including poison dart frogs and Cuban Crocodiles. Participates in{" "}
                <strong className="text-foreground">11 AZA SAFE programs</strong>.
              </p>
            </CardContent>
          </Card>

          <div className="mt-3 space-y-2">
            {[
              ["Rana Terribilis Amphibian Reserve", "Est. 2012 · 124 acres · World Land Trust / ProAves — first formal protection"],
              ["K'õk'õi Eujã Traditional Natural Reserve", "Est. 2019 · 11,641 ha · Managed by Eperãra Siapidaarã Indigenous peoples + Rainforest Trust"],
              ["EAZA Breeding Programme", "2022 — dedicated conservation breeding programme for P. terribilis announced"],
              ["Citizen Conservation", "Genetically verifying pure-bred P. terribilis lines across institutional zoos"],
              ["Tesoros de Colombia", "Commercial breeder flooding legal market to undercut illegal trade — price dropped from $100+ to <$35"],
            ].map(([org, detail]) => (
              <Card key={org} size="sm">
                <CardContent className="pt-3">
                  <p className="text-sm font-medium">{org}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <SubHeading>Challenges of Captivity</SubHeading>
          <Card size="sm">
            <CardContent className="pt-3 text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                <strong className="text-foreground">The captivity paradox:</strong> Captive dart
                frogs are completely non-toxic — no <em>Melyridae</em> beetles in their diet
                means no BTX accumulates. Can a non-toxic{" "}
                <em>P. terribilis</em> serve as true insurance if reintroduced frogs would be
                defenseless?
              </p>
              <p>
                Decades of confusion with the similar <em>P. bicolor</em> mean many captive
                populations may harbor undetected hybrids — a genetic integrity problem Citizen
                Conservation is actively addressing through sequencing.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* ── MAKE A STATEMENT ───────────────────────────────────────── */}
        <section>
          <SectionHeading id="statement" icon={IconBrain}>
            Make a Statement
          </SectionHeading>
          <p className="mb-4 text-sm italic text-muted-foreground">
            &ldquo;Does the conservation value provided by zoos outweigh the ethical concerns
            about keeping the species in captivity in Knoxville, TN?&rdquo;
          </p>

          <Card>
            <CardContent className="pt-4 text-sm leading-relaxed text-muted-foreground space-y-3">
              <p>
                For <em>Phyllobates terribilis</em>, the case for captive programs is strong —
                but only as a <strong className="text-foreground">complement, not a
                substitute</strong>, for in-situ conservation.
              </p>
              <p>
                The frog occupies just five known localities in an active conflict zone where
                conservation enforcement is nearly impossible. A single fungal outbreak, mining
                spill, or military operation could eliminate a population overnight. Zoo
                Knoxville&apos;s ARC Campus provides genuine genetic insurance, and its
                educational reach — placing a golden frog before tens of thousands of visitors
                who will never reach Chocó — is real and measurable.
              </p>
              <p>
                The ethical cost is lower for this species than for large megafauna. Dart frogs
                don&apos;t require vast ranges or complex social structures. A 50 cm vivarium
                with proper humidity and live-plant ecosystem supports natural behavior, pair
                bonding, and successful reproduction.
              </p>
              <p>
                The harder question is the toxicity paradox: captive frogs are fundamentally
                altered organisms — they lack their defining adaptation. Until a reintroduction
                protocol exists that can restore toxicity in the wild, captive programs remain
                primarily genetic and educational rather than ecological.
              </p>
            </CardContent>
            <div className="border-t bg-primary/5 px-4 py-3 text-sm">
              <strong className="text-foreground">Conclusion:</strong>{" "}
              <span className="text-muted-foreground">
                Yes — conditionally. The conservation value outweighs the ethical concerns
                given this species&apos; low space requirements, catastrophic wild threats,
                and conflict-zone inaccessibility. The condition: ex-situ investment must
                actively fund in-situ habitat protection alongside captive breeding, not
                replace it.
              </span>
            </div>
          </Card>
        </section>

        {/* Footer */}
        <div className="pt-4 pb-2 text-center text-xs text-muted-foreground">
          <p>Max &amp; Ian · Group 2 · Zoo Knoxville Capstone · 2:30–3:00 PM</p>
          <p className="mt-1">
            Sources: Daly et al. (1980) · Tarvin et al. (2016) · Wang &amp; Wang (2017) ·
            Abderemane-Ali et al. (2021) · Márquez et al. (2025) · IUCN Red List
          </p>
        </div>

      </main>
    </div>
  )
}
