import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, Layers, Bone, Clock, Pickaxe, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./LearnNav.css";

// Import sub-components
import Basics from "./learn-components/Basics";
import Rocks from "./learn-components/Rocks";
import Fossils from "./learn-components/Fossils";
import Eras from "./learn-components/Eras";
import Excavation from "./learn-components/Excavation";
import Discoveries from "./learn-components/Discoveries";

const tabs = [
    { id: "paleontology", label: "Basics", icon: BookOpen, accent: "basics" },
    { id: "rocks", label: "Rocks", icon: Layers, accent: "rocks" },
    { id: "fossils", label: "Fossils", icon: Bone, accent: "fossils" },
    { id: "eras", label: "Eras", icon: Clock, accent: "eras" },
    { id: "excavation", label: "Excavation", icon: Pickaxe, accent: "excavation" },
    { id: "discoveries", label: "Discoveries", icon: MapPin, accent: "discoveries" },
];

export default function LearnPaleontology() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("paleontology");
    const navRef = useRef(null);

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    return (
        <div className="learn-page">

            {/* Navigation Header */}
            <nav className="learn-nav">
                <div className="learn-nav-inner">

                    {/* Back Button */}
                    <motion.button
                        whileHover={{ scale: 1.02, x: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(-1)}
                        className="learn-back-btn"
                    >
                        <span className="learn-back-icon">
                            <ArrowLeft size={15} />
                        </span>
                        <span className="learn-back-label">Return</span>
                    </motion.button>

                    {/* Tab Dock */}
                    <div ref={navRef} className="learn-tab-dock">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`learn-tab learn-tab--${tab.accent}${isActive ? " learn-tab--active" : ""}`}
                                    data-accent={tab.accent}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeTabBg"
                                            className="learn-tab-bg"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                                        />
                                    )}
                                    <Icon className="learn-tab-icon" size={15} strokeWidth={2} />
                                    <span className="learn-tab-label">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="learn-main">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                    >
                        {activeTab === "paleontology" && <Basics />}
                        {activeTab === "rocks" && <Rocks />}
                        {activeTab === "fossils" && <Fossils />}
                        {activeTab === "eras" && <Eras />}
                        {activeTab === "excavation" && <Excavation />}
                        {activeTab === "discoveries" && <Discoveries />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
