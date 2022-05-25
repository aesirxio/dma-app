import React from 'react';
import ComponentImage from '../../../components/ComponentImage';
import Helper from '../../../utils/helper';

class ProjectNameModel {
  constructor(name, logo) {
    this.name = name;
    this.logo = logo;
  }

  getProjectName = () => {
    return (
      <>
        {this.logo ? (
          <ComponentImage src={this.logo} alt="project-logo" className="img-avatar me-2" />
        ) : (
          ''
        )}
        {this.name}
      </>
    );
  };
}

export { ProjectNameModel };
