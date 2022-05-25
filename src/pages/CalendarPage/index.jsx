import React from "react";
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import BigCalendarFull from "../../components/BigCalendarFull";

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, i18n } = this.props;

    return (
      <div className="py-4 px-3 h-100">
        <div className="wrapper_calendar wrapper_calendar_full h-100">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="fs-2 mb-0">Schedule</h2>
            <a href={void 0} className={`cursor-pointer btn btn-success`}>
              <i>
                <FontAwesomeIcon icon={faPlus} />
              </i>
              <span className="ps-2">New Schedule</span>
            </a>
          </div>
          <BigCalendarFull />
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(CalendarPage);
