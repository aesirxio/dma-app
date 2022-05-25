import React, { Component } from 'react';

const ButtonConnect = ({ onClick, isConnected, disabled = false }) => {
  console.log('ButtonConnect', isConnected, onClick);

  return disabled ? (
    <div>Coming soon!</div>
  ) : (
    <>
      {isConnected === -1 ? (
        <div className="btn_loading">
          <div
            className="spinner-border"
            style={{ width: '1.7rem', height: '1.7rem' }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <button
          className={`position-relative cursor-pointer btn ${
            isConnected ? 'btn-danger' : 'btn-success'
          }`}
          onClick={onClick}
        >
          <span className="ms-2 text-white">{isConnected ? 'Disconnect' : 'Connect'}</span>{' '}
        </button>
      )}
    </>
  );
};

export default ButtonConnect;
