/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from "react";
import { withTranslation } from "react-i18next";
import history from "../../routes/history";

import "./index.scss";
import styles from "./index.module.scss";

const WizardSteps = () => {
  const steps = [
    {
      key: 1,
      text: "Connect channel",
    },
    {
      key: 2,
      text: "Create content",
    },
  ];

  let processW = 0;
  let currentStep = 1;

  if (
    // history.location.pathname === `/wizard/project/${props.match.params.id}`
    history.location.pathname === `/wizard/content`
  ) {
    currentStep = currentStep + 1;
  } else if (
    // history.location.pathname ===
    // `/wizard/project/${props.match.params.id}/content`
    history.location.pathname === `/wizard/1/content`
  ) {
    // currentStep = currentStep + 2;
  } else {
    // currentStep = currentStep;
  }

  return (
    <div className="wr_wizard_step position-relative my-5 w-50 top-0 start-50 translate-middle-x">
      {steps.map(({ key, text }) => {
        let isActive = currentStep >= key;

        if (isActive) {
          processW = (key - 1) * 100;
        }

        return (
          <div
            key={key}
            className={`position-absolute top-0 start-${
              (key - 1) * 100
            } translate-middle`}
          >
            <div
              className={`${
                isActive ? "bg-primary" : "bg-secondary"
              } text-white text-center rounded-circle ${styles.step}`}
            >
              {key}
            </div>
            <div className="position-absolute text-nowrap start-50 translate-middle-x">
              {text}
            </div>
          </div>
        );
      })}

      <div className={`progress ${styles.progress}`}>
        <div className={`progress-bar w-${processW}`}></div>
      </div>
    </div>
  );
};

export default withTranslation("common")(WizardSteps);
