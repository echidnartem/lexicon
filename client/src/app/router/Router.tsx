import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { HomePage } from "../../pages/HomePage";
import { SettingsPage } from "../../pages/SettingsPage";
import { StatisticsPage } from "../../pages/StatisticsPage";
import { TestResultPage } from "../../pages/TestResultPage";
import { TestSessionPage } from "../../pages/TestSessionPage";
import { TestsPage } from "../../pages/TestsPage";
import { WordPage } from "../../pages/WordPage";
import { WordsPage } from "../../pages/WordsPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="words" element={<WordsPage />} />
        <Route path="words/:wordId" element={<WordPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="tests/session" element={<TestSessionPage />} />
        <Route path="tests/result" element={<TestResultPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
