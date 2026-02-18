import React from 'react';
import { Trophy, MapPin, Calendar, ScrollText } from 'lucide-react';
import { motion } from 'framer-motion';
import './LearnShared.css';

export default function Discoveries() {
    const discoveries = [
        {
            name: "Lucy",
            species: "Australopithecus afarensis",
            date: "1974",
            location: "Ethiopia",
            desc: "Lucy proved that our ancestors walked upright (bipedalism) long before they evolved large brains. She is about 3.2 million years old and 40% complete."
        },
        {
            name: "Sue",
            species: "Tyrannosaurus rex",
            date: "1990",
            location: "South Dakota, USA",
            desc: "The largest and best-preserved T. rex ever found. Over 90% of the skeleton was recovered. Sue is now displayed at the Field Museum in Chicago."
        },
        {
            name: "Archaeopteryx",
            species: "Archaeopteryx lithographica",
            date: "1861",
            location: "Germany",
            desc: "Found just two years after Darwin's 'Origin of Species', this fossil showed a perfect mix of dinosaur (teeth, tail) and bird (feathers) features."
        },
        {
            name: "The Fighting Dinosaurs",
            species: "Velociraptor vs. Protoceratops",
            date: "1971",
            location: "Mongolia",
            desc: "Locked in mortal combat. A sand dune collapse buried them mid-fight, capturing a violent moment from 75 million years ago forever."
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
                        <Trophy size={32} strokeWidth={1.5} />
                        <h2 className="learn-title">Famous Discoveries</h2>
                        <Trophy size={32} strokeWidth={1.5} />
                    </div>
                    <div className="learn-divider"></div>
                    <p className="learn-subtitle">
                        Fossils that changed how we see the world.
                    </p>
                </motion.div>

                {/* HISTORICAL SPOTLIGHT */}
                <motion.div
                    className="learn-card"
                    style={{ background: "#fafaf9", borderLeft: "4px solid #d6d3d1" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="card-header">
                        <ScrollText className="text-stone-600" size={24} />
                        <h3>Historical Spotlight: The Bone Wars</h3>
                    </div>
                    <div className="learn-text" style={{ marginBottom: 0 }}>
                        <p>
                            In the late 19th century, two rival paleontologists, <strong>O.C. Marsh</strong> and <strong>E.D. Cope</strong>, resorted to bribery, theft, and destruction of bones in a race to discover the most dinosaurs.
                        </p>
                        <p style={{ fontStyle: "italic", color: "#57534e" }}>
                            Despite their petty feud, they discovered over 136 new species, including Triceratops, Stegosaurus, and Allosaurus.
                        </p>
                    </div>
                </motion.div>

                {/* DISCOVERIES GRID */}
                <div className="space-y-8">
                    {discoveries.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="learn-card"
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div>
                                    <h3 className="font-serif text-2xl font-bold text-stone-800">{item.name}</h3>
                                    <span className="font-serif italic text-stone-500">{item.species}</span>
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wider text-stone-400">
                                    <span className="flex items-center gap-1 bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
                                        <Calendar size={14} /> {item.date}
                                    </span>
                                    <span className="flex items-center gap-1 bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
                                        <MapPin size={14} /> {item.location}
                                    </span>
                                </div>
                            </div>

                            <p className="font-serif text-stone-600 leading-relaxed text-lg">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
