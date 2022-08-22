export const toDoList = "toDoList";
//save to storage function
export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
//get from storage function
export function getFromStorage(key) {
    const item = localStorage.getItem(key);
    if (!item) {
        return [];
    }
    else {
        return JSON.parse(item);
    }
}
