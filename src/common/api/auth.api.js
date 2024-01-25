import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export const signupAPI = (data) => {
    console.log(data);

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                const auth = getAuth();
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        resolve({message : 'Email varification sent.'});
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if(errorCode.localeCompare('auth/email-already-in-use') === 0){
                    reject({message : 'This email already used.'});
                } else if(errorCode.localeCompare("auth/weak-password") === 0){
                    reject({message : 'Password must be 8 character'});
                }
                
            });
    })
}

export const loginAPI = (data) => {
    console.log(data);

    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                resolve({message : 'Login successfully', user: user});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode.localeCompare("auth/user-not-found") === 0){
                    reject({message : 'First signup with this email.'});
                } else if(errorCode.localeCompare("auth/invalid-credential") === 0){
                    reject({message : 'Incorrect email or password'});
                }
            });
    })
}

export const forgetAPI = (data) => {
    console.log(data);

    return new Promise((resolve, reject) => {
        sendPasswordResetEmail(auth, data.email)
            .then(() => {
                console.log('Password reset mail sent.');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
            });

    })
}