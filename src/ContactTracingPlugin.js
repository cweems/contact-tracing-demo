import React from "react";
import { VERSION } from "@twilio/flex-ui";
import { FlexPlugin, loadCSS } from "flex-plugin";

import reducers, { namespace } from "./states";
import ContactList from "./components/ContactList";
import TabContainer from "./components/TabContainer";

const PLUGIN_NAME = "ContactTracingPlugin";

export default class ContactTracingPlugin extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }

    /**
     * This code is run when your plugin is being started
     * Use this to modify any UI components or attach to the actions framework
     *
     * @param flex { typeof import('@twilio/flex-ui') }
     * @param manager { import('@twilio/flex-ui').Manager }
     */
    init(flex, manager) {
        loadCSS("http://localhost:3000/styles.css");
        this.registerReducers(manager);

        const options = { sortOrder: -1 };

        flex.CRMContainer.defaultProps.uriCallback = (task) => {
            flex.CRMContainer.Content.replace(
                <TabContainer
                    key={"TabContainer"}
                    manager={manager}
                    task={task}
                />
            );
            console.log("HERERRERRERERER");
            console.log("urlcallback task: ", task);
            // flex.CRMContainer.Content.replace(
            //     <ContactList key="contacts" task={task} />
            // );
        };

        //flex.CRMContainer.replace(<ContactList />);

        flex.AgentDesktopView.defaultProps.splitterOptions = {
            minimumSecondPanelSize: "70%",
        };
    }

    /**
     * Registers the plugin reducers
     *
     * @param manager { Flex.Manager }
     */
    registerReducers(manager) {
        if (!manager.store.addReducer) {
            // eslint: disable-next-line
            console.error(
                `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
            );
            return;
        }

        manager.store.addReducer(namespace, reducers);
    }
}
