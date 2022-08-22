export const toDoList = "toDoList";

type StrNumBol = string | number | boolean;

//save to storage function
export function saveToStorage(key: string, value: StrNumBol[]) {
	localStorage.setItem(key, JSON.stringify(value));
}

//get from storage function
export function getFromStorage(key: string) {
	const item = localStorage.getItem(key);

	if (!item) {
		return [];
	} else {
		return JSON.parse(item);
	}
}
