import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';




const Navbar = () => {

  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
        // Assuming you have a logout API endpoint on your server
        const response = await axios.post('http://localhost:3001/logout');
        console.log(response.data);
        setIsLoggedIn(false);
    } catch (error) {
        console.error(error);
    }
};
  
  return (
    <div className=''>
  
      {/* <ChangeMode/> */}
        <nav className="bg-gray-800">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* <!-- Mobile menu button--> */}
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
        </div>
        <div className="hidden md:ml-6 sm:block">
          <div className="flex space-x-6">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link to={"/"} 
                    className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium
                     bg-white mt-3 px-4 py-2 rounded-lg tracking-wide text-black" aria-current="page">
                Home
            </Link>
            <Link to={"/image-2-text"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Image2Text & Image2Audio</Link>
            <Link to={"/video"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Image2Video</Link>
            <Link to={"/image-2-pdf"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Image2Pdf</Link>
            <Link to={"/changemode"} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">ChangeMode</Link>
          
            <div>
            {isLoggedIn ? (
                <div>
                    <p>Welcome, {username}!</p>
                    <button className="animate-bounce focus:animate-none hover:animate-none 
            inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide 
             text-white" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    {/* <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label> */}
                  <button><Link to={"/login"} >Login</Link></button>  
                </div>
            )}
        </div>

            {/* <Link to={"/login"}     className="animate-bounce focus:animate-none hover:animate-none 
            inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide 
             text-white" >Login</Link> */}
            {/* <Link to={"/signup"} 
            className="animate-bounce focus:animate-none hover:animate-none 
            inline-flex text-md font-medium bg-indigo-700 mt-3 px-4 py-2 rounded-lg tracking-wide 
            text-white">  Signup</Link> */}
        
            {/* <ChangeMode/> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
       

        {/* <!-- Profile dropdown --> */}
        <div className="relative ml-3">
          <div>
            <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/> */}
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>

  {/* <!-- Mobile menu, show/hide based on menu state. --> */}
  <div className="md:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
      {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
      <Link to={"/"}  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</Link>
      <Link to={"/image-2-text"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Image2Text & Image2Audio</Link>
      <Link to={"/video"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Image2Video</Link>
      <Link to={"/image-2-pdf"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Image2Pdf</Link>
      <Link to={"/login"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Login</Link>
      <Link to={"/signup"} className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">SignUp</Link>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar