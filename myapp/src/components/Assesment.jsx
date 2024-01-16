import React, { useEffect, useRef, useState } from 'react'
const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const Assesment = () => {
    const [users, setUsers] = useState([]);
    const [usersInCard, setUsersInCard] = useState([]);
    let index = useRef(-1)
    const [backFlag, setBackFlag] = useState(true);
    const [nextFlag, setNextFlag] = useState(true);

    useEffect(()=>{
        try {
            fetch(BASE_URL).then((res)=>res.json().then((res)=>setUsers(res)))
        } catch (error) {
            console.log(error);
        }
    },[])

    const handleGoBack = (e) =>{
        e.preventDefault();
        if(index.current>0){
            index.current = index.current-1;
            setNextFlag(false);
            if(index.current===0)setBackFlag(true)
            setUsersInCard((prevUsers) => {
                const updatedUsers = [...prevUsers];
                return updatedUsers;
            });
        }
    }

    const handleGoNext = (e) =>{
        e.preventDefault();
        if(index.current<usersInCard.length-1){
            index.current = index.current+1;
            setBackFlag(false);
            if(index.current===usersInCard.length-1)setNextFlag(true);
            setUsersInCard((prevUsers) => {
                const updatedUsers = [...prevUsers];
                return updatedUsers;
            });
        }
    }

    const handlEndClick = (e) =>{
        e.preventDefault();
        alert("No more users to display :/");
    }

    // const mockApi = (obj, time) =>{
    //     return new Promise((resolve, reject)=>{
    //         setTimeout(()=>{
    //             resolve(obj);
    //         },time)
    //     })
    // }

    
  return (
    <div className='user-body'>
        <div className="user-display">
            <div className="header">
                <h4>User List</h4>
            </div>
            <table className="user-list" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr style={{ background: "#f2f2f2" }}>
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>ID</th>
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, ind) => (
                        <tr
                            key={ind}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (!usersInCard.includes(user)) {
                                    setUsersInCard((prevUsers) => [...prevUsers, user]);
                                    index.current = usersInCard.length;
                                    setNextFlag(true);
                                    if (index.current >= 1) setBackFlag(false);
                                } else alert("User already present");
                            }}
                            style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
                        >
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.id}</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {
            usersInCard.length>0 ? (
                <div className='user-card-section'>
                    <div className="card-header">
                        <h4>User Card</h4>
                    </div>
                    <div className="user-card">
                        <h4>ID: {usersInCard[index.current]?.id}</h4>
                        <h4>Name: {usersInCard[index.current]?.name}</h4>
                        <h4>Username: {usersInCard[index.current]?.username}</h4>
                        <h4>Email: {usersInCard[index.current]?.email}</h4>
                    </div>
                    <div className="control-buttons">
                        {!backFlag ? <button onClick={handleGoBack}>Prev</button> : <button style={{backgroundColor:'grey', color:"white"}} onClick={handlEndClick}>Prev</button>}
                        {!nextFlag ? <button onClick={handleGoNext}>Next</button> : <button style={{backgroundColor:'grey', color:"white"}} onClick={handlEndClick}>Next</button>}
                    </div>
                </div>
            ):null
        }
    </div>
  )
}
