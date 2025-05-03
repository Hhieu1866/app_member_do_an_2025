import React from "react";
import SearchComponent from "../components/SearchComponent";
import { Page } from "zmp-ui";

const LessonList = () => {
    return (
        <Page className="bg-white p-6">
            <SearchComponent />
            <p className="font-bold text-2xl mt-6">All lessons</p>
        </Page>
    );
};

export default LessonList;
