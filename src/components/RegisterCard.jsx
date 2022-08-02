import React, { useState } from 'react'
import { randomImage } from '../assets/imagesArray'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { urlApi } from '../links/movieFilter';

export default function RegisterCard() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [render, setRender] = useState(false);
    const [errMessage1, setErrMessage1] = useState('');
    const [errMessage2, setErrMessage2] = useState('');
    const [errMessage3, setErrMessage3] = useState('');

    const emailInput = ({ target }) => {
        setEmail(target.value);
    };

    const usernameInput = ({ target }) => {
        setUsername(target.value);
    };

    const passwordInput = ({ target }) => {
        setPassword(target.value);
    };


    const registerFunction = async() => {
        setErrMessage1('');
        setErrMessage2('');
        setErrMessage3('');
        const data = { username, password, email };
        const tryRegister = await axios.post(`${urlApi}/users/create`, data);
        if (tryRegister.data.errMessage2) {
            return setErrMessage2(tryRegister.data.errMessage2);
        }
        if (tryRegister.data.errMessage1) {
            return setErrMessage1(tryRegister.data.errMessage1);
        }
        if (tryRegister.data.errMessage3) {
            return setErrMessage3(tryRegister.data.errMessage3);
        }
        return setRender(true);
    }


  return (
    <div className=' z-10 w-[1100px] h-[700px] mt-8 bg-black flex items-center justify-between border-1 border-neutral-700 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
        <div className='w-[40%] relative h-full '>
            <div className=' w-full h-full bg-sky-800 opacity-60 absolute'></div>
            <div className=' w-full h-[60%] bg-gradient-to-b  bottom-0 from-transparent to-black absolute'></div>
            <img className=' object-cover h-full' src={randomImage()} alt="/" />
        </div>
        <div className='w-[60%] h-full bg-white flex flex-col items-center'>
            <div className='w-full h-[12%] bg-sky-600 border-b-4 border-neutral-800 flex justify-center items-center'>
                    <h1 className='text-5xl font-bold text-white'>Sign Up</h1>
            </div>
            <div className='w-[85%] h-full  flex flex-col items-center justify-center'>
                <form className='flex flex-col w-full h-auto'>
                <div className='flex flex-col'>
                    <label className='text-xl flex' htmlFor='email' >Email<h1 className='text-black opacity-50'>(must be a valid email):</h1></label>
                        <input 
                        className='mb-5 border-2 rounded-md text-2xl'
                        onChange={emailInput} 
                        id='email' 
                        type="text" 
                        placeholder='Ex. email@email.com' 
                        autoComplete='off'
                        />

                        {errMessage2 !== '' && (
                            <h1 className='text-red-600 -mt-4 text-lg'>{errMessage2}</h1>
                        )}
                    </div>
                    <div className='flex flex-col mt-7'>
                        <label className='text-xl flex' htmlFor='username'>Username<h1 className='text-black opacity-50'>(minimum of 4 characters):</h1></label>
                            <input 
                            className='mb-5 border-2 rounded-md text-2xl' 
                            onChange={usernameInput} 
                            id='username' type="text" 
                            placeholder='Ex. MyUsername123' 
                            autoComplete='off' 
                            />

                            {errMessage1 !== '' && (
                            <h1 className='text-red-600 -mt-4 text-lg'>{errMessage1}</h1>
                        )}
                    </div>
                    <div className='flex flex-col mt-7'>
                        <label className='text-xl flex' htmlFor='password'>Password<h1 className='text-black opacity-50'>(minimum of 7 characters):</h1></label>
                            <input 
                            className='mb-5 border-2 rounded-md text-2xl' 
                            onChange={passwordInput} 
                            id='password' type="password" 
                            placeholder='Ex. MyPassword123' 
                            autoComplete='off'
                            />

                            {errMessage3 !== '' && (
                            <h1 className='text-red-600 -mt-4 text-lg'>{errMessage3}</h1>
                        )}
                    </div>
                </form>
                {render && (
                    <div className='mt-5'>
                        <h1 className='text-xl text-blue-500 font-bold'>Account created!</h1>
                    </div>
                )}
                <button className='w-[80%] bg-sky-700 rounded-md p-3 mt-10 text-white font-bold text-xl border-2 border-sky-700 hover:bg-white hover:text-sky-700 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]' 
                 onClick={registerFunction} 
                 type='buttom'
                 >
                    REGISTER NOW
                </button>
                <div className='flex mt-10'>
                    <h1>Already have an Account?</h1>
                    <Link to='/login'>
                        <h1 className='text-blue-700 ml-1'>Click here to log in!</h1>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
