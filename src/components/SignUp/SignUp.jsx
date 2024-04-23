import { Link } from 'react-router-dom';
import './SignUp'
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {
    const [error, setError] = useState([]);
    const {createUser} = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault(); 

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);
        
        setError('');
        
        if (password !== confirm){
            setError("Your password didn't match.");
            return;
        }
        else if (password.length < 6){
            setError("Password must be 6 characters or longer.");
            return;
        }

        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error);
            setError(error.message);
        })


    }
    return (
        <div>
            <div className="hero ">
                <div className="card w-full max-w-sm mt-12">
                    <form onSubmit={handleSignUp} className="card-body border-2">
                        <h2 className='text-4xl mb-6'>Sign Up</h2>
                        <div className="form-control">
                            <label className="label">Email</label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered bg-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Password</label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered bg-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Confirm Password</label>
                            <input type="password" name="confirm" placeholder="password" className="input input-bordered bg-white" required />
                            <label className="label">
                                <a className="link link-primary">Forget Password?</a>
                            </label>
                        </div>
                        <button type='submit' className="btn btn-warning">Sign Up</button>
                        <p>Already have an account? <Link to="/login" className='link link-primary'>Login</Link></p>
                        <p className='text-red-500'>{error}</p>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default SignUp;