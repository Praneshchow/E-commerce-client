import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(false);

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                navigate(from, {replace:true});
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className="hero ">
                <div className="card w-full max-w-sm mt-12">
                    <form onSubmit={handleLogin} className="card-body border-2">
                        <h2 className='text-4xl mb-6'>Login</h2>
                        <div className="form-control">
                            <label className="label">Email</label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered bg-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Password</label>
                            <input type={show ? "text" : "password"} name="password" placeholder="password" className="input input-bordered bg-white" required />
                            <p onClick={() => setShow(!show)}>
                                {
                                    show ? <small>Hide Password</small> : <small>Show Password</small>
                                }
                            </p>
                            <label className="label">
                                <a className="link link-primary">Forget Password?</a>
                            </label>
                        </div>

                        <button className="btn btn-warning">Login</button>

                        <button className="btn">Google Login</button>
                        <p>New to Ema-john? <Link to="/signup" className='link link-primary'>Create an account</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;