/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';

// creating context
const NewProjectContext = React.createContext();

// hook
export function useNewProject() {
    return useContext(NewProjectContext);
}

// main provider for site
export default function NewProjectProvider({ children }) {
    const [newProject, setNewProject] = useState({
        category: 'Experience',
        title: '',
        description: '',
        project_image: '',
        fund_goal: '',
        start_date: '',
        end_date: '',
    });

    // set category function
    function setCat(category) {
        console.log(`User wants to set the category as: ${category}`);
        setNewProject({ ...newProject, category });
    }
    // title
    function setTitle(title){
        console.log(`User wants to set the title as: ${title}`);
        setNewProject({ ...newProject, title });
    }

    // description
    function setDescription(description){
        console.log(`User wants to set the description as: ${description}`);
        setNewProject({ ...newProject, description });
    }

    // we can use these exports with our #useNewProject
    const newProjectState = {
        newProject,
        setCat,
        setTitle,
        setDescription
    };

    return (
        <NewProjectContext.Provider value={newProjectState}>
            {children}
        </NewProjectContext.Provider>
    );
}
