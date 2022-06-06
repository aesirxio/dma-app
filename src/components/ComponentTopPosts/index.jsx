/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";

const dataTabs = [
  {
    name: "overall",
    text: "Overall",
  },
  {
    name: "facebook",
    text: "Facebook",
  },
  {
    name: "youtube",
    text: "Youtube",
  },
  {
    name: "twitter",
    text: "Twitter",
  },
  {
    name: "linkedin",
    text: "Linkedin",
  },
  {
    name: "instagram",
    text: "Instagram",
  },
];

class ComponentTopPosts extends Component {
  componentDidMount = () => {};

  render() {
    let { data } = this.props;
    return (
      <div className="bg-white rounded-2">
        <div className="wrapper_tabs">
          <Tabs defaultActiveKey="overall" id="tab-example">
            {dataTabs.map((name, key) => {
              return (
                <Tab key={key} eventKey={name.name} title={name.text}>
                  <div className="py-2 px-3 bg-blue mt-4">
                    <div className="row">
                      <div className="col-8">
                        <span>Title</span>
                      </div>
                      <div className="col-4">
                        <span>Engagement</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3">
                    {data.map((value, key) => {
                      return (
                        <div
                          key={key}
                          className="row py-3 border-bottom-1 item_project"
                        >
                          <div className="col-8">
                            <div className="d-flex align-items-center">
                              <span>{value.text}</span>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="d-flex align-items-center justify-content-center">
                              <span>{value.number}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ComponentTopPosts;
