import React from 'react';
import { Truck, Map, Hammer, ClipboardList, PenTool, Brush } from 'lucide-react';
import { motion } from 'framer-motion';
import './LearnShared.css';

export default function Excavation() {
    const steps = [
        {
            title: "Prospecting",
            icon: Map,
            desc: "Paleontologists don't just dig randomly. They study geological maps to find sedimentary rock layers of the right age. Then they walk miles of terrain looking for bone scraps eroding out of the hills."
        },
        {
            title: "Excavation",
            icon: Hammer,
            desc: "Once a site is found, the 'overburden' (top rock) is removed. As they get closer to the bone, tools switch to chisels, awls, and dental picks. The bone is exposed but left sitting on a pedestal of rock."
        },
        {
            title: "Jacketing",
            icon: ClipboardList,
            desc: "Fossils are heavy and fragile. They are covered in a separator (wet tissue) and then wrapped in burlap strips soaked in plaster, creating a hard protective 'field jacket' for transport."
        },
        {
            title: "Preparation",
            icon: PenTool,
            desc: "In the lab, preparators use microscopes and mini-jackhammers called 'air scribes' to remove the rock from the bone grain by grain. This process can take months for a single specimen."
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
                        <Truck size={32} strokeWidth={1.5} />
                        <h2 className="learn-title">Excavation Process</h2>
                        <Truck size={32} strokeWidth={1.5} />
                    </div>
                    <div className="learn-divider"></div>
                    <p className="learn-subtitle">
                        Science requires patience and precision.
                    </p>
                </motion.div>

                {/* INTRO TEXT */}
                <motion.div
                    className="learn-text"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <p>
                        Digging up fossils isn't like the movies. You don't just brush away some sand and pull out a perfect skull.
                        It is a painstaking process of mapping, chipping, and gluing. Removing a fossil from the ground without recording
                        its context is destructive—a fossil without location data is just a paperweight.
                    </p>
                </motion.div>

                {/* STEPS */}
                <div className="space-y-6">
                    {steps.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="learn-card"
                            style={{ display: "flex", gap: "2rem", alignItems: "flex-start", marginBottom: "2rem", padding: "2.5rem" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="hidden md:flex flex-shrink-0 w-16 h-16 bg-stone-100 rounded-full items-center justify-center text-amber-600">
                                <item.icon size={30} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Step {idx + 1}</span>
                                    <h3 className="text-xl font-bold text-stone-800 font-serif">{item.title}</h3>
                                </div>
                                <p className="font-serif text-stone-600 leading-relaxed text-lg">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* TOOLS CARD (DARK MODE) */}
                <motion.div
                    className="learn-card"
                    style={{ background: "#292524", color: "white", marginTop: "5rem", borderColor: "#44403c" }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="card-header" style={{ color: "white", justifyContent: "center", marginBottom: "3rem" }}>
                        <h3 style={{ fontSize: "2rem" }}>Tools of the Trade</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                            <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                                <Hammer className="text-stone-300 group-hover:text-white" />
                            </div>
                            <p className="text-stone-300 font-bold">Rock Hammer</p>
                        </div>
                        <div className="group">
                            <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                                <Brush className="text-stone-300 group-hover:text-white" />
                            </div>
                            <p className="text-stone-300 font-bold">Brush & Awl</p>
                        </div>
                        <div className="group">
                            <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                                <ClipboardList className="text-stone-300 group-hover:text-white" />
                            </div>
                            <p className="text-stone-300 font-bold">Field Notebook</p>
                        </div>
                        <div className="group">
                            <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                                <div className="text-stone-300 group-hover:text-white font-bold text-xl">GL</div>
                            </div>
                            <p className="text-stone-300 font-bold">Paleo-Bond</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
