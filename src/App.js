import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUsPage from "./component/AboutUsPage";
import BlogDetails from "./component/BlogDetails";
import BlogPage from "./component/BlogPage";
import DailyFeed from "./component/DailyFeed";
import DailyfeedDetails from "./component/DailyfeedDetails";
import ForgotPage from "./component/ForgotPage";
import HomePage from "./component/HomePage";
import LogInPage from "./component/LogInPage";
import PersonalPage from "./component/PersonalPage";

import SignUpPage from "./component/SignUpPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/blog" element={<BlogPage />} />

          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/personal/:id" element={<PersonalPage />} />
          <Route path="/personal/:id/dailyfeed" element={<DailyFeed />} />
          <Route path="dailyfeed/:id" element={<DailyfeedDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
