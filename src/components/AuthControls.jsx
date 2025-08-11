import React from 'react';

const AuthControls = ({ user, onSignIn, onSignOut }) => {
  return (
    <div className="absolute top-0 right-0">
      {user ? (
        <div className="flex items-center gap-3">
          {user.photoURL && <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border-2 border-cyan-400"/>}
          <button onClick={onSignOut} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Sign Out</button>
        </div>
      ) : (
        <button onClick={onSignIn} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Sign In with Google</button>
      )}
    </div>
  );
};

export default AuthControls;
