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
        project_images: [],
        fund_goal: '',
        start_date: '',
        end_date: '',
    });

    // set category function
    // for step 1
    function setCat(category) {
        console.log(`User wants to set the category as: ${category}`);
        setNewProject({ ...newProject, category });
    }

    // function to set title and details
    // for step 2
    function setOverviewDeets(title,desc){
        setNewProject({...newProject,
        title,
        description: desc,
    })
    }

    function setImageContent(imageLinksArray){
        imageLinksArray.forEach(link => {
            setNewProject({...newProject,
                project_images: newProject.project_images.push(link),
            })
        });

        return newProject.project_images;
    }

    // we can use these exports with our #useNewProject
    const newProjectState = {
        newProject,
        setCat,
        setOverviewDeets,
        setImageContent
    };

    return (
        <NewProjectContext.Provider value={newProjectState}>
            {children}
        </NewProjectContext.Provider>
    );
}
