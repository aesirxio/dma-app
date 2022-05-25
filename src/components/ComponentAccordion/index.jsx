import React, { Component } from 'react';
import './index.scss';
import { Collapse } from 'bootstrap';
class ComponentAccordion extends Component {
  componentDidMount() {
    this.accordion = new Collapse(document.getElementById(`${this.props.id}Collapse`), {
      toggle: false,
    });
  }
  render() {
    return (
      <div className="bg-white p-3 pb-5 accordion" id={`accordion${this.props.id}`}>
        <div className="accordion-item border-0">
          <div
            className="d-flex justify-content-between mb-2 accordion-header"
            id={`heading${this.props.id}`}
          >
            <button
              className="accordion-button bg-white p-0 text-dark border-0 shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${this.props.id}Collapse`}
              aria-expanded="true"
              aria-controls={`${this.props.id}Collapse`}
            >
              <h4>{this.props.title}</h4>
            </button>
          </div>
        </div>
        <div
          id={`${this.props.id}Collapse`}
          className="accordion-collapse collapse show"
          aria-labelledby={`heading${this.props.id}`}
          data-bs-parent={`#accordion${this.props.id}`}
        >
          <div className="accordion-body p-0">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default ComponentAccordion;
