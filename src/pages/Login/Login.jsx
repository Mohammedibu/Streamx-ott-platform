import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logoX.png';
import { login, signup } from '../../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { useTranslation } from 'react-i18next';


const Login = () => {
  const { t } = useTranslation();
  const [signState, setSignState] = useState(t('auth.signIn'));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if email was passed from landing page
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      if (location.state.mode === 'signin') {
        setSignState(t('auth.signIn'));
      } else {
        setSignState(t('auth.signUp'));
      }
    }
  }, [location, t]);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      if (signState === t('auth.signIn')) {
        await login(email, password);
        navigate('/home');
      } else {
        await signup(name, email, password);
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? 
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :

    <div className='login'>
      <div className="login-header">
        <img src={logo} className="login-logo" alt="" />
        
      </div>
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === t('auth.signUp') ? 
            <input 
              value={name} 
              onChange={(e) => {setName(e.target.value)}} 
              type="text" 
              placeholder={t('auth.name')} 
            /> : 
            <></>
          }
    
          <input 
            value={email} 
            onChange={(e) => {setEmail(e.target.value)}} 
            type="email" 
            placeholder={t('auth.email')} 
          />
          <input 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}} 
            type="password" 
            placeholder={t('auth.password')} 
          />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">{t('auth.rememberMe')}</label>
            </div>
            <p>{t('auth.needHelp')}</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === t('auth.signIn') ?  
            <p>{t('auth.newToStreamX')} <span onClick={() => {setSignState(t('auth.signUp'))}}>{t('auth.signUpNow')}</span></p> : 
            <p>{t('auth.alreadyHaveAccount')} <span onClick={() => {setSignState(t('auth.signIn'))}}>{t('auth.signInNow')}</span></p>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;