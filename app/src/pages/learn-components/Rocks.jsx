import React from 'react';
import { Layers, Activity, Hexagon, Component, Mountain, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import './LearnShared.css';

export default function Rocks() {
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
                        <Layers size={32} strokeWidth={1.5} />
                        <h2 className="learn-title">Rocks & Minerals</h2>
                        <Layers size={32} strokeWidth={1.5} />
                    </div>
                    <div className="learn-divider"></div>
                    <p className="learn-subtitle">
                        The pages of Earth's history book.
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
                        Fossils are almost exclusively found in <strong>sedimentary rocks</strong>.
                        These rocks form from layers of mud, sand, and silt that pile up over millions of years.
                        Understanding rock types is the first step in knowing where to look for fossils.
                    </p>
                </motion.div>

                {/* STRATIGRAPHY CARD */}
                <motion.div
                    className="learn-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="card-header">
                        <Activity className="text-orange-600" size={24} />
                        <h3>The Law of Superposition</h3>
                    </div>
                    <div className="card-grid">
                        <div>
                            <h4>The Concept</h4>
                            <p>
                                In an undisturbed sequence of rocks, the oldest layers are at the bottom and the youngest layers are at the top.
                                Think of it like a laundry basket: the clothes you threw in last week are at the bottom.
                            </p>
                        </div>
                        <div>
                            <h4>Why it Matters</h4>
                            <p>
                                This principle allows paleontologists to date fossils relatively. If Fossil A is found below Fossil B, then A is older than B.
                                This creates a relative timeline of life on Earth.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ROCK CYCLE (3 COLUMNS) */}
                <motion.div
                    className="learn-two-col"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
                >
                    <div className="info-box">
                        <Mountain className="text-orange-600 mb-4" size={26} />
                        <h3>Igneous</h3>
                        <p>
                            Formed from cooling magma or lava. Fossils are strictly <strong>absent</strong> here because the extreme heat destroys any organic remains instantly.
                        </p>
                    </div>

                    <div className="info-box" style={{ border: "2px solid #fdba74" }}>
                        <Layers className="text-orange-600 mb-4" size={26} />
                        <h3>Sedimentary</h3>
                        <p>
                            Formed by the accumulation of sediment. This is the <strong>Goldilocks zone</strong> for fossils—gentle burial preserves hard parts over eons.
                        </p>
                    </div>

                    <div className="info-box">
                        <Hexagon className="text-orange-600 mb-4" size={26} />
                        <h3>Metamorphic</h3>
                        <p>
                            Rocks changed by intense heat and pressure. Fossils here are usually distorted, stretched, or completely destroyed by the geological stress.
                        </p>
                    </div>
                </motion.div>

                {/* MINERALIZATION FACTS */}
                <motion.div
                    className="learn-facts"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="facts-title">Mineralization Process</h3>
                    <ul>
                        <li>Groundwater rich in minerals seeps into the pores of bone or wood.</li>
                        <li>Over thousands of years, minerals like silica or calcite precipitate out.</li>
                        <li>The original organic material decays, leaving a rock replica of the structure.</li>
                        <li>The result is a heavy, stone-like object that retains the shape of the life form.</li>
                    </ul>
                </motion.div>

            </div>
        </section>
    );
}
