import React from 'react';
import ComponentImage from '../../../components/ComponentImage';

class ProjectLeadModel {
  constructor(data) {
    this.id = data.id ?? null;
    this.name = data.name ?? '';
    this.avatarUrl = data.avatar_url ?? '';
  }

  getName = () => {
    return (
      <>
        <ComponentImage src={this.avatarUrl} className="img-avatar me-2" alt={this.avatarUrl} />
        {this.name}
      </>
    );
  };
}

export { ProjectLeadModel };
