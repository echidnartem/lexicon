import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../../pages/HomePage/HomePage";
import StatisticsPage from "../../pages/StatisticsPage/StatisticsPage";
import TestsPage from "../../pages/TestsPage/TestsPage";
import WordsPage from "../../pages/WordsPage/WordsPage";
import WordPage from "../../pages/WordPage/WordPage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import TestSessionPage from "../../pages/TestSessionPage/TestSessionPage";
import TestResultPage from "../../pages/TestResultPage/TestResultPage";

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
