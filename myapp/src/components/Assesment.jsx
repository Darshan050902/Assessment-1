import React, { useEffect, useRef, useState } from 'react'
const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const Assesment = () => {
    const [users, setUsers] = useState([]);
    const [usersInCard, setUsersInCard] = useState([]);
    let index = useRef(-1)
    const [backFlag, setBackFlag] = useState(true);
    const [nextFlag, setNextFlag] = useState(true);
    const [searchedUser, setSearchedUser] = useState([]);
    

    useEffect(()=>{
        try {
            fetch(BASE_URL).then((res)=>res.json().then((res)=>{
                setUsers(res)
                setSearchedUser(res);
            }))
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

    const searchUser = (val) =>{
        console.log("search")
        if(val.length===0){
            setSearchedUser(users);
        }
        setSearchedUser(()=>{
            const updatedUser = users.filter((user)=>{
                const userName = user.name.toLowerCase();
                const userEmail = user.email.toLowerCase();
                return userName.includes(val) || userEmail.includes(val);
            })
            return updatedUser
        })
    }
    
    const myDebounce = (func) =>{
        let timer;
        return function(...args)
        {
            if(timer)clearTimeout(timer);
            const context = this;
            timer = setTimeout(()=>{
                timer=null;
                func.apply(context, args);
            },3000)
        }
    }

    const debouncedSearchUser = myDebounce(searchUser);

    
  return (
    <>
    <div className="search-user">
        <div className="search-bar">
            <input type="text" placeholder='search user' onChange={(e)=>debouncedSearchUser(e.target.value)} />
        </div>
    </div>
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
                        <th style={{ padding: "8px", border: "1px solid #ddd" }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {searchedUser?.map((user, ind) => (
                        <tr
                            key={ind}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!usersInCard.includes(user)) {
                                    const updatedUsersInCard = usersInCard.slice(0, index.current + 1);
                                    setUsersInCard((prevUsers) => [...updatedUsersInCard, user]);
                                    index.current = updatedUsersInCard.length;
                                    setNextFlag(true);
                                    if (index.current >= 1) setBackFlag(false);
                                } else alert("User already present");
                            }}
                            style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
                        >
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.id}</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.name}</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {
            usersInCard.length>0 ? (
                <>
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
                        {
                usersInCard.length>0?(
                    <div className="user-card-pagination">
                        <div className="horizontal-bar">
                            {
                                usersInCard.map((user, ind)=>{
                                    if(ind === index.current){
                                        return <div key={ind} style={{backgroundColor:"black", color:"white"}} className="page">
                                            {user.id}
                                        </div>
                                    }
                                    return <div key={ind} className="page">
                                        {user.id}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                ):null
            }
                    </div>
                </>
            ):null
        }
    </div>
    </>
  )
}
