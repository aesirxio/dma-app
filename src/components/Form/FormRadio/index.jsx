import React, { Component, lazy } from 'react';
import { Form } from 'react-bootstrap';

const FormRadio = ({ field }) => {
  console.log('[FormRadio] render', field);
  console.log('[FormRadio] Options ', field.option);

  return (
    <div className="mb-3 btn-group justify-content-between w-100">
      {field.option.map((option) => (
        <React.Fragment key={Math.random(40, 200)}>
          <input
            key={`${field.key}_${option.value}`}
            type="radio"
            className="btn-check"
            name={field.key}
            id={`${field.key}_${option.value}`}
            autoComplete="off"
            value={option.value}
            defaultChecked={field.value === option.value}
            onChange={field.changed}
          ></input>

          <label
            className={`btn ${field.classNameInput}`}
            htmlFor={`${field.key}_${option.value}`}
            key={Math.random(40, 200)}
          >
            {option.label}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FormRadio;
