export const getJSONFromForm = (form: HTMLFormElement) => {
    const data = new FormData(form)
    const json: {[key: string]: string} = {}
    data.forEach((value: string, key: string) => {
        json[key] = value
    })
    return json
}
