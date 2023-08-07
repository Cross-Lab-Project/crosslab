export function cross_document_message(message: object){
    return `<html><body><script>(window.opener || window.parent).postMessage(${JSON.stringify(message)}, '*')</script></body></html>`
}

export function post_form_message(url: string, message: object): string{
    return `<html><body><form id="form" action="${url}" method="post">${Object.entries(message).map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`).join("")}</form><script>document.getElementById("form").submit()</script></body></html>`
}