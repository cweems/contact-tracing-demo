import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Manager } from "@twilio/flex-ui";
import Dashboard from "./Dashboard";
import IntakeForm from "./IntakeForm";

export default class TabContainer extends Component {
    constructor() {
        super();

        const manager = Manager.getInstance();
        this.workerSkills = manager.workerClient.attributes;

        let initialTabs = new Map([]);
        this.state = {
            tablist: initialTabs,
            currentTab: 0,
        };
    }

    componentWillReceiveProps(props) {
        
        if (props.task) {
            let currentTabs = this.state.tablist;
            let tabIndex;
            if (currentTabs.size > 1) {
                tabIndex = currentTabs.size - 1;
            } else {
                tabIndex = 0;
            }

            let from = props.task.attributes.from;
            let outbound_to = props.task.attributes.outbound_to;
            let zipcode = props.task.attributes.zipcode;
            let call = props.task.attributes.call_sid;

            if (
                !currentTabs.has(outbound_to) &&
                props.task.status !== "wrapping"
            ) {
                currentTabs.set(outbound_to, {
                    from: from,
                    outbound_to: outbound_to,
                    zipcode: zipcode,
                    conference: call,
                });
            }

            this.setState({
                tablist: currentTabs,
                currentTab: tabIndex,
            });
        }
    }

    removeTab(e) {
        let tablist = this.state.tablist;
        tablist.delete(e.target.from);
        this.setState({
            tablist: tablist,
        });
    }

    createTabs() {
        let tabs = [];

        for (let [key, value] of this.state.tablist.entries()) {
            tabs.push(
                <Tab>
                    Current Call
                    <a
                        className="close"
                        name={value.outbound_to}
                        onClick={(e) => this.removeTab(e)}
                    />
                </Tab>
            );
        }
        return tabs;
    }

    createPanels() {
        let panels = [];

        for (let [key, value] of this.state.tablist.entries()) {
            console.log(key);
            panels.push(
                <TabPanel forceRender={true}>
                    <IntakeForm identifier={key} />
                </TabPanel>
            );
        }

        return panels;
    }

    render() {
        return (
            <Tabs
                selectedIndex={this.state.currentTab}
                onSelect={(tabIndex) => this.setState({ currentTab: tabIndex })}
            >
                <TabList>
                    {this.createTabs()}
                    <Tab>Contacts</Tab>
                </TabList>
                {this.createPanels()}
                <TabPanel>
                    <Dashboard />
                </TabPanel>
            </Tabs>
        );
    }
}
