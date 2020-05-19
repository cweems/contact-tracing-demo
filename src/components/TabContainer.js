import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Manager } from "@twilio/flex-ui";
import ContactList from "./ContactList";
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

    componentDidMount() {}

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
            let zipcode = props.task.attributes.zipcode;
            let call = props.task.attributes.call_sid;

            if (!currentTabs.has(from) && props.task.status !== "wrapping") {
                currentTabs.set(from, {
                    from: from,
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
                    {value.from}
                    <a
                        className="close"
                        name={value.from}
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
            let el = <div>Test</div>;

            panels.push(
                <TabPanel forceRender={true}>
                    <IntakeForm />
                    <button
                        className="button"
                        name={key}
                        onClick={(e) => this.removeTab(e)}
                    >
                        Close
                    </button>
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
                    <ContactList />
                </TabPanel>
            </Tabs>
        );
    }
}
