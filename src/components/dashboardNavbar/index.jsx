import { Link } from 'react-router-dom'

export const DashboardNavbar = () => {

    return <>
        <div className="bg-base-100 sticky top-0 z-50">
            <div className=" bg-gray-200">
                <div className='navbar  px-10'>
                    {/* responsive navbar start */}
                    <div className="navbar-start ">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to="/dashboard" className='font-content font-semibold'>Dashboard</Link></li>
                                <li><Link to="/dashboard/cart" className='font-content font-semibold'>My Cart </Link></li>
                                <li><Link to="/dashboard/wishlist" className='font-content font-semibold'>My Wishlist </Link></li>
                                <li><Link to="/dashboard/order" className='font-content font-semibold'>My Order </Link></li>
                                <li><Link to="/dashboard/order" className='font-content font-semibold'>Change Password </Link></li>
                                <li><Link to="/dashboard/order" className='font-content font-semibold'>Logout </Link></li>
                            </ul>
                        </div>
                        <Link className="" to="/">
                            <img height={32} width={48} className="d-block border border-green-100 rounded-full " src="data:image/png;base64,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" alt="" />
                        </Link>
                    </div>
                    {/* responsive navbar end */}

                    <div className="navbar-end mt-1">
                        <div className="flex items-center gap-4">

                         
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="">
                                    <div className="w-10 rounded-full">
                                        <span class="material-symbols-outlined">
                                            account_circle
                                        </span>

                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to="/dashboard" className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><Link to="/dashboard">Settings</Link></li>
                                    <li><Link to="/dashboard">Logout</Link></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
}