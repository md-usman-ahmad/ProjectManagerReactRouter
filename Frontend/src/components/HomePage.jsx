import { useEffect } from "react"
import { Outlet , Link , useNavigate } from "react-router"

export function HomePage(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    console.log("homepage token = ",token);
    useEffect(()=>{
        if(token){
            navigate("/dashboard");
        }
    },[])
        

    const logout = ()=>{
        localStorage.removeItem("token");
        alert("Logout Successfull");
        navigate("/herosection");
    }

    return (
        <>
        {token  ? (
            <>
                <div className="header-demo">
                <header className="bg-black  shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-white">📒 TaskManager</h1>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <button onClick={()=>{logout()}} type="button" className="text-white hover:text-red-600 font-medium">Logout</button>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
            </>
        ) : (
        <>
            <div className="header-demo">
                <header className="bg-black  shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-white">📒  ProjectManager</h1>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <Link   className="text-white hover:text-blue-600 font-medium">Home</Link>
                                <Link to="/signup"  className="text-white hover:text-green-600 font-medium">Signup</Link>
                                <Link to="/login"   className="text-white hover:text-blue-600 font-medium">Login</Link>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>   
        </>
        )}  

            <Outlet></Outlet>
        </>
    )
}