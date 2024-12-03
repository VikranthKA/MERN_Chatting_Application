import {} from 'react'
import Sidebar from '../sidebar/sideBar'
import MessageContainer from '../message/MessageContainer'

const HomeComponent = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomeComponent
