import React, { useState, useContext } from 'react'
import { urlApi } from '../links/movieFilter'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage2, setErrMessage2] = useState('');
    const [errMessage3, setErrMessage3] = useState('');

    const navigate = useNavigate();

    const emailInput = ({ target }) => {
        setEmail(target.value);
    };

    const passwordInput = ({ target }) => {
        setPassword(target.value);
    };

    const LoginFunction = async() => {
        setErrMessage2('');
        setErrMessage3('');
        const data = { email, password };
        const tryLogin = await axios.post(`${urlApi}/users/login`, data);
        if (tryLogin.errMessage2) {
            setErrMessage2(tryLogin.data.errMessage2);
        }
        if (tryLogin.errMessage3) {
            setErrMessage3(tryLogin.data.errMessage3);
        }
        if (tryLogin.token) {
            localStorage.setItem('token', tryLogin.data.token);
            localStorage.setItem('username', tryLogin.data.username);
            localStorage.setItem('id', tryLogin.data.id);
            navigate('/');
        }
        console.log(tryLogin);
    }

  return (
    <div className='w-[1100px] h-[700px] mt-8 bg-yellow-400 flex items-center justify-between border-2 border-neutral-300 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
        <div className='w-[40%] h-full bg-black'></div>
        <div className='w-[60%] h-full bg-white flex flex-col'>
            <div className='w-full h-[15%] bg-yellow-400 border-b-4 border-neutral-800 flex justify-center items-center'>
				<h1 className='text-5xl font-bold'>Log in</h1>
			</div>
            <div className='w-full h-[85%] mt-[70px] bg-white flex flex-col items-center'>
                <form>
                    <div className='flex flex-col'>
                    <label className='text-xl' htmlFor='email' >Email:</label>
                        <input onChange={emailInput} name='email' type="text" placeholder='Your Email here...'/>
                        {errMessage2 !== '' && (
                            <h1>{errMessage2}</h1>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-xl' htmlFor='password'>Password:</label>
                            <input onChange={passwordInput} name='password' type="password" placeholder='Your Password here...' />
                            {errMessage3 !== '' && (
                            <h1>{errMessage3}</h1>
                        )}
                    </div>
                </form>
                 <button onClick={LoginFunction} type='buttom'>Log In</button>
            </div>
        </div>
        
    </div>
  )
}
