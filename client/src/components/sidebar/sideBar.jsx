import {} from 'react'
import SearchInput from './searchInput'
import Conversations from './conversations'
import LogoutButton from './logout'

 const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-3 flex flex-col'>
        <SearchInput/>
        <div className="divider px-3"></div>
        <Conversations/>
        <LogoutButton/>
        
    </div>
  )
}
export default Sidebar
