import React, { useEffect, useState } from "react";
import Defect from "./Defect";
import endpoints from './Endpoints'
import axios from 'axios'

// define the project to inspect
export default function Project(props) {

    
    const [allCustomers, setNewAllCustomers] = useState([])
    const [customer, setNewCustomer] = useState('')

    const [allProjects, setNewAllProjects] = useState([])
    const [project, setNewProject] = useState(null) 
    const [partID, setNewPartID] = useState(null)
    const [image_reference, setNewImageReference] = useState('')

    const [allOperators, setNewAllOperators] = useState([])
    const [operator, setNewOperator] = useState(null)
    
    const [inspectionStage, setNewInspectionStage] = useState('Final inspection')
    const [serialNumber, setNewSerialNumber] = useState('')
    const [isSerial, setIsSerial] = useState(false)

    const [displayCustomerSelector, setDisplayCustomerSelector] = useState(true)
    const [displayProjectSelector, setDisplayProjectSelector] = useState(false)
    const [displayOperatorselector, setDisplayOperatorSelector] = useState(false)
    const [displaySerialNumberInput, setDisplaySerialNumberInput] = useState(false)
    const [displaySerialNumber, setDisplaySerialNumber] = useState(false)
    const [displayPassFailButtons, setDisplayPassFailButtons] = useState(false)
    const [displayDefectReport, setDisplayDefectReport] = useState(false)

    const noDisplay = null

    useEffect(() => {
        getCustomers();
        getOperatorsList();
        }, 
        []
    )

    //move to the next part
    function resetPart() {
        setNewSerialNumber('')
        setDisplayPassFailButtons(false)
        setDisplaySerialNumberInput(true)
        setDisplayDefectReport(false)
        setDisplayDefectReport(false)
    }

    // move to the next project
    function resetProject() {
        setNewAllProjects([])
        setNewProject('')
        setNewCustomer('')
        setNewSerialNumber('')
        setDisplayCustomerSelector(true)
        setDisplayProjectSelector(false)
        setDisplaySerialNumberInput(false)
        setDisplayDefectReport(false)
        setDisplayOperatorSelector(false)
    }

    function getCustomers() {

        axios(
            {
            method: 'GET',
            url: endpoints.customerUrl
            }
        ).then((response) => {
          const data = response.data;
          setNewAllCustomers(data)      
        }).catch((error) => {
          if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
         }
        })
    }

    function getProjectsList(e) {

        e.preventDefault()

        setDisplayCustomerSelector(false)
        setDisplayProjectSelector(true)
        
    
        axios(
            {
            method: 'GET',
            url: endpoints.projectUrl
            }
        ).then((response) => {
          const data = response.data;
          const projectsList = data.filter(i => i.customer == e.target.value);
          setNewAllProjects(projectsList);    
        }).catch((error) => {
          if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
         }
        })
        setNewCustomer(e.target.textContent)
    }

    function getOperatorsList() {

        axios(
            {
            method: 'GET',
            url: endpoints.operatorUrl
            }
        ).then((response) => {
          const data = response.data;
          setNewAllOperators(data)   
        }).catch((error) => {
          if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
         }
        })
    }
    
    function selectProject(e) {
        e.preventDefault()
        const project = e.target.value
        setNewProject(project)

        const selectedProject = new Object(allProjects[project -1])
        
        setNewImageReference(selectedProject.img_reference)
        setDisplaySerialNumberInput(true)
        console.log(selectedProject)
        console.log('image in Project', image_reference)
    }

    function selectOperator(e) {
        e.preventDefault()
        const operator = e.target.value
        setNewOperator(operator)
    }

    function selectInspectionStage(e) {
        setNewInspectionStage(e.target.value);
        setDisplayOperatorSelector(!displayOperatorselector)
        
    }

    function savePart(e) {

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true

        const passed = e.target.value

        const data = {
            'project': project,
            'serial_number': serialNumber, 
            'stage': inspectionStage, 
            'passed': passed
        };

        axios(
            {
            method: 'POST',
            url: endpoints.partUrl,
            headers: {
                'Content-Type': 'application/json',
              },
            data: data,
            }
        ).then((response) => {
            const data = response.data;
            setNewPartID(data.id)
            
        }).catch((error) => {
            if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        });

        if (passed == 'true') {
            resetPart()}
            else {
                setDisplayPassFailButtons(false)
                setDisplaySerialNumberInput(false)
                setDisplaySerialNumber(true)
                setDisplayDefectReport(true)
            }
    }

    function isSerialValid() {
        if (serialNumber.length >= 9 && serialNumber.length < 11) {
          setIsSerial(true)
          setDisplayPassFailButtons(true)
          console.log (isSerial)
          return true
        }
        window.alert('The serial number you put is not valid')
        return false
    }

    const customerSelector = (
        <div>{allCustomers.map((customer, index) => (
            <button key={index} onClick={getProjectsList} value={customer.id}>
                {customer.customer_name}
            </button>
            ))}
        </div>
    )

    const projectSelector = (
        <div>
            <select onChange={selectProject} onMouseDown={()=>{}}>
            <option>Select your part from the list</option>
            {allProjects.map((option, index) =>(
                <option key={index} value={option.id}>
                    {option.fg_code + ':  ' + option.description}
                </option>))}
            </select>
        </div>
    )

    const operatorSelector = (
        <div>
            <select onChange={selectOperator} onMouseDown={()=>{}}>
            <option>Select the Aclass operator from the list</option>
            {allOperators.map((op, index) =>(
                <option key={index} value={op.id}>
                    {op.name}
                </option>))}
            </select>
        </div>
    )

    const serialNumberInput = (
        <div>
            <form >
                <label id="serialLabel">SERIAL NUMBER</label>
                    <input type="text" value={serialNumber} onChange={(e) => { setNewSerialNumber(e.target.value) }} />
                <button type="submit" onClick={(e) => { e.preventDefault(); isSerialValid()}}>+</button>
            </form>
        </div>
    )


    const passFailButtons = <div>
        <button id="okButton" onClick={savePart} value={true}>Passed</button>
        <button id="failButton" onClick={savePart} value={false}>Failed</button>
    </div>

    const defectReport = <div>
        <Defect
            project={project - 1}
            serialNumber={serialNumber}
            stage={inspectionStage}
            part={partID}
            img={image_reference}
            operator={operator}
            
        />
    </div>

    return <div>
        <div>
        <div>
            <label>Select an inspection stage</label>
            <select onChange={selectInspectionStage}>
                <option value={"Final Inspection"}>
                    Final Inspection
                </option>
                <option value={"Pre-paint Inspection"}>
                    Prepaint Inspection
                </option>
            </select>
            </div>
            <h4>{customer}</h4>
            <div>
            {displayOperatorselector ? operatorSelector: noDisplay}
            {displayCustomerSelector ? customerSelector: noDisplay}
            {displayProjectSelector ? projectSelector: noDisplay}
            </div>
            
        </div>
        <div>
            {displaySerialNumberInput ? serialNumberInput: noDisplay}
            {displaySerialNumber ? serialNumber: noDisplay}
            {displayPassFailButtons ? passFailButtons: noDisplay}
            {displayDefectReport? defectReport: noDisplay}
            
        </div>
        <div>
            <button  onClick={resetPart}>Next Part</button>
            <button  onClick={resetProject}>New Project</button>
        </div>
        
    </div>
}
