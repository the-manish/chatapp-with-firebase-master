import { React, useState } from 'react';
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = useState(false);
    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            // Create user with email and password
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Upload profile picture to storage
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Track upload progress or handle state changes here
            uploadTask.on( 

                (error) => {
                    setErr(true);
                },
                 () => {
                    // Get download URL of uploaded profile picture
                     getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{ 

                    // Update user profile with display name and profile picture URL
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    });

                    // Save user data to Firestore
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });
                });
                    // Redirect user to home page after successful registration
                    navigateTo('/');
                }
            );
        } catch (err) {
            setErr(true);
            console.log(err);
        }
    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>ChatterBox</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Display Name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input style={{ display: "none" }} type="file" id='file' />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add Profile Picture</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span className='err'>Something went wrong!</span>}
                </form>
                <p>Already have an account?<Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
