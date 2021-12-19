import React from 'react'
import Content from './Content'
import Sidebar from './Sidebar'
import './styles.css'


const SidebarLayout = ({ children }) => {

  return (
    <div class="container">
      <div class="sidebar">
        <Sidebar />
      </div>
      <div class="content">
        <Content children={children} />
      </div>
    </div>
  )

}


export default SidebarLayout