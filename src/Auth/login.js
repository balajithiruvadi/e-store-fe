import { useContext, useState } from 'react';
import '../Signup/signup.css';
import { LoggedContext } from "../App";
import { InputLabel } from '@mui/material';
import Input, { inputClasses } from '@mui/base/Input';
import { postData } from '../util/util';

function FailureMsg (props) {
    const { loggedIn, setLoggedIn } = useContext(LoggedContext);
    console.log(props.check);
    if(props.check === 'failed') {
        return <span>Bad Credentials. Do you want to <a href='#' onClick={() => setLoggedIn('signup')}>signup</a> instead? </span>
    } else if(props.check === 'error') {
        return <span>Unknown error occurred. Please try again after sometime.</span>
    } else {
        return;
    }
}

function Logincomponent() {
    const [loginMsg, setLoginMsg] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [btnClick, setBtnClick] = useState(false);
    const [loginFailureFlag, setLoginFailureFlag] = useState(false);
    const { loggedIn, setLoggedIn } = useContext(LoggedContext);
    const [loginRes, setLoginRes] = useState('');
    async function save() {
        setBtnClick(true);
        if (!name || !password) return;
        const url = 'http://localhost:8000/user/login'
        const accessToken = '';
        const data = {
            name,
            password
        };
        const res = await postData(url, accessToken, data);
        if (res.status === 200 || res.status === 201) {
            setLoginRes('success');
            setLoginFailureFlag(false)
            setLoggedIn('success');
        } else {
            console.log(res.response);
            if(res.response.status == 403) {
                setLoginMsg('Bad Credentials. Do you want to signup instead?');
                setLoginRes('failed');
                setLoginFailureFlag(true);
                setLoggedIn('login');
            } else {
                setLoginMsg('Unknown error occurred. Please try again after sometime.');
                setLoginRes('error');
                setLoginFailureFlag(true);
                setLoggedIn('login');
            }
        }
    };
    return (
        <div>
            <div className='jumbotron'>
                <h1>Login</h1>
            </div>
            <form>
                <div className='signupDiv container form-group signupForm'>

                    <div className='row'>
                        <InputLabel htmlFor="name" className="col-md-6" sx={{ left: 'auto' }} required>Name</InputLabel>
                        <div className='col-md-6'>
                            <Input id="name" className={btnClick === true && !name ? "error" : undefined} aria-describedby="Enter your name" required value={name} onChange={event => setName(event.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <InputLabel className="col-md-6" htmlFor="password" required>Password</InputLabel>
                        <div className='col-md-6'>
                            <Input id="password" className={btnClick === true && !password ? "error" : undefined} aria-describedby="Enter your password" type='password' value={password} onChange={event => setPassword(event.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-9">&nbsp;</div>
                        <div className="col-md-3">
                            <button type="button" className="btn btn-primary" onClick={save}>Submit</button>
                        </div>
                    </div>
                    <div className={loginFailureFlag?'row':'row invisible'}>
                        <div className="col-md-12 alert alert-danger" role="alert">
                            <FailureMsg check={loginRes} />
                        </div>
                    </div>


                </div>
            </form>
        </div>
    )
};

export default Logincomponent;