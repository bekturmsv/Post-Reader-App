import React, { useContext } from 'react';
import { AuthContext } from '../../../Context';
import MyButton from '../../UI/button/MyButton';
import MyInput from '../../UI/input/MyInput';

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login  = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth','true')
    }

    return (
        <div>
            <h1>Страница авторизации</h1>
            <form action="" onSubmit={login}>
                <MyInput type="text" placeholder='Введите логин'/>
                <MyInput type="password" placeholder='Введите пароль'/>
                <MyButton>Login </MyButton>
            </form>
        </div>
    );
};

export default Login;