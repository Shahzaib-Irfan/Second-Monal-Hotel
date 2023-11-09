import React, { useEffect } from 'react';
import axios from 'axios';

function Homescreen() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get("/api/rooms/getAllrooms")).data; 
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []); 
    axios.defaults.baseURL = "http://localhost:5000";
    return (
        <div>Homescreen</div>
    );
}

export default Homescreen;
