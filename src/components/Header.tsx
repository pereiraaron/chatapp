import React from "react";

const Header: React.FC = () => {
  return (
    <div className="chat-title">
      <h1>Fabio Ottaviani</h1>
      <h2>Supah</h2>
      <figure className="avatar">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
      </figure>
    </div>
  );
};

export default Header;
