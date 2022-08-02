import React, { useState, useContext, useEffect } from 'react'
import { urlApi } from '../links/movieFilter'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import myContext from '../context/MyContext';
import { randomImage } from '../assets/imagesArray';


export default function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('123456');
    const [errMessage2, setErrMessage2] = useState('');
    const [errMessage3, setErrMessage3] = useState('');
    const { setUsername } = useContext(myContext);
    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate();

    const emailInput = ({ target }) => {
        setEmail(target.value);
    };

    const passwordInput = ({ target }) => {
        setPassword(target.value);
    };

    useEffect(() => {
        setImageUrl(randomImage());
    },[]);

    const LoginFunction = async() => {
        setErrMessage2('');
        setErrMessage3('');
        const data = { email, password };
        const tryLogin = await axios.post(`${urlApi}/users/login`, data);
        if (tryLogin.data.errMessage2) {
            setErrMessage2(tryLogin.data.errMessage2);
        }
        if (tryLogin.data.errMessage3) {
            setErrMessage3(tryLogin.data.errMessage3);
        }
        if (tryLogin.data.token) {
            localStorage.setItem('token', tryLogin.data.token);
            localStorage.setItem('username', tryLogin.data.username);
            localStorage.setItem('id', tryLogin.data.id);
            setUsername(tryLogin.data.username);
            navigate('/');
        }
    }

  return (
    <div className=' z-10 w-[1100px] h-[700px] mt-8 bg-black flex items-center justify-between border-1 border-neutral-700 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
        <div className='w-[40%] relative h-full '>
            <div className=' w-full h-full bg-sky-800 opacity-60 absolute'></div>
            <div className=' w-full h-[60%] bg-gradient-to-b  bottom-0 from-transparent to-black absolute'></div>
            <img className=' object-cover h-full' src={imageUrl} alt="/" />
        </div>
        <div className='w-[60%] h-full bg-white flex flex-col items-center'>
            <div className='w-full h-[15%] bg-sky-600 border-b-4 border-neutral-800 flex justify-center items-center'>
				<h1 className='text-5xl font-bold text-white'>Log In</h1>
			</div>
            <div className='w-[85%] h-full  flex flex-col items-center justify-center mb-[150px]'>
                <form className='flex flex-col w-full h-auto'>
                    <div className='flex flex-col'>
                    <label className='text-2xl' htmlFor='email' >Email:</label>
                        <input 
                        className='mb-5 border-2 rounded-md text-2xl'
                        onChange={emailInput} 
                        name='email' 
                        type="text" 
                        placeholder='Your Email here...' 
                        autoComplete='off'
                        />

                        {errMessage2 !== '' && (
                            <h1 className='text-red-600 -mt-4 text-lg'>{errMessage2}</h1>
                        )}
                    </div>
                    <div className='flex flex-col mt-7'>
                        <label className='text-2xl' htmlFor='password'>Password:</label>
                            <input 
                            className='mb-5 border-2 rounded-md text-2xl' 
                            onChange={passwordInput} 
                            name='password' type="password" 
                            placeholder='Your Password here...' 
                            autoComplete='off' 
                            />

                            {errMessage3 !== '' && (
                            <h1 className='text-red-600 -mt-4 text-lg'>{errMessage3}</h1>
                        )}
                    </div>
                </form>
                 <button className='w-[80%] bg-sky-700 rounded-md p-3 mt-10 text-white font-bold text-xl border-2 border-sky-700  hover:bg-white  hover:text-sky-700   shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]' 
                 onClick={LoginFunction} 
                 type='buttom'
                 >
                    LOG IN
                </button>
                <div className='flex mt-10'>
                    <h1>Don't have an Account?</h1>
                    <Link to='/register'>
                        <h1 className='text-blue-700 ml-1'>Click here to create one!</h1>
                    </Link>
                </div>
            </div>
        </div>
        
    </div>
  )
}
