import './SignUp'

const SignUp = () => {
    return (
        <div>
            <div className="hero ">
                <div className="card w-full max-w-sm mt-12">
                    <form className="card-body border-2">
                        <h2 className='text-4xl'>Sign Up</h2>
                        <div className="form-control">
                            <label className="label">Email</label>
                            <input type="email" placeholder="email" className="input input-bordered bg-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Password</label>
                            <input type="password" placeholder="password" className="input input-bordered bg-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label">Confirm Password</label>
                            <input type="password" placeholder="password" className="input input-bordered bg-white" required />
                            <label className="label">
                                <a className="link link-primary">Forget Password?</a>
                            </label>
                        </div>
                        <button className="btn btn-warning">Login</button>

                        <button className="btn">Google Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;