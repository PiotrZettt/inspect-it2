import React, { useEffect, useState } from "react";
import Project from "./Project";
import Defect from "./Defect";
export default function Inspection() {

    // inspection process
    const [inspectionStage, setNewInspectionStage] = useState('')
    const [passed, setNewPassed] = useState('')
     
    // defects found
    const [defect_name, setNewDefectName] = useState('')
    const [defect_location, setNewDefectLocation] = useState([])

    const noDisplay = <div></div>


    return (
        <div>
            <h3> This is the space where the inspection data gathering will take place. 
                First we will define the part by recording the FG Code and serial number.
                The name and description will appear.
                Next, we will decide whether the part is ok or not. Pressing the "Pass" Button
                will automatically save the part. Pressing the "Fail" button will show the defects dropdown list 
                and also a part diagram so we can mark down the defects location. Multiple locations are allowed.

                </h3>
                
                <Project/>   
        </div>
    )

}