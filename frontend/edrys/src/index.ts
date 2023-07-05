import './style.css';

import { APIClient, ExperimentServiceTypes } from "@cross-lab-project/api-client";
import { adoptStyles, html, LitElement, render, unsafeCSS } from "lit";
import { customElement, state, query } from "lit/decorators.js";

declare const Edrys: any;

@customElement("edrys-app")
export class App extends LitElement {
    client: APIClient
    experiment: ExperimentServiceTypes.Experiment

    @state()
    loggedIn = false;

    @state()
    instances: { codeUrl: string, instanceUrl: string, deviceToken: string }[] = [];

    @query("#username")
    usernameInput: HTMLInputElement;
    @query("#password")
    passwordInput: HTMLInputElement;

    constructor() {
        super();
        let endpoint = "https://api.goldi-labs.de";
        if (Edrys.module && Edrys.module.config.endpoint) {
            endpoint = Edrys.module.config.endpoint;
        }
        this.client = new APIClient(endpoint);
        this.experiment = (Edrys.module && Edrys.module.config.experiment)??{};
        if (Edrys.module)
            this.login(Edrys.module.config.username, Edrys.module.config.password).then((success)=> success && this.startExperiment())
    }

    async login(username: string, password: string) {
        for (const method of ['tui', 'local'] as const) {
            try {
                await this.client.login(username, password, { method });
                this.loggedIn = true
                return true
            } catch (error) {
                // ignore
            }
        }
        return false
    }

    async startExperiment() {
        const experiment = await this.client.createExperiment({...this.experiment, status: 'running'})
        if (experiment.status ==='setup') {
            await this.experimentSetup(experiment)
        }
    }

    async experimentSetup(experiment: ExperimentServiceTypes.Experiment) {
        if (experiment.status !== 'setup') {
            throw new Error('Experiment is not in setup phase')
        }
        const instances: { codeUrl: string, instanceUrl: string, deviceToken: string }[] = []
        for (const device of experiment.devices ?? []) {
            if (device.device) {
                const setupProps = device.additionalProperties as { instanceUrl?: string, deviceToken?: string }
                const deviceDetails = await this.client.getDevice(device.device)
                if (deviceDetails.type === 'edge instantiable' && setupProps.instanceUrl && setupProps.deviceToken && deviceDetails.codeUrl) {
                    device.device = setupProps.instanceUrl
                    instances.push({ codeUrl: deviceDetails.codeUrl, instanceUrl: setupProps.instanceUrl, deviceToken: setupProps.deviceToken })
                }
            }
        }
        this.instances = instances
        await this.client.updateExperiment(experiment.url!, { devices: experiment.devices })
        while (true) {
            const instanceDetails = await Promise.all(instances.map(instance => this.client.getDevice(instance.instanceUrl)))
            if (instanceDetails.every(i => i.connected)){
                await this.client.updateExperiment(experiment.url!, { status: 'running' })
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 500))
        }
    }

    render_login_failed() {
        return html`
        <div>
            <p>Login failed</p>
            <p>Check the module config. Use the following module config template:</p>
            <code>
            {<br/>
                "endpoint": "https://api.goldi-labs.de"<br/>
                "username": "YOUR USERNAME",<br/>
                "password": "YOUR PASSWORD",<br/>
                "experiment": {YOUR EXPERIMENT CONFIG HERE}<br/>
            }<br/>
            </code>
        </div>
        `
    }

    render() {
        if(!this.loggedIn) {
            return this.render_login_failed()
        } else { 
            return html`
            <div>
                ${this.instances.map(instance => html`
                <iframe width="100%" height="800px" src="${instance.codeUrl}/?instanceUrl=${instance.instanceUrl}&deviceToken=${instance.deviceToken}"></iframe>
                `)}
            </div>
            `
        }
    }
}