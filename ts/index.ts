import { saveToStorage, getFromStorage, toDoList } from "./storage.js";
import { renderTasks } from "./render/renderTasks.js";

const form = document.querySelector<HTMLFormElement>("form");

const tasksInStorage = getFromStorage(toDoList);
renderTasks(tasksInStorage);

form.addEventListener("submit", addTasks);

function addTasks(event): void {
	event.preventDefault();

	const id: number = Math.floor(Math.random() * Date.now());
	const input = document.querySelector<HTMLInputElement>("#task-input");
	const errorContainer = document.querySelector<HTMLSpanElement>("#error-container");
	let isComplete = false;

	const inputValue = input.value;
	if (inputValue.trim().length === 0 || !inputValue) {
		errorContainer.innerHTML = `<i class="material-icons">error_outline</i>
									<span>
										Please add keyword to create task 
									</span>`;
	} else {
		const newTask = { id: id, title: inputValue, isComplete: isComplete };

		let curruntTaskInStorage = getFromStorage(toDoList);

		const findCurrentTask = curruntTaskInStorage.find(function (task) {
			return +task.id === +id;
		});

		if (!findCurrentTask) {
			curruntTaskInStorage.push(newTask);

			saveToStorage(toDoList, curruntTaskInStorage);

			renderTasks(curruntTaskInStorage);
			// addClassToList();

			input.value = "";
			input.focus();
		}
	}
}
console.log("ankit");
