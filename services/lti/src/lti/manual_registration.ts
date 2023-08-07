import { Request, Response } from 'express';
import { tool_configuration } from './tool_configuration';
import { config } from '../config';

export async function handle_manual_registration(_req:  Request, res: Response){
    const settings = [
        {name: "Tool Name", value: tool_configuration.client_name},
        {name: "Tool URL", value: config.BASE_URL},
        {name: "Tool Description", value: tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration'].description},
        {name: "LTI Version", value: "LTI 1.3"},
        {name: "Public key type", value: "Keyset URL"},
        {name: "Public keyset", value: tool_configuration.jwks_uri},
        {name: "Initiate login URL", value: tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration'].target_link_uri},
        {name: "Redirect URL", value: tool_configuration.redirect_uris.join("<br>")},
        {name: "Supports Deep Linking (Content-Item Message)", value: "Yes"},
        {name: "Content Selection URL", value: tool_configuration['https://purl.imsglobal.org/spec/lti-tool-configuration'].target_link_uri},
        {name: "Icon URL", value: tool_configuration.logo_uri},
    ]

    res.send(
    '<!DOCTYPE html>' +
    '<html>' +
    '<body>' +
    '<h2>LTI 1.3 Tool Registration</h2>' +
    '<p>To integrate CrossLab into your Learning Managment System, please enter the following tool configuration in you Learning Mangement system:</p>' +
    '<table>' +
    '  <tr align="left">' +
    '    <th>Property</th>' +
    '    <th>Value</th>' +
    '  </tr>' +
    settings.map(setting => '<tr><td>' + setting.name + '</td><td>' + setting.value + '</td></tr>').join('\n') +
    '</table>' +
    '<p>Alternatively, if your Learning Mangemnet Platform supports Dynamic Registration, you may use this url to start the registration process from your Learning Mangement System:</p>' +
    '<code>' + config.BASE_URL + '</code>' +
    '</body>' +
    '</html>')
}