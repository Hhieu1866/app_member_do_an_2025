import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";

import HomePage from "../pages/index";
import MainPage from "../pages/MainPage";
import Form from "../pages/form";
import User from "../pages/profile/User";
import BottomNav from "./BottomNav";
import LessonList from "../pages/LessonList";
// import QuizPage from "../pages/quiz/QuizPage";
// import QuizPlayPage from "../pages/quiz/QuizPlayPage";
// import QuizPlayModePage from "../pages/quiz/QuizPlayModePage";
import Setting from "../pages/Setting";
import LearningPath from "../pages/learning/LearningPath";
import LearningPathDetail from "../pages/learning/LearningPathDetail";
import LessonContent from "../pages/learning/LessonContent";
import MentorDetail from "../pages/mentor/MentorDetail";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/main-page" element={<MainPage />} />
              <Route path="/lessons-list" element={<LessonList />} />
              <Route path="/form" element={<Form />} />
              <Route path="/user" element={<User />} />
              <Route path="/setting" element={<Setting />} />
              {/* <Route path="/quiz" element={<QuizPage />} />{" "}
              <Route path="/quiz/:topicId/play" element={<QuizPlayPage />} />
              <Route
                path="/quiz/:topicId/:level"
                element={<QuizPlayModePage />}
              /> */}

              <Route path="/learning-path/:id" element={<LearningPath />} />
              <Route
                path="/learning-path/:id/lessons"
                element={<LearningPathDetail />}
              />
              <Route
                path="/learning-path/:id/lessons/:lessonId"
                element={<LessonContent />}
              />
              <Route path="/mentor/:mentorId" element={<MentorDetail />} />
            </AnimationRoutes>
            {/* <BottomNav /> */}
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;
