/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import app from '../../utils/Firebase'
import {useAuth} from '../AuthContext'

// creating context
const NewProjectContext = React.createContext();

// hook
export function useNewProject() {
    return useContext(NewProjectContext);
}

// main provider for site
export default function NewProjectProvider({ children }) {
    const {currentUser} = useAuth();
    const [newProject, setNewProject] = useState({
        category: 'Experience',
        title: '',
        description: '',
        project_images: [],
        fund_goal: '',
        start_date: '',
        end_date: '',
        user: '',
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
        console.log('set context files...')
        setNewProject({...newProject,
            project_images: [...imageLinksArray],
        })
        setTimeout(()=>{
            console.log([...newProject.project_images]);
        },1000)
        return newProject.project_images;
    }

    async function uploadImages(){
        console.log(newProject.project_images);
        const storageRef = app.storage().ref();
        // let vals;

        // upload
        console.log('uploading first file...');
        const fileRef1 = storageRef.child(newProject.project_images[0].name);
        // await fileRef1.put(newProject.project_images[0])

        console.log('uploading second file...');
        const fileRef2 = storageRef.child(newProject.project_images[1].name);
        // await fileRef2.put(newProject.project_images[1])

        console.log('uploading third file...');
        const fileRef3 = storageRef.child(newProject.project_images[2].name);

        return Promise.all([fileRef1.put(newProject.project_images[0]),fileRef2.put(newProject.project_images[1]),fileRef3.put(newProject.project_images[2])])

    }

    function createNewProjectOnFirebase() {
        if (!currentUser){
            throw new Error('User must be signed in or authorized!');
        }

        const newFirebaseProject = app.functions().httpsCallable('projects');
        return newFirebaseProject(newProject);
    }


    // we can use these exports with our #useNewProject
    const newProjectState = {
        newProject,
        setCat,
        setOverviewDeets,
        setImageContent,
        uploadImages,
        createNewProjectOnFirebase
    };

    return (
        <NewProjectContext.Provider value={newProjectState}>
            {children}
        </NewProjectContext.Provider>
    );
}
