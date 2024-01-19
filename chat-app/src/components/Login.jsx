
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/auth/authApi";

const Login = () => {
 
   const navigate = useNavigate()
  const [login, { isLoading, error }] =
  useLoginMutation();

    const {
        register,
        handleSubmit,
        
        formState: { errors },
      } = useForm()
      const onSubmit = async(data) => {
      
        await login(data);
        window.alert("loggedIn successfully")
        navigate("/chat")
      }
  return (
    <div className=" bg-blue-50 h-screen flex flex-col items-center justify-center px-2 ">

      <div className=" shadow-2xl shadow-slate-400 bg-black text-white lg:w-[50%] w-full p-3 rounded ">
      <h1 className=" text-center font-bold text-2xl ">Login Now</h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-2  " >
      <label >Email</label>
      <input type="text" {...register("email", { required: true })} className=" p-1 rounded text-black " />
      
      {errors.email && <span className=" text-sm font-semibold text-red-500 ">This field is required</span>}
      <label >Password</label>
       <input type="password" {...register("password", { required: true })} className=" p-1 rounded text-black " />
      
      {errors.password && <span className=" text-sm font-semibold text-red-500 ">This field is required</span>}

     <button disabled={isLoading} type="submit" className=" my-3 w-full bg-blue-500 hover:bg-blue-400 duration-150 text-white font-semibold rounded py-2 " >Login</button>

     <p className=" text-right px-2 ">New User ? <Link to="/register"><span className=" text-blue-500 " >Please Register</span> </Link></p>
     {error !== "" && <p>{error} </p>}
    </form>
      </div>
    </div>
  );
}

export default Login;
// <Error message={error} />