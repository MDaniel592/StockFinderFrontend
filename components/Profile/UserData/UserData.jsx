import React from "react";

export default function UserDataProfile({ userData }) {
  if (!userData) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <React.Fragment>
      <div className="my-2 mx-2">
        <div className="grid">
          <span className="text-center text-xl font-semibold underline text-neutral-300">Usuario</span>
          <span className="text-center text-xs font-semibold">{userData.email}</span>
          <span className="text-center text-xs font-semibold">Telegram: {userData.telegram}</span>
          <span className="text-center text-xs font-semibold">Privilegio: {userData.role}</span>
        </div>
      </div>
    </React.Fragment>
  );
}
