import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import AppNavbar from '../components/Navbar'
import ProfileBooking from '../components/ProfileBooking'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'



const { TabPane } = Tabs

const ProfilePage = () => {
    const user = JSON.parse(Cookies.get("currentUserForHotelApp"))
    const navigate = useNavigate()
    useEffect(() =>{
        if(!user){
            navigate('/loginScreen')
        }
    },[])
    return (
        <>
            <AppNavbar />
            <div className='tabs-profile'>
                <Tabs defaultActiveKey='1'>
                    <TabPane tab='Profile' key={1}>
                        <h1>My Profile</h1>
                        <br/>
                        <h1> Name : {user.name}</h1>
                    </TabPane>
                    <TabPane tab='All Bookings' key={2}>
                       <ProfileBooking user={user}/>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default ProfilePage