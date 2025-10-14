import { useEffect } from "react"
import { Outlet , Link , useNavigate } from "react-router"

export function HomePage(){
    return (
        <>
            <div className="header-demo">
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-gray-900">📒  ProjectManager</h1>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <Link   className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                                <Link to="/signup"  className="text-gray-700 hover:text-blue-600 font-medium">Signup</Link>
                                <Link to="/login"   className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>

            <Outlet></Outlet>
        </>
    )
}