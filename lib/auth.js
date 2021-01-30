import React, { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from './db';
import firebase from './firebase';
import cookie from 'js-cookie';
import Router from 'next/router';
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUserData(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('feedback_koa_auth', true, {
        expires: 1
      });

      return user;
    } else {
      setUser(false);
      cookie.remove('feedback_koa_auth');
      return false;
    }
  }


  const signinWithGithub = () => {
    Router.push('/sites');
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        return handleUser(response.user)
      });
  };

  const signinWithGoogle = () => {
    Router.push('/sites');
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        return handleUser(response.user)
      });
  };

  const signout = () => {
    Router.push('/');
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser());
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      handleUser(user)
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
}


async function formatUserData(user) {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  }
}