import React from 'react';

class CustomHeader extends React.Component {
  render() {
    const { date, localizer } = this.props;
    const formattedDate = localizer.format(date, 'ddd DD', 'en'); // Adjust the locale if needed

    return (
      <div className="rbc-header">
        <span className="rbc-label text-body text-capitalize">{formattedDate}</span>
      </div>
    );
  }
}

export default CustomHeader;
