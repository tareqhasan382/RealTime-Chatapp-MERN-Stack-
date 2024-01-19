import axios from "axios";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        
        formState: { errors },
      } = useForm()
    
      const onSubmit =async (data) => {
        console.log(data)
        const result = await axios.post("http://localhost:9000/api/v1/signup",data)
        console.log("result:",result)
        if(result?.data?.status === "true"){
          window.alert("User Register Successfully")
          navigate("/login")
        }else{
          window.alert(result.data.message)
        }

      }
  return (
    <div className=" bg-blue-50 h-screen flex flex-col items-center justify-center px-2 ">

      <div className=" shadow-2xl shadow-slate-400 bg-black text-white lg:w-[50%] w-full p-3 rounded ">
      <h1 className=" text-center font-bold text-2xl ">Register Now</h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-2  " >
        <label >Name</label>
      <input type="text" {...register("name",{ required: true })} className=" p-1 rounded text-black "  />
      {errors.name && <span className=" text-sm font-semibold text-red-500 " >This field is required</span>}
      <label >Email</label>
      <input type="text" {...register("email", { required: true })} className=" p-1 rounded text-black " />
      
      {errors.email && <span className=" text-sm font-semibold text-red-500 ">This field is required</span>}
      <label >Password</label>
       <input type="password" {...register("password", { required: true })} className=" p-1 rounded text-black " />
      
      {errors.password && <span className=" text-sm font-semibold text-red-500 ">This field is required</span>}

     <button type="submit" className=" my-3 w-full bg-blue-500 hover:bg-blue-400 duration-150 text-white font-semibold rounded py-2 " >Register</button>

     <p className=" text-right px-2 ">Have an Account ? <Link to="/login"><span className=" text-blue-500 " >Please login</span> </Link></p>
    </form>
      </div>
    </div>
  );
}

export default Register;
