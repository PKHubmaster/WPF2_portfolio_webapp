// 'use client';
// import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { motion } from 'framer-motion';

// const LoginForm = () => {
//   const [isSignup, setIsSignup] = useState(false);

//   const toggleForm = () => {
//     setIsSignup(!isSignup);
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: "url('/sign_in&sign_up_bg.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "relative",
//       }}
//     >
//       {/* Dark overlay for better readability */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
//         }}
//       ></div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className={`row g-0 shadow rounded-4 overflow-hidden position-relative ${isSignup ? 'flex-row-reverse' : ''}`}
//         style={{
//           width: '750px',
//           height: '450px',
//           backdropFilter: "blur(12px)",  // Glassmorphism effect
//           background: "rgba(255, 255, 255, 0.2)", // Semi-transparent
//           border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
//           zIndex: 10, // Ensure it's above overlay
//         }}
//       >
//         {/* Left Form Section */}
//         <div className="col-md-6 p-4 d-flex flex-column justify-content-center text-white">
//           <motion.h2
//             key={isSignup ? 'signup' : 'signin'}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-3"
//           >
//             {isSignup ? 'Sign Up' : 'Sign In'}
//           </motion.h2>

//           <motion.div
//             key={isSignup ? 'signupForm' : 'signinForm'}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {isSignup ? (
//               <form>
//                 <div className="mb-2">
//                   <label className="form-label">Name</label>
//                   <input type="text" className="form-control bg-transparent border-0 text-white" />
//                 </div>
//                 <div className="mb-2">
//                   <label className="form-label">Email</label>
//                   <input type="email" className="form-control bg-transparent border-0 text-white" />
//                 </div>
//                 <div className="mb-2">
//                   <label className="form-label">Password</label>
//                   <input type="password" className="form-control bg-transparent border-0 text-white" />
//                 </div>
//                 <div className="mb-2">
//                   <label className="form-label">Confirm Password</label>
//                   <input type="password" className="form-control bg-transparent border-0 text-white" />
//                 </div>
//                 <div className="text-center">
//                   <button type="button" className="btn btn-primary w-50 mt-2">Sign Up</button>
//                 </div>
//               </form>
//             ) : (
//               <form>
//                 <div className="mb-2">
//                   <label className="form-label">Email Address</label>
//                   <input type="email" className="form-control bg-transparent border-0 text-white" />
//                 </div>
//                 <div className="mb-2">
//                   <label className="form-label">Password</label>
//                   <input type="password" className="form-control bg-transparent border-0 text-white" />
//                 </div>
//                 <div className="text-center">
//                   <button type="button" className="btn btn-primary w-50 mt-2">Sign In</button>
//                 </div>
//               </form>
//             )}
//           </motion.div>

//           {/* Social Media Icons */}
//           <div className="text-center mt-3">
//             <p className="text-muted small">or sign in with:</p>
//             <div className="d-flex justify-content-center gap-2">
//               <img src="/facebook.png" alt="Facebook" width="25" height="25" />
//               <img src="/twitter.png" alt="Twitter" width="25" height="25" />
//               <img src="/linkedin.png" alt="LinkedIn" width="25" height="25" />
//               <img src="/instagram.png" alt="Instagram" width="25" height="25" />
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <motion.div
//           className="col-md-6 text-white text-center d-flex flex-column justify-content-center"
//           initial={{ opacity: 0, x: isSignup ? -50 : 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           style={{
//             background: "rgba(0, 0, 0, 0.3)", // Semi-transparent dark background
//             backdropFilter: "blur(15px)", // More blur for stronger effect
//           }}
//         >
//           <motion.h1
//             key={isSignup ? 'switchTextSignup' : 'switchTextSignin'}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-2"
//           >
//             {isSignup ? 'One of us?' : 'New here?'}
//           </motion.h1>
//           <p className="small">{isSignup ? 'Just sign in' : 'Sign up and discover'}</p>
//           <button className="btn btn-outline-light w-50 mx-auto" onClick={toggleForm}>
//             {isSignup ? 'Sign In' : 'Sign Up'}
//           </button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginForm;


'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Import the useRouter hook
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
<<<<<<< HEAD
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Toggle between Sign In and Sign Up
  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) throw new Error("Signup failed");

      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      alert("User signed up successfully!");
    } catch (err) {
      alert("Signup failed. Try again.");
=======
  const [systemUserName, setSystemUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // Initialize the router

  const handleLogin = async () => {
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemUserName, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store systemUserId in localStorage
        localStorage.setItem('systemUserId', data.systemUserId);

        // Redirect to the home page
        router.push('/home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
>>>>>>> 8198284229e558d0a7e25376d396bc43451da16b
    }
  };

  const handleSignUpRedirect = () => {
    router.push('/signup_page');  // Redirect to the signup page when the link is clicked
  };

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center position-relative bg-dark">
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <div className="row g-0 shadow rounded-4 overflow-hidden position-relative" style={{ width: '400px', height: '450px', zIndex: 10, backgroundColor: 'white' }}>
        <div className="col-md-12 p-4 d-flex flex-column justify-content-center text-dark">
          <h2 className="text-center mb-3">Sign In</h2>

<<<<<<< HEAD
          <motion.div
            key={isSignup ? 'signupForm' : 'signinForm'}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isSignup ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control bg-transparent border-0 text-white" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control bg-transparent border-0 text-white" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control bg-transparent border-0 text-white" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control bg-transparent border-0 text-white" required />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-50 mt-2">Sign Up</button>
                </div>
              </form>
            ) : (
              <form>
                <div className="mb-2">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control bg-transparent border-0 text-white" />
                </div>
                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control bg-transparent border-0 text-white" />
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary w-50 mt-2">Sign In</button>
                </div>
              </form>
            )}
          </motion.div>
=======
          {error && <p className="text-danger text-center">{error}</p>}

          <div className="mb-2">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={systemUserName} onChange={(e) => setSystemUserName(e.target.value)} />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="text-center">
            <button type="button" className="btn btn-primary w-50 mt-2" onClick={handleLogin}>
              Sign In
            </button>
          </div>
<<<<<<< HEAD:src/app/login_page/page.tsx

          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <button onClick={handleSignUpRedirect} className="btn btn-link text-primary p-0 m-0">
              Sign Up
            </button>
          </div>
=======
>>>>>>> 8198284229e558d0a7e25376d396bc43451da16b
>>>>>>> a80bd42a29fd38d77280e0d223049c2db7622e4b:src/app/landing_page/page.tsx
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
