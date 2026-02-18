import React from 'react';
import { Shell, Info, Skull, CloudRain, Eye, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import './LearnShared.css';

export default function Fossils() {
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
                        <Shell size={32} strokeWidth={1.5} />
                        <h2 className="learn-title">Fossils & Traces</h2>
                        <Shell size={32} strokeWidth={1.5} />
                    </div>
                    <div className="learn-divider"></div>
                    <p className="learn-subtitle">
                        Echoes of life preserved in stone.
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
                        Fossils are not just bones. They are any preserved remains, impressions, or traces of any once-living thing from a past geological age.
                        Considering how quickly most things rot, becoming a fossil is incredibly rare. It requires a specific set of circumstances:
                        rapid burial, lack of oxygen, and mineral-rich water.
                    </p>
                    <p>
                        We also study <strong>Trace Fossils</strong> (Ichnofossils) like footprints, burrows, and nests. These are crucial because they
                        record the <em>behavior</em> of the animal while it was alive, something bones alone cannot tell us.
                    </p>
                </motion.div>

                {/* TAPHONOMY CARD */}
                <motion.div
                    className="learn-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="card-header">
                        <Skull className="text-amber-600" size={24} />
                        <h3>Taphonomy: The Journey of Death</h3>
                    </div>
                    <div className="card-grid">
                        <div>
                            <h4>What is Taphonomy?</h4>
                            <p>
                                It is the study of decaying organisms over time and how they may become fossilized.
                                "The fossil record is a history of the hard parts."
                            </p>
                        </div>
                        <div>
                            <h4>The Process</h4>
                            <p>
                                1. <strong>Death & Decay</strong>: Soft tissues rot away.<br />
                                2. <strong>Rapid Burial</strong>: Sediment covers remains.<br />
                                3. <strong>Discovery</strong>: Erosion exposes the fossil.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* PRESERVATION MODES (2 COLUMNS) */}
                <motion.div
                    className="learn-two-col"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="info-box">
                        <Box className="text-amber-600 mb-4" size={26} />
                        <h3>Permineralization</h3>
                        <p>
                            Minerals fill empty pores (bone/wood) and crystallize to stone. This is the most common mode for dinosaur bones.
                        </p>
                    </div>

                    <div className="info-box">
                        <Info className="text-amber-600 mb-4" size={26} />
                        <h3>Amber Incasement</h3>
                        <p>
                            Tree resin traps small organisms and hardens into amber. This preserves incredible detail, even soft tissues like feathers and insects.
                        </p>
                    </div>
                </motion.div>

                {/* FACTS */}
                <motion.div
                    className="learn-facts"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="facts-title">Fossil Types</h3>
                    <ul>
                        <li><strong>Body Fossils:</strong> The actual remains of an organism (bones, shells, teeth).</li>
                        <li><strong>Trace Fossils:</strong> Evidence of activity (footprints, burrows, coprolites).</li>
                        <li><strong>Chemical Fossils:</strong> Biomarkers or chemical signatures left in rocks.</li>
                        <li><strong>Pseudo-fossils:</strong> Patterns in rocks that look like life but aren't (dendrites).</li>
                    </ul>
                </motion.div>

            </div>
        </section>
    );
}
