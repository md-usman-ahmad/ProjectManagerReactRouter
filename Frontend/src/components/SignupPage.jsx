import { Link, useNavigate } from "react-router";
import { useRef, useState } from "react";
import axios from "axios";

export function SignupPage(){
    const navigate = useNavigate();
    const [Gender , setGender] = useState();
    const firstNameRef = useRef();
    const ageRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const addingUserIntoDB = ()=>{
        let firstName = firstNameRef.current.value;
        let age = ageRef.current.value;
        let gender = Gender;
        let username = usernameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        console.log(firstName , age , gender , username , email , password);

        axios({
            method : "POST",
            url : "http://localhost:4500/signup",
            data : {
                firstName,age,gender,username,email,password
            }
        })
        .then((response)=>{
            console.log("signup response = ",response);
            alert(response.data);
            navigate("/login");
        })
        .catch((error)=>{
            console.log("signup error = ",error);
            alert(error.response.data);
        })
    }

    return (
        <>
        <div className="flex justify-center mt-11">
            <div className="w-full max-w-4xl bg-white p-8 border-l-4 border-l-green-500 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-4xl font-light text-gray-800">Sign up</h2>
                    <p className="text-gray-500 mt-1">Create your account</p>
                </div>
                
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="firstName6" className="block text-sm text-gray-600 mb-1">First Name</label>
                                <input ref={firstNameRef} type="text" name="firstName" id="firstName6" placeholder="First Name" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                            <div>
                                <label htmlFor="age6" className="block text-sm text-gray-600 mb-1">Age</label>
                                <input ref={ageRef}  type="text" id="age6" placeholder="Enter Age(number above 0)" name="Age" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-3">Gender</label>
                                <div className="flex space-x-6">
                                    <label className="flex items-center cursor-pointer">
                                        <input onChange={(event)=>{setGender(event.target.value)}}  type="radio" name="gender" value="Male" className="mr-2 text-green-500"/>
                                        <span className="text-gray-700">Male</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input onChange={(event)=>{setGender(event.target.value)}}  type="radio" name="gender" value="Female" className="mr-2 text-green-500"/>
                                        <span className="text-gray-700">Female</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Username</label>
                                <input ref={usernameRef}  type="text" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Email</label>
                                <input ref={emailRef} type="email" placeholder="xyz@gmail.com" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Password</label>
                                <input ref={passwordRef}  type="text" placeholder="Enter Your Password" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button onClick={()=>{addingUserIntoDB()}}
                         type="submit"
                        className="w-1/3 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-none transition-colors uppercase tracking-wide">Submit</button>
                    </div>
                    <div className="text-center mt-4">
                        <div className="success-message text-green-600 "></div>
                        <div className="error-message text-red-600 hidden"></div>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Already have an account? 
                            <Link to="/login"  className="text-blue-700 hover:text-blue-700 underline">Login</Link>
                        </p>
                        <Link to="/" className="text-blue-600 underline cursor-pointer me-3 ">Homepage</Link>
                        <Link to="/herosection" className="text-blue-600 underline cursor-pointer ">Herosection</Link>
                    </div>
            </div>
        </div>
        </>
    )
}