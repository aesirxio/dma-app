import React from "react";
import { withTranslation } from "react-i18next";
import ComponentConnectaChannel from "../../components/ComponentConnectaChannel";

class SocialMediaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="py-4 px-3">
        <h2 className="f-2 mb-3">Connect a Channel</h2>
        <ComponentConnectaChannel />
      </div>
    );
  }
}

export default withTranslation("common")(SocialMediaPage);
