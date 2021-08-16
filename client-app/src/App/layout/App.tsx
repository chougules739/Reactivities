import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Container } from 'semantic-ui-react'
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../modules/activity";
import NavBar from "./Navbar";
import {v4 as uuid} from'uuid';

function App(){
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/Activities').then(response=>{
            setActivities(response.data);
        })
    }, [])

    function handleSelectActivity(id: string){
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectedActivity() {
        setSelectedActivity(undefined);
    }

    function handleOpenForm(id: string){
        id ? handleSelectActivity(id) : handleCancelSelectedActivity();
        setEditMode(true);
    }

    function handleCloseForm(){
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity){
        console.log(activity);
        activity.id
            ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id: uuid()}]);

        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string){
        setActivities([...activities.filter(x => x.id !== id)]);  
    }

    return(
        <Fragment>
            <NavBar openForm={handleOpenForm} />
            <Container className="u-margin-top-7-em">
                <ActivityDashboard 
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectedActivity}
                    editMode={editMode}
                    openForm={handleOpenForm}
                    closeForm={handleCloseForm}
                    createOrEditActivity={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </Fragment>
    )
}

export default App;