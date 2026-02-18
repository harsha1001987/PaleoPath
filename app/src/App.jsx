import { Routes, Route } from "react-router-dom";
import UserBadge from "./UserBadge";


import Home from "./pages/Home.jsx";
import Onboarding from "./pages/OnBoarding.jsx";
import Timeline from "./pages/TimeLine.jsx";

import LearnPaleontology from "./pages/LearnPaleontology.jsx";

// Species pages
import ModernHumans from "./pages/ModernHumans.jsx";
import HomoSapiens from "./pages/HomoSapiens.jsx";
import HomoErectus from "./pages/HomoErectus.jsx";
import HomoHabilis from "./pages/HomoHabilis.jsx";
import Australopithecus from "./pages/Australopithecus.jsx";

// Quiz pages
import ModernHumansQuiz from "./quizes/ModernHumansQuiz.jsx";
import HomoSapiensQuiz from "./quizes/HomoSapiensQuiz.jsx";
import HomoErectusQuiz from "./quizes/HomoErectusQuiz.jsx";
import HomoHabilisQuiz from "./quizes/HomoHabilisQuiz.jsx";
import AustralopithecusQuiz from "./quizes/AustralopithecusQuiz.jsx";

// Survival mode pages

import SurvivalMode from "./pages/SurvivalMode.jsx";
import HomoErectusSurvival from "./SurvivalModes/HomoErectusSurvival.jsx";
import HomoSapiensSurvival from "./SurvivalModes/HomoSapiensSurvival.jsx";
import HomoHabilisSurvival from "./SurvivalModes/HomoHabilisSurvival.jsx";
import AustralopithecusSurvival from "./SurvivalModes/AustralopithecusSurvival.jsx";

export default function App() {
  return (
    <>
      <UserBadge />
      <Routes>
        {/* Core pages */}

        <Route path="/" element={<Home />} />
        <Route path="/begin" element={<Onboarding />} />
        <Route path="/timeline" element={<Timeline />} />

        {/* Species detail pages */}
        <Route path="/species/modern-humans" element={<ModernHumans />} />
        <Route path="/species/homo-sapiens" element={<HomoSapiens />} />
        <Route path="/species/homo-erectus" element={<HomoErectus />} />
        <Route path="/species/homo-habilis" element={<HomoHabilis />} />
        <Route path="/species/australopithecus" element={<Australopithecus />} />
        <Route path="/species/austrolopithecus" element={<Australopithecus />} />

        {/* Quiz pages */}
        <Route path="/quiz/modern-humans" element={<ModernHumansQuiz />} />
        <Route path="/quiz/homo-sapiens" element={<HomoSapiensQuiz />} />
        <Route path="/quiz/homo-erectus" element={<HomoErectusQuiz />} />
        <Route path="/quiz/homo-habilis" element={<HomoHabilisQuiz />} />
        <Route path="/quiz/australopithecus" element={<AustralopithecusQuiz />} />
        <Route path="/quiz/austrolopithecus" element={<AustralopithecusQuiz />} />

        {/* Survival mode */}
        <Route path="/survival" element={<SurvivalMode />} />
        <Route
          path="/survival/homo-erectus"
          element={<HomoErectusSurvival />}
        />
        <Route
          path="/survival/homo-habilis"
          element={<HomoHabilisSurvival />}
        />
        <Route
          path="/survival/australopithecus"
          element={<AustralopithecusSurvival />}
        />
        <Route
          path="/survival/homo-sapiens"
          element={<HomoSapiensSurvival />}
        />
        <Route path="/learn-paleontology" element={<LearnPaleontology />} />
      </Routes>
    </>
  );
}

