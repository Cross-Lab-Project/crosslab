import { APIClient } from "@cross-lab-project/api-client"

let apiClient: APIClient

export async function login() {
    const apiServer = (document.getElementById("server") as HTMLInputElement).value;
    const username = (document.getElementById("uname") as HTMLInputElement).value;
    const password = (document.getElementById("pwd") as HTMLInputElement).value;
    apiClient = new APIClient(apiServer)
    await apiClient.postLogin({ username: username, password: password, method: "tui"});
    const tb = document.getElementsByTagName("tbody")[0];
    tb.innerHTML="";
    const response = await apiClient.getUpdates();
    const entries = response.body;
    for (const entry of entries) {
        createRow(entry.device_id, entry.newest_version, entry.newest_version_link);
    }
    document.getElementById("login-form").setAttribute("hidden", "true")
    document.getElementById("update-table").removeAttribute("hidden")
}

export async function load() {
    const tb = document.getElementsByTagName("tbody")[0];
    tb.innerHTML="";
    const response = await apiClient.getUpdates();
    const entries = response.body;
    for (const entry of entries) {
        createRow(entry.device_id, entry.newest_version, entry.newest_version_link);
    }
}

function createRow(id: string, version: string, link: string) {
    const tb = document.getElementsByTagName("tbody")[0];
    const rowTemplate = document.querySelector<HTMLTemplateElement>('#rowTemplate')!.content;
    const row = document.importNode(rowTemplate, true);
    const inputs = row.querySelectorAll('input');
    inputs[0].value = id;
    inputs[1].value = version;
    inputs[2].value = link;
    const [changeButton, deleteButton] = Array.from(row.querySelectorAll('button'));
    changeButton.onclick = async () => {
        const newId = inputs[0].value;
        const newVersion = inputs[1].value;
        const newLink = inputs[2].value;
        await apiClient.patchUpdatesByDeviceId({ 
            device_id: id 
        }, { 
            device_id: newId, 
            newest_version: newVersion,  
            newest_version_link: newLink
        });
        load();
    }
    deleteButton.onclick = async () => {
        await apiClient.deleteUpdatesByDeviceId({ 
            device_id: id 
        })
        load();
    }
    tb.appendChild(row);
}

export async function addEntry() {
    const newId = document.querySelector<HTMLInputElement>('#new-id')!.value;
    const newVersion = document.querySelector<HTMLInputElement>('#new-version')!.value;
    const newLink = document.querySelector<HTMLInputElement>('#new-link')!.value;
    const response = await apiClient.postUpdates({ 
        device_id: newId, 
        newest_version: newVersion, 
        newest_version_link: newLink 
    });
    createRow(response.body.device_id, response.body.newest_version, response.body.newest_version_link);
    document.querySelector<HTMLInputElement>('#new-id')!.value = "";
    document.querySelector<HTMLInputElement>('#new-version')!.value = "";
    document.querySelector<HTMLInputElement>('#new-link')!.value = "";
}