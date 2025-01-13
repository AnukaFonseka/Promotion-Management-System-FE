import React from 'react'
import { Sidebar } from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#F8F9FD",
        overflow: "hidden"
      }}
    >
      <Sidebar />
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: ""
      }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Home