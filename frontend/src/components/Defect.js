import React, {useEffect, useState} from 'react'
import endpoints from './Endpoints'
import axios from 'axios'
import Canvas from './Canvas'

export default function Defect(props) {

    const image = props.img

    const [defectNames, setDefectNames] = useState([])
    const [selectedDefectNameID, setSelectedDefectNameID] = useState(null)
    const [defectLocation, setDefectLocation] = useState([])
    const [status, setNewStatus] = useState('Rework')

    const [enableMarking, setEnableMarking] = useState(false)
    const [redrawCanvas, setRedrawCanvas] = useState(false)

    const noDisplay = null

    useEffect( () =>
        {getDefectNames()}
    , [])

    function getDefectNames() {

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true

        axios(
            {
            method: 'GET',
            url: endpoints.defectsUrl,
            headers: {
                'Content-Type': 'application/json',
              },
            }
        ).then((response) => {
            const data = response.data;
            setDefectNames(data)
            
        }).catch((error) => {
            if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        });
        return false
    }

    const defect = {
        "part": props.part,
        "status": status,
        "defect_name": selectedDefectNameID,
        "defect_location": defectLocation,
        "operator": 2,
    }

    function saveDefectReport() {

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true

        axios(
            {
            method: 'POST',
            url: endpoints.reportsUrl,
            headers: {
                'Content-Type': 'application/json',
              },
            data: defect,
            }
        ).then((response) => {
            const data = response.data;
            console.log(data) 
        }).catch((error) => {
            if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        });
        setRedrawCanvas(!redrawCanvas)
    
    }

    function selectDefectName(e) {
        setEnableMarking(true)
        setSelectedDefectNameID(e.target.value)    
            
    }

    console.log('The defect ready to save', defect)
    return <div>
            <h3>This is a defect report</h3>
            <label>Select a defect name</label>
            <select onChange={selectDefectName}>
                <option>Select</option>
                {defectNames.map((option, index)=>(
                <option key={index} value={index+1}>{option.name}</option>))}
            </select>
                <Canvas
                    image={image}
                    enableMarking={enableMarking}
                    setCoordinates={setDefectLocation}
                    redraw={redrawCanvas}
                />
            <select onChange={(e)=>setNewStatus(e.target.value)}>
                <option>
                    Rework
                </option>
                <option>
                    Scrap
                </option>
            </select>
            <button onClick={saveDefectReport}>
                Save Defect
            </button>
            </div>

}