"use client"

import { useState } from "react"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts"
import {
  IconAlertTriangle,
  IconAtom,
  IconBrain,
  IconDna,
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
import { ChartContainer } from "@/components/ui/chart"
import { Progress, ProgressLabel } from "@/components/ui/progress"
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
          <div className="md:hidden flex flex-col leading-tight">
            <span className="font-heading text-sm font-medium">Golden Dart Frog</span>
          </div>
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
    <h3 className="font-heading mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </h3>
  )
}

function BigStat({
  value,
  label,
  sub,
  frog,
  danger,
}: {
  value: string
  label: string
  sub?: string
  frog?: boolean
  danger?: boolean
}) {
  return (
    <Card
      size="sm"
      className={cn(
        "text-center",
        frog && "ring-primary/30",
        danger && "ring-destructive/30"
      )}
    >
      <CardContent className="flex flex-col items-center gap-0.5 pt-4 pb-3">
        <span
          className={cn(
            "font-heading text-3xl font-bold leading-none tabular-nums",
            frog
              ? "text-primary-foreground"
              : danger
                ? "text-destructive"
                : "text-foreground"
          )}
        >
          {value}
        </span>
        <span className="mt-1 text-xs font-semibold text-foreground">{label}</span>
        {sub && <span className="text-[11px] text-muted-foreground">{sub}</span>}
      </CardContent>
    </Card>
  )
}

function CompareBar({
  label,
  frogVal,
  frogLabel,
  crocVal,
  crocLabel,
  max,
}: {
  label: string
  frogVal: number
  frogLabel: string
  crocVal: number
  crocLabel: string
  max: number
}) {
  const frogPct = Math.round((frogVal / max) * 100)
  const crocPct = Math.round((crocVal / max) * 100)
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <div className="space-y-1">
        <Progress value={frogPct}>
          <ProgressLabel className="text-[11px] text-primary-foreground">
            🐸 {frogLabel}
          </ProgressLabel>
        </Progress>
        <Progress value={crocPct}>
          <ProgressLabel className="text-[11px] text-foreground">
            🐊 {crocLabel}
          </ProgressLabel>
        </Progress>
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const radarData = [
  { trait: "Heart efficiency", frog: 72, croc: 98 },
  { trait: "Lung efficiency", frog: 45, croc: 90 },
  { trait: "Toxicity", frog: 100, croc: 0 },
  { trait: "Skin defense", frog: 30, croc: 95 },
  { trait: "Dive ability", frog: 55, croc: 92 },
  { trait: "Thermoregulation", frog: 40, croc: 80 },
]

const radarConfig = {
  frog: { label: "🐸 Dart Frog", color: "var(--primary)" },
  croc: { label: "🐊 Cuban Croc", color: "var(--foreground)" },
}

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
          <Badge
            variant="outline"
            className="mb-4 text-[10px] uppercase tracking-widest"
          >
            Zoo Knoxville Capstone · Presentations 2:30–3:00
          </Badge>
          <h1 className="font-heading mb-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            <span className="text-primary-foreground">Golden Dart Frog</span>
            <span className="mx-2 text-muted-foreground">vs</span>
            <span>Cuban Crocodile</span>
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
            Two ectothermic chordates. 370&nbsp;million years of divergent evolution.
            Radically different answers to the same biological questions.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Badge>🐸 Amphibia</Badge>
            <Badge variant="secondary">🐊 Reptilia</Badge>
            <Badge variant="outline">Phylum Chordata</Badge>
            <Badge variant="destructive">Both Endangered</Badge>
          </div>
        </div>
      </header>

      {/* Hero stats strip */}
      <div className="border-b bg-background px-4 py-6">
        <div className="mx-auto max-w-2xl grid grid-cols-2 gap-3 sm:grid-cols-4">
          <BigStat value="1 mg" label="BTX per frog" sub="Kills 10–20 humans" frog />
          <BigStat value="2–3" label="Croc heartbeats/min" sub="While diving" />
          <BigStat value="370M" label="Years diverged" sub="Late Devonian split" />
          <BigStat
            value="2,400"
            label="Cuban Crocs left"
            sub="Critically Endangered"
            danger
          />
        </div>
      </div>

      <main className="mx-auto max-w-2xl space-y-10 px-4 py-10 pb-20">

        {/* Head-to-head radar */}
        <section>
          <SubHeading>Head-to-Head Comparison</SubHeading>
          <Card>
            <CardContent className="pt-4">
              <ChartContainer config={radarConfig} className="mx-auto h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={radarData}
                    margin={{ top: 8, right: 24, bottom: 8, left: 24 }}
                  >
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis
                      dataKey="trait"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    />
                    <Radar
                      name="frog"
                      dataKey="frog"
                      stroke="var(--primary)"
                      fill="var(--primary)"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                    <Radar
                      name="croc"
                      dataKey="croc"
                      stroke="var(--foreground)"
                      fill="var(--foreground)"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-2 flex justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block size-2.5 rounded-full bg-primary" />
                  🐸 Golden Dart Frog
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block size-2.5 rounded-full bg-foreground" />
                  🐊 Cuban Crocodile
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Classification */}
        <section>
          <SectionHeading id="classification" icon={IconMicroscope}>
            Classification
          </SectionHeading>
          <p className="mb-4 text-sm text-muted-foreground">
            Both belong to Phylum Chordata but diverged{" "}
            <strong className="text-foreground">~360–370 million years ago</strong> in the
            Late Devonian.
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
                      <TableCell className="italic text-primary-foreground">
                        {frog}
                      </TableCell>
                      <TableCell className="italic">{croc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <SubHeading>Cladogram</SubHeading>
          <Card size="sm">
            <CardContent className="pt-3">
              <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-muted-foreground">
{`Chordata
├── Lissamphibia (Amphibians) ── diverged ~360-370 Ma
│   └── Anura (Frogs)
│       └── Dendrobatidae
│           └── Phyllobates terribilis  🐸
│               (described 1978 — Myers, Malkin & Daly)
│
└── Amniota
    └── Sauropsida (Reptiles + Birds)
        └── Archosauria ── diverged ~250 Ma
            └── Crurotarsi → Crocodilia ~83.5 Ma
                └── Crocodylus rhombifer  🐊
                    (described 1807 — Cuvier)`}
              </pre>
            </CardContent>
          </Card>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <BigStat value="38.5 Ma" label="Dendrobatidae split" sub="Late Eocene" frog />
            <BigStat value="83.5 Ma" label="Crocodilia appears" sub="Late Cretaceous" />
          </div>
        </section>

        <Separator />

        {/* Ecology */}
        <section>
          <SectionHeading id="ecology" icon={IconTree}>
            Ecology & Behavior
          </SectionHeading>

          <SubHeading>Climate Comparison</SubHeading>
          <Card size="sm">
            <CardContent className="space-y-5 pt-4">
              <CompareBar
                label="Annual Rainfall"
                frogVal={5000}
                frogLabel=">5,000 mm/yr"
                crocVal={1200}
                crocLabel="~1,200 mm/yr"
                max={5500}
              />
              <CompareBar
                label="Preferred Temperature"
                frogVal={26}
                frogLabel="24–28°C (passive)"
                crocVal={31}
                crocLabel="30–33°C (active)"
                max={40}
              />
              <CompareBar
                label="Habitat Humidity"
                frogVal={85}
                frogLabel="80–90% RH"
                crocVal={55}
                crocLabel="~50–60% RH"
                max={100}
              />
            </CardContent>
          </Card>

          <SubHeading>Habitat</SubHeading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-primary-foreground">🐸 Chocó, Colombia</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Endemic to the{" "}
                <strong className="text-foreground">Chocó biogeographic region</strong>.
                Total range: just{" "}
                <strong className="text-foreground">1,473 km²</strong> in Cauca &amp;
                Valle del Cauca, 50–200 m elevation. Rain falls ~359 days/year.
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>🐊 Zapata Swamp, Cuba</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Restricted to Cuba&apos;s{" "}
                <strong className="text-foreground">Zapata Swamp</strong> and Isla de la
                Juventud — freshwater marshes and densely vegetated rivers.
              </CardContent>
            </Card>
          </div>

          <SubHeading>Trophic Level</SubHeading>
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
              </CardContent>
            </Card>
          </div>

          <Callout icon={IconFlame} title="Aposematism">
            The dart frog&apos;s toxicity enables a bold, visible lifestyle — no hiding needed.
            The vivid golden body is an honest advertisement of lethality. Predators that
            learn to avoid it survive longer, driving natural selection to maintain the coloration.
          </Callout>
        </section>

        <Separator />

        {/* Anatomy */}
        <section>
          <SectionHeading id="anatomy" icon={IconShield}>
            Anatomy & Adaptations
          </SectionHeading>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
            <BigStat value="3" label="Frog heart chambers" sub="+ spiral valve" frog />
            <BigStat value="4" label="Croc heart chambers" sub="+ Foramen of Panizza" />
            <BigStat value="80%" label="CO₂ via frog skin" sub="Cutaneous respiration" frog />
            <BigStat value="2–3 bpm" label="Croc dive heart rate" sub="Down from ~40 bpm" />
          </div>

          <Tabs defaultValue="heart">
            <TabsList className="mb-4 h-auto w-full flex-wrap gap-1 bg-muted p-1">
              <TabsTrigger value="heart">❤️ Heart</TabsTrigger>
              <TabsTrigger value="respiration">🫁 Breathing</TabsTrigger>
              <TabsTrigger value="skin">🛡️ Skin</TabsTrigger>
              <TabsTrigger value="thermoreg">🌡️ Thermoreg</TabsTrigger>
            </TabsList>

            <TabsContent value="heart">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">
                      🐸 Three Chambers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    2 atria + 1 undivided ventricle. A{" "}
                    <strong className="text-foreground">spiral valve</strong> achieves ~70–80%
                    blood separation. Allows shunting away from lungs when submerged, relying
                    on skin for gas exchange.
                  </CardContent>
                </Card>
                <Card size="sm">
                  <CardHeader>
                    <CardTitle>🐊 Four Chambers</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Complete ventricular separation. The{" "}
                    <strong className="text-foreground">Foramen of Panizza</strong> enables
                    full pulmonary bypass while diving. Left aorta boosts gastric acid during
                    digestion — most acidic stomach of any vertebrate.
                  </CardContent>
                </Card>
              </div>
              <SubHeading>Blood Separation Efficiency</SubHeading>
              <Card size="sm">
                <CardContent className="space-y-3 pt-4">
                  <Progress value={75}>
                    <ProgressLabel className="text-[11px] text-primary-foreground">
                      🐸 Frog (spiral valve) — ~75%
                    </ProgressLabel>
                  </Progress>
                  <Progress value={100}>
                    <ProgressLabel className="text-[11px]">
                      🐊 Croc (4 chambers) — ~100%
                    </ProgressLabel>
                  </Progress>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="respiration">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">
                      🐸 Buccal Pump + Skin
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Positive-pressure mouth-floor pumping fills simple sac-like lungs. Skin
                    handles{" "}
                    <strong className="text-foreground">up to 80% of CO₂ elimination</strong>.
                    This dual strategy chains the frog to humid environments — dry skin means
                    suffocation.
                  </CardContent>
                </Card>
                <Card size="sm">
                  <CardHeader>
                    <CardTitle>🐊 Hepatic Piston + Unidirectional Flow</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    The{" "}
                    <strong className="text-foreground">diaphragmaticus muscle</strong> pulls
                    the liver like a syringe. Lungs exhibit{" "}
                    <strong className="text-foreground">one-way airflow like birds</strong> —
                    air moves through parabronchial tubes in one direction on both inhale and
                    exhale.
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skin">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">
                      🐸 Permeable Multitool
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Thin, moist, permeable. Two gland types:{" "}
                    <strong className="text-foreground">mucous</strong> (continuous moisture)
                    and{" "}
                    <strong className="text-foreground">granular poison glands</strong>{" "}
                    (reflexive BTX release). Functions as respiratory organ, water-absorption
                    surface, and chemical weapon — simultaneously.
                  </CardContent>
                </Card>
                <Card size="sm">
                  <CardHeader>
                    <CardTitle>🐊 Armored Sensory Array</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Keratinized scales +{" "}
                    <strong className="text-foreground">osteoderms</strong> (~67 MPa tensile
                    strength). ~9,000{" "}
                    <strong className="text-foreground">integumentary sense organs (ISOs)</strong>{" "}
                    — more sensitive than primate fingertips. Near-zero water loss.
                  </CardContent>
                </Card>
              </div>
              <Callout icon={IconShield} title="The Core Trade-off">
                The frog integrates with its environment — skin is both weapon and lung. The
                crocodile seals itself off — armored, waterproof, independently sensory. Two
                fundamentally opposed survival philosophies.
              </Callout>
            </TabsContent>

            <TabsContent value="thermoreg">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Card size="sm">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">
                      🐸 Passive (Environmental)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Cannot bask — permeable skin would desiccate. Relies on{" "}
                    <strong className="text-foreground">microhabitat selection</strong> and the
                    stable 24–28°C Chocó climate as an external thermostat.
                  </CardContent>
                </Card>
                <Card size="sm">
                  <CardHeader>
                    <CardTitle>🐊 Active (Behavioral)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Basking, sun orientation,{" "}
                    <strong className="text-foreground">mouth gaping</strong> (~26°) for
                    evaporative brain cooling, differential vascular control. Osteoderms store
                    heat — warms faster than it cools, approaching{" "}
                    <strong className="text-foreground">functional homeothermy</strong>.
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <Separator />

        {/* Genetics */}
        <section>
          <SectionHeading id="genetics" icon={IconDna}>
            Genetics
          </SectionHeading>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
            <BigStat value="2 µg/kg" label="BTX mouse LD₅₀" sub="10× deadlier than TTX" frog />
            <BigStat value="N1584T" label="Key resistance mutation" sub="1 nucleotide change" frog />
            <BigStat value="12.6 Gb" label="Frog genome" sub="4× human genome size" frog />
            <BigStat value="88%" label="Repetitive DNA" sub="In frog genome" frog />
          </div>

          <Callout icon={IconBrain} title="How Batrachotoxin Kills">
            BTX (C₃₁H₄₂N₂O₆, MW 538.67 Da) permanently opens voltage-gated sodium channels
            (Nav), shifting activation threshold by −30 to −50 mV and eliminating inactivation.
            Result: continuous Na⁺ influx → membrane depolarization → muscle paralysis →
            cardiac arrest. No antidote. Estimated human lethal dose:{" "}
            <strong>~100–200 µg</strong> — about two grains of salt.
          </Callout>

          <SubHeading>How the Frog Survives Its Own Poison</SubHeading>
          <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
            Tarvin et al. (2016) found{" "}
            <strong className="text-foreground">5 amino acid substitutions</strong> in Nav1.4.
            Wang &amp; Wang (2017) isolated the key mutation:{" "}
            <strong className="text-foreground">N1584T</strong> (AAC → ACC) — one nucleotide,
            near-complete resistance. Abderemane-Ali et al. (2021) found an additional
            &ldquo;toxin sponge&rdquo; blood protein is likely involved.
          </p>

          <SubHeading>Dietary Sequestration</SubHeading>
          <Card size="sm">
            <CardContent className="pt-3 text-sm text-muted-foreground leading-relaxed">
              The frog <em>doesn&apos;t make</em> BTX — it steals it from food. Daly et al.
              (1980): captive-raised frogs on commercial diets had{" "}
              <strong className="text-foreground">zero detectable BTX</strong>. Source:{" "}
              <em>Melyridae</em> beetles (~1.8 µg BTX per beetle). A frog accumulates ~1,000 µg
              over its lifetime — hundreds of beetles.
            </CardContent>
          </Card>

          <SubHeading>Coloration Genes</SubHeading>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["mc1r", "Melanocortin receptor", "Most divergent SNP between color morphs"],
              ["gch1", "Pteridine synthesis", "Yellow pigment pathway"],
              ["rbp1/rbp2", "Carotenoid metabolism", "Orange pigment pathway"],
              ["asip", "Agouti-signaling", "Pattern regulation"],
            ].map(([gene, role, detail]) => (
              <Card key={gene} size="sm">
                <CardContent className="pt-3">
                  <p className="font-heading text-sm font-semibold text-primary-foreground">
                    {gene}
                  </p>
                  <p className="text-xs font-medium text-foreground">{role}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Evolution */}
        <section>
          <SectionHeading id="evolution" icon={IconAtom}>
            Evolution (Comparative)
          </SectionHeading>

          <SubHeading>Reproduction at a Glance</SubHeading>
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
                    ["Fertilization", "External", "Internal"],
                    ["Eggs", "Jelly-coated, 8–20", "Hard-shelled, 14–25"],
                    ["Sex determination", "Genetic (chromosomal)", "Temperature (TSD)"],
                    ["Incubation", "11–12 days", "58–70 days"],
                    ["Larval stage", "Tadpole → metamorphosis", "Miniature adult at hatch"],
                    ["Parental care", "Male carries tadpoles", "Female guards hatchlings"],
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

          <Callout icon={IconAtom} title="Ancestral vs. Derived Traits">
            The frog&apos;s external fertilization and tadpole stage are the{" "}
            <strong>ancestral amphibian condition</strong> — reproduction tied to water. The
            crocodile&apos;s internal fertilization, calcified eggshell, and TSD are{" "}
            <strong>amniote innovations</strong> freeing reproduction from aquatic dependency.
            Yet <em>both</em> show parental care — unusual for ectotherms.
          </Callout>

          <SubHeading>Evolutionary Evidence</SubHeading>
          <Accordion multiple>
            <AccordionItem value="morphological">
              <AccordionTrigger>Morphological Evidence</AccordionTrigger>
              <AccordionContent>
                Both are ectothermic tetrapods with four limbs, bilateral symmetry, a closed
                circulatory system, and a vertebral column. Homologous limb bones (humerus,
                radius/ulna, femur, tibia/fibula) trace to shared Devonian tetrapod ancestors.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="genetic">
              <AccordionTrigger>Genetic Evidence</AccordionTrigger>
              <AccordionContent>
                Shared Hox gene clusters, conserved Nav channel gene families (divergently
                modified in each lineage), and homologous cardiac transcription factors
                (Nkx2.5, GATA4) all reflect common vertebrate ancestry ~360–370 Ma.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="developmental">
              <AccordionTrigger>Developmental Evidence</AccordionTrigger>
              <AccordionContent>
                Both pass through a pharyngeal arch stage during embryo development — a defining
                chordate synapomorphy. The frog retains an aquatic larval stage; the
                crocodile&apos;s amniote egg recreates the aquatic environment internally via
                extra-embryonic membranes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="homeostasis">
              <AccordionTrigger>Homeostasis — Two Philosophies</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  <strong className="text-foreground">Frog — environmental integration:</strong>{" "}
                  Permeable skin = respiratory organ + weapon. Cutaneous gas exchange supplements
                  lungs. Stable rainforest = external thermostat.
                </p>
                <p>
                  <strong className="text-foreground">
                    Crocodile — physiological independence:
                  </strong>{" "}
                  4-chambered heart with dive shunt, unidirectional lung flow, hepatic piston,
                  impermeable sensory skin, active thermoregulation — all grant independence
                  from the environment.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Conservation */}
        <section>
          <SectionHeading id="conservation" icon={IconLeaf}>
            Conservation
          </SectionHeading>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <Card size="sm" className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary-foreground">🐸 Endangered</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs text-muted-foreground">
                <p>IUCN B1ab(iii) · assessed 2017</p>
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
              <CardContent className="space-y-1 text-xs text-muted-foreground">
                <p>&lt;2,400 mature individuals</p>
                <p>~49% show hybrid genetics</p>
                <p>Zapata Swamp, Cuba only</p>
              </CardContent>
            </Card>
          </div>

          <SubHeading>Threat Severity — Dart Frog</SubHeading>
          <Card size="sm">
            <CardContent className="space-y-4 pt-4">
              {[
                { label: "🍄 Chytrid fungus (Bd)", val: 95 },
                { label: "🪓 Illegal logging", val: 85 },
                { label: "⛏️ Gold mining / mercury", val: 80 },
                { label: "🔫 Armed conflict / access", val: 70 },
                { label: "🌿 Coca cultivation", val: 60 },
              ].map(({ label, val }) => (
                <Progress key={label} value={val}>
                  <ProgressLabel className="text-[11px]">
                    {label} — {val}%
                  </ProgressLabel>
                </Progress>
              ))}
            </CardContent>
          </Card>

          <SubHeading>Zoo Knoxville & Global Efforts</SubHeading>
          <Card size="sm">
            <CardContent className="pt-3 text-sm text-muted-foreground leading-relaxed">
              Zoo Knoxville&apos;s{" "}
              <strong className="text-foreground">Clayton Family ARC Campus</strong> — 2.5
              acres, 12,000+ sq ft, 95+ species — participates in{" "}
              <strong className="text-foreground">11 AZA SAFE programs</strong> and houses
              both species.
            </CardContent>
          </Card>

          <div className="mt-3 space-y-2">
            {[
              ["🌿", "Rana Terribilis Amphibian Reserve", "Est. 2012 · 124 acres · first formal protection for P. terribilis"],
              ["🌿", "K'õk'õi Eujã Traditional Natural Reserve", "Est. 2019 · 11,641 ha · Indigenous-managed + Rainforest Trust"],
              ["🧬", "Citizen Conservation", "Genetically verifying pure-bred P. terribilis lines across zoos worldwide"],
              ["💰", "Tesoros de Colombia", "Flooded legal market → price from $100+ to <$35, undercutting illegal trade"],
            ].map(([icon, org, detail]) => (
              <Card key={org} size="sm">
                <CardContent className="flex gap-3 pt-3">
                  <span className="text-base leading-none">{icon}</span>
                  <div>
                    <p className="text-sm font-medium">{org}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Callout icon={IconSword} title="The Captivity Paradox">
            Captive dart frogs are completely non-toxic — no <em>Melyridae</em> beetles means
            zero BTX accumulates. Can a non-toxic <em>P. terribilis</em> serve as real insurance
            if reintroduced frogs would be defenseless? This remains an open conservation
            question.
          </Callout>
        </section>

        <Separator />

        {/* Statement */}
        <section>
          <SectionHeading id="statement" icon={IconBrain}>
            Make a Statement
          </SectionHeading>
          <p className="mb-4 text-sm italic text-muted-foreground">
            &ldquo;Does the conservation value provided by zoos outweigh the ethical concerns
            about keeping the species in captivity in Knoxville, TN?&rdquo;
          </p>
          <Card className="py-0">
            <CardContent className="space-y-3 pt-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                For <em>Phyllobates terribilis</em>, the case for captive programs is strong —
                but only as a{" "}
                <strong className="text-foreground">
                  complement, not a substitute
                </strong>
                , for in-situ conservation.
              </p>
              <p>
                The frog occupies just five known localities in an active conflict zone where
                enforcement is nearly impossible. A single chytrid outbreak or mining spill
                could eliminate a population overnight. Zoo Knoxville&apos;s ARC Campus
                provides genuine genetic insurance, and its educational reach is real.
              </p>
              <p>
                The ethical cost is lower than for large megafauna — dart frogs don&apos;t
                need vast ranges or complex social structures. A 50 cm vivarium supports
                natural behavior and successful reproduction.
              </p>
              <p>
                The harder question is the toxicity paradox: captive frogs lack their defining
                adaptation. Until a reintroduction protocol can restore toxicity, captive
                programs are primarily genetic and educational rather than ecological insurance.
              </p>
            </CardContent>
            <div className="border-t bg-primary/5 px-4 py-3 text-sm">
              <strong className="text-foreground">Conclusion:</strong>{" "}
              <span className="text-muted-foreground">
                Yes — conditionally. Conservation value outweighs ethical concerns given low
                space requirements, catastrophic wild threats, and conflict-zone
                inaccessibility. The condition: ex-situ investment must fund in-situ
                protection alongside captive breeding, not replace it.
              </span>
            </div>
          </Card>
        </section>

        {/* Footer */}
        <div className="pb-2 pt-4 text-center text-xs text-muted-foreground">
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
