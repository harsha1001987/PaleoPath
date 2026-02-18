import React from 'react';
import { Clock, Leaf, Skull } from 'lucide-react';
import { motion } from 'framer-motion';
import './LearnShared.css';

export default function Eras() {
    const eras = [
        {
            title: "Cenozoic Era",
            time: "66 Million Years Ago - Present",
            subtitle: "The Age of Mammals",
            desc: "After the dinosaurs went extinct, mammals radiated to fill every niche. Grasslands spread, climates cooled, and eventually, humans appeared.",
            lifeforms: "Mammoths, Saber-toothed Cats, Whales, Humans",
            extinction: "Ongoing Holocene Extinction (Human-caused)"
        },
        {
            title: "Mesozoic Era",
            time: "252 - 66 Million Years Ago",
            subtitle: "The Age of Reptiles",
            desc: "The era of dinosaurs, pterosaurs, and marine reptiles. Flowering plants (Angiosperms) first appeared here. The supercontinent Pangea broke apart.",
            lifeforms: "T-Rex, Triceratops, Velociraptor, Pteranodon",
            extinction: "K-Pg Event: Asteroid impact in Mexico wiped out 75% of life."
        },
        {
            title: "Paleozoic Era",
            time: "541 - 252 Million Years Ago",
            subtitle: "The Explosion of Life",
            desc: "Life moved from the ocean to land. First came plants, then arthropods, then amphibians and early reptiles. Huge forests formed coal deposits.",
            lifeforms: "Trilobites, Dimetrodon, Giant Dragonflies, Early Sharks",
            extinction: "The 'Great Dying' (Permian-Triassic): 96% of marine species vanished."
        },
        {
            title: "Precambrian",
            time: "4.6 Billion - 541 Million Years Ago",
            subtitle: "The Beginning",
            desc: "The vast majority of Earth's history. Formation of the planet, cooling crust, and the appearance of single-celled life that oxygenated the air.",
            lifeforms: "Cyanobacteria, Stromatolites, Ediacaran Biota",
            extinction: "Oxygen Catastrophe: Oxygen became toxic to early anaerobic life."
        }
    ];

    return (
        <section className="learn-section">
            <div className="learn-container">

                {/* HEADER */}
                <motion.div
                    className="learn-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="learn-title-row">
                        <Clock size={32} strokeWidth={1.5} />
                        <h2 className="learn-title">Geological Eras</h2>
                        <Clock size={32} strokeWidth={1.5} />
                    </div>
                    <div className="learn-divider"></div>
                    <p className="learn-subtitle">
                        A journey through deep time.
                    </p>
                </motion.div>

                {/* TIMELINE */}
                <div className="relative border-l-2 border-stone-300 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
                    {eras.map((era, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Dot */}
                            <div className="absolute -left-[43px] md:-left-[59px] top-6 w-5 h-5 bg-stone-100 border-4 border-stone-400 rounded-full z-10"></div>

                            {/* Card */}
                            <div className="learn-card" style={{ marginBottom: 0 }}>
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                                        {era.time}
                                    </span>
                                    <h3 className="font-serif text-2xl font-bold text-stone-800">{era.title}</h3>
                                    <p className="font-serif italic text-stone-500">{era.subtitle}</p>
                                </div>

                                <p className="learn-text" style={{ margin: "0 0 1.5rem 0", maxWidth: "100%" }}>
                                    {era.desc}
                                </p>

                                <div className="card-grid" style={{ gap: "1.5rem" }}>
                                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                                        <h4 className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                                            <Leaf className="w-4 h-4" /> Key Lifeforms
                                        </h4>
                                        <p className="font-serif text-stone-700 text-sm">{era.lifeforms}</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                                        <h4 className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                                            <Skull className="w-4 h-4" /> Major Extinction
                                        </h4>
                                        <p className="font-serif text-red-900/80 text-sm">{era.extinction}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="learn-text"
                    style={{ textAlign: "center", marginTop: "4rem" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p>
                        The Geological Time Scale is the "calendar" for events in Earth history.
                        It is a system of chronological dating that relies on strata to relate stratigraphy to time.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
