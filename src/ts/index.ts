import { saveToStorage, getFromStorage, toDoList } from "./storage";
import { renderTasks } from "./render/renderTasks";

import "../sass/style.scss";

const form = document.querySelector<HTMLFormElement>("form");

const tasksInStorage = getFromStorage(toDoList);
renderTasks(tasksInStorage);

form.addEventListener("submit", addTasks);

function addTasks(event: any): void {
	event.preventDefault();

	const id: number = Math.floor(Math.random() * Date.now());
	const input = document.querySelector<HTMLInputElement>("#task-input");
	const errorContainer = document.querySelector<HTMLSpanElement>("#error-container");
	let isComplete: boolean = false;

	const inputValue = input.value;
	if (inputValue.trim().length === 0 || !inputValue) {
		errorContainer.innerHTML = `<i class="material-icons">error_outline</i>
									<span>
										Please add keyword to create task 
									</span>`;
	} else {
		const newTask = { id: id, title: inputValue, isComplete: isComplete };

		let curruntTaskInStorage = getFromStorage(toDoList);

		const findCurrentTask = curruntTaskInStorage.find(function (task: any) {
			return +task.id === +id;
		});

		if (!findCurrentTask) {
			curruntTaskInStorage.push(newTask);

			saveToStorage(toDoList, curruntTaskInStorage);

			renderTasks(curruntTaskInStorage);

			input.value = "";
			input.focus();
		}
	}
}
console.log("ankit");
