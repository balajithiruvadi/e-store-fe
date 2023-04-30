import * as React from 'react';
import { useState, useContext } from 'react';
import { InputLabel } from '@mui/material';
import Input from '@mui/base/Input';
import { postData } from '../util/util';
import './signup.css'
import { LoggedContext } from "../App";

function FailureMsg (props) {
    const { loggedIn, setLoggedIn } = useContext(LoggedContext);
    if(props.check === 'yes') {
        return <span>User already exists. Please <a href='#' onClick={() => setLoggedIn('login')}>login</a></span>
    } else if(props.check === 'error') {
        return <span>Unknown error occurred. Please try again after sometime.</span>
    } else {
        return;
    }
}

function Signup() {
    
    const { loggedIn, setLoggedIn } = useContext(LoggedContext);
    const [name, setName] = useState('')
    const [dob, setDOB] = useState('');
    const [password, setPassword] = useState('');
    const [btnClick, setBtnClick] = useState(false);
    const [signupFailureFlag, setsignupFailureFlag] = useState(false);
    const [userExists, setUserExists] = useState('');
    async function save() {
        setBtnClick(true);
        if (!name || !dob || !password) return;
        alert('next');
        const url = 'http://localhost:8000/user'
        const accessToken = '';
        const data = {
            name,
            dob,
            password
        };
        const res = await postData(url, accessToken, data);
        if (res.status === 200 || res.status === 201) {
            alert('success');
            setsignupFailureFlag(false)
            setLoggedIn('login');
            setUserExists('no');

        } else {
            console.log(res.response);
            if(res.response.status == 400) {
                setUserExists('yes');
                setsignupFailureFlag(true)
                setLoggedIn('signup');
            } else {
                setsignupFailureFlag(true);
                setLoggedIn('signup');
                setUserExists('error');
            }
        }
    }   
    
    return (
        <div>
            <div className='jumbotron'>
                <h1>Sign up</h1>
            </div>
            <form>
                <div className='signupDiv container form-group signupForm'>

                    <div className='row'>
                        <InputLabel htmlFor="name" className="col-md-6" sx={{ left: 'auto' }} required >Name</InputLabel>
                        <div className='col-md-6'>
                            <Input id="name" className={btnClick === true && !name ? "error" : undefined} aria-describedby="Enter your name" required value={name} onChange={event => setName(event.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <InputLabel htmlFor="dob" className="col-md-6" required>Date of Birth</InputLabel>
                        <div className='col-md-6'>
                            <Input id="dob" className={btnClick === true && !dob ? "dateControl error" : "dateControl"} aria-describedby="Enter your date of birth" type='date' value={dob} onChange={event => setDOB(event.target.value)} />
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
                    <div className={signupFailureFlag?'row':'row invisible'}>
                        <div className="col-md-12 alert alert-danger" role="alert">
                            <FailureMsg check={userExists} />
                        </div>
                    </div>


                </div>
            </form>
        </div>

    );
};

export default Signup;