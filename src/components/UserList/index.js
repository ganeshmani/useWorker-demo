import React,{ useEffect,useState } from 'react';
import { fetchUsers,sortListDescending,sortListAscending } from '../../utils/sortData'

import { useWorker,WORKER_STATUS } from "@koale/useworker";

import { useToasts } from "react-toast-notifications";

import './index.css'
const UserList = () => {

    const  [users,setUsers] = useState([]);
    const [status,setStatus] = useState('DESC')
    const [workerState,setWorkerState] = useState('DESC')

    const { addToast } = useToasts();


    const [sortListDescWorker,{ status : DescWorkerStatus,kill: DescWorkerKill }] = useWorker(sortListDescending)
    const [sortListAscWorker,{ status : AscWorkerStatus,kill : AscWorkerKill }] = useWorker(sortListAscending);


    useEffect(() => {
        async function fetchData(){
            const user = await fetchUsers();
            setUsers(user)
        }
        fetchData()
    },[])

    const sortData = () => {
        sortListDescending(users);
       setStatus('ASC')
    //    setUsers(sortedData)
       addToast("Finished: Sort.", { appearance: "success" });
    }

    const sortWorkerData = async () => {
        try {
            const users = await fetchUsers();
           await sortListDescWorker(users);
            setWorkerState('ASC')
            // setUsers(sortedData)
         addToast("Finished: Sort using useWorker.", { appearance: "success" });
        }
        catch(e){
            console.log(e);
         addToast("Some Error Occurred", { appearance: "error" });
        }
       
    }

    const sortDataAsc = () => {
        const sortedData = sortListAscending(users);

        setStatus('DESC');
        // setUsers(sortedData)
        addToast("Finished: Sort.", { appearance: "success" });
    }

    const sortWorkerDataAsc = async () => {
        try {
            const users = await fetchUsers();
            await sortListAscWorker(users);
            setWorkerState('DESC');
            // setUsers(sortedData)
            addToast("Finished: Sort using useWorker.", { appearance: "success" });
        }
        catch(e){
            console.log(e);
            addToast("Some Error Occurred", { appearance: "error" });
        }
     
    }


    return (<div className="user-div">
        <button className="sort-button" onClick={ status && status === 'DESC' ? sortData : sortDataAsc}>Sort Data</button>

        <button className="sort-button" disabled={AscWorkerStatus === WORKER_STATUS.RUNNING || DescWorkerStatus === WORKER_STATUS.RUNNING} onClick={ workerState && workerState === 'DESC' ? sortWorkerData : sortWorkerDataAsc}>{ AscWorkerStatus === WORKER_STATUS.RUNNING || DescWorkerStatus === WORKER_STATUS.RUNNING  ? `Loading` : 'useWorker Sort' }</button>
        { AscWorkerStatus === WORKER_STATUS.RUNNING || DescWorkerStatus === WORKER_STATUS.RUNNING ? (<button className="sort-button" onClick={AscWorkerStatus === WORKER_STATUS.RUNNING ? AscWorkerKill : DescWorkerKill}>Kill Worker</button>) : null }
    </div>);
}

export default UserList;