import React from "react";
import { BookOpen, Search, Globe, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import "./LearnShared.css";

export default function Basics() {
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
                        <BookOpen size={32} strokeWidth={1.5} />
                        <h2 className="learn-title">What is Paleontology?</h2>
                        <BookOpen size={32} strokeWidth={1.5} />
                    </div>

                    <div className="learn-divider"></div>

                    <p className="learn-subtitle">
                        Unlocking the mysteries of Earth's deep past.
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
                        Paleontology is the scientific study of life that existed prior to
                        the start of the Holocene epoch (~11,700 years ago). By examining
                        fossils, scientists reconstruct ecosystems, understand evolutionary
                        transitions, and uncover how organisms adapted to changing
                        environments.
                    </p>

                    <p>
                        It sits at the intersection of <strong>Biology</strong> (the study
                        of life) and <strong>Geology</strong> (the study of Earth).
                        Paleontologists use biological principles to interpret fossil
                        remains and geological knowledge to determine their age and
                        environmental context.
                    </p>
                </motion.div>

                {/* MISCONCEPTION CARD */}
                <motion.div
                    className="learn-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="card-header">
                        <Search size={22} className="text-emerald-600" />
                        <h3>Common Misconception</h3>
                    </div>

                    <div className="card-grid">
                        <div>
                            <h4>Archaeology</h4>
                            <p>
                                The study of <em>human</em> history through artifacts such as
                                tools, pottery, and structures.
                            </p>
                        </div>

                        <div>
                            <h4>Paleontology</h4>
                            <p>
                                The study of <em>ancient life</em> — plants, animals, fungi —
                                through fossils.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* WHY IT MATTERS */}
                <motion.div
                    className="learn-two-col"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="info-box">
                        <Globe size={26} className="text-emerald-600" />
                        <h3>Predicting the Future</h3>
                        <p>
                            Studying past climate shifts and mass extinctions helps scientists
                            model how life may respond to modern global change.
                        </p>
                    </div>

                    <div className="info-box">
                        <PenTool size={26} className="text-emerald-600" />
                        <h3>Industrial Applications</h3>
                        <p>
                            Micropaleontology helps identify oil-bearing rock layers using
                            fossilized microorganisms such as foraminifera.
                        </p>
                    </div>
                </motion.div>

                {/* KEY FACTS */}
                <motion.div
                    className="learn-facts"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="facts-title">Key Facts</h3>

                    <ul>
                        <li>
                            The term comes from Greek: <em>palaios</em> (old),
                            <em> ontos</em> (being), and <em>logos</em> (study).
                        </li>
                        <li>
                            It explains the evolutionary origins of modern species,
                            including humans.
                        </li>
                        <li>
                            It ranges from microscopic pollen studies to giant dinosaurs.
                        </li>
                        <li>
                            Fossils remain the primary data source, but chemical and
                            molecular evidence are increasingly used.
                        </li>
                    </ul>
                </motion.div>

            </div>
        </section>
    );
}