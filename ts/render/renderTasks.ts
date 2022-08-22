import { toDoList, getFromStorage, saveToStorage } from "../storage.js";

type StrNumBol = (string | number | boolean)[];

const tasksContainer = document.querySelector<HTMLUListElement>("#tasks-container");
const tasksInStorage: StrNumBol = getFromStorage(toDoList);

renderTasks(tasksInStorage);

if (tasksInStorage.length === 0) {
	renderDefaultMessage("Nothing here yet!! Add somthing to appear here", "sentiment_very_satisfied");
}

export function renderTasks(tasks: StrNumBol) {
	tasksContainer.innerHTML = "";

	let checked = "";

	tasks.forEach((task) => {
		if (task.isComplete === true) {
			checked = "checked";
		}

		tasksContainer.innerHTML += `<li class="collection-item avatar valign-wrapper " data-id="${task.id}" id="list-item">
                                        <label>
                                            <input type="checkbox" ${checked} id="indeterminate-checkbox" class="checkbox" data-id="${task.id}" />
                                            <span></span>
                                        </label>                                
                                        <div class="col s12">
                                            <input  type="text" value="${task.title}" disabled id="edit-task-input" data-id=${task.id}>
                                            <span class="helper-text" data-error="wrong" data-success="right"></span>
                                        </div>
	                                    <div class="secondary-content">
                                            <span><i class="material-icons" id="edit-btn" data-id=${task.id}>create</i> </span>
                                            <span><i class="material-icons"  id="clear-btn"  data-id=${task.id} >clear</i></span>
                                        </div>
                                    </li>`;
	});

	const editBtns = document.querySelectorAll<HTMLButtonElement>("#edit-btn");

	editBtns.forEach((btn) => {
		btn.addEventListener("click", handleEditEvent);
	});

	function handleEditEvent(event): void {
		const id = event.target.dataset.id;

		const editInputs = document.querySelectorAll<HTMLInputElement>("#edit-task-input");

		const arr = [...editInputs];

		const findItem = arr.find((item) => +item.dataset.id === +id);
		findItem.disabled = false;

		editInputs.forEach((input) => {
			input.addEventListener("change", (event) => {
				const value = event.target.value;
				const id = event.target.dataset.id;

				const updatedTaskList = updateValueInTaskList(id, value, tasks);
				saveToStorage(toDoList, updatedTaskList);

				const newTaskList = getFromStorage(toDoList);
				renderTasks(newTaskList);
			});
		});
	}

	//key up event for edit input
	// const editInputs = document.querySelectorAll<HTMLInputElement>("#edit-task-input");
	// editInputs.forEach(input => {
	//     input.addEventListener("keyup", updateTaskValue)
	// })

	// function updateTaskValue(event): void {
	// 	const id = event.target.dataset.id;
	// 	const value = event.target.value.trim();

	// 	const updatedTaskList = updateValueInTaskList(id, value, tasks);
	// 	saveToStorage(toDoList, updatedTaskList);
	// }

	function updateValueInTaskList(id, value, taskList): StrNumBol {
		const itemIndex = taskList.findIndex((task) => +task.id === +id);

		taskList[itemIndex].title = value;

		return taskList;
	}

	//////////////////// end of edit task event  //////////////////////////
	// delete list item event
	const clearBtns = document.querySelectorAll("#clear-btn");

	clearBtns.forEach((btn) => {
		btn.addEventListener("click", deleteTask);
	});

	function deleteTask(event) {
		const target = event.target as HTMLInputElement;

		const id = target.dataset.id;

		const filteredTasks: StrNumBol = tasks.filter((task) => parseInt(task.id) !== parseInt(id));

		saveToStorage(toDoList, filteredTasks);

		const newListItems: StrNumBol = getFromStorage(toDoList);

		tasksContainer.innerHTML = "";

		renderTasks(newListItems);

		if (newListItems.length === 0) {
			renderDefaultMessage("Oppss... it's empty now!! Add somthing to appear here", "sentiment_neutral");
		}
	}
	/////////////////    end of delete task event ////////////////////////////////

	// checkbox event
	const checkbox = document.querySelectorAll<HTMLInputElement>(".checkbox");

	checkbox.forEach((item) => {
		item.addEventListener("change", handleCheckboxEvent);
	});

	function handleCheckboxEvent(event) {
		event.stopPropagation();

		const target = event.target as HTMLInputElement;

		const id = target.dataset.id;

		renderTasks(tasks);

		if (event.target.checked === true) {
			const findCheckedTask = tasks.find((task) => +task.id === +id);

			findCheckedTask.isComplete = true;

			saveToStorage(toDoList, tasks);

			tasksContainer.innerHTML = "";
			const newCheckedList = getFromStorage(toDoList);
			renderTasks(newCheckedList);
		} else {
			const findCheckedTask = tasks.find((task) => +task.id === +id);

			findCheckedTask.isComplete = false;
			saveToStorage(toDoList, tasks);

			tasksContainer.innerHTML = "";
			const newCheckedList: StrNumBol = getFromStorage(toDoList);
			renderTasks(newCheckedList);
		}
	}

	/////////////////end of checkbox event ///////////////////////////
}

function renderDefaultMessage(message: string, icon: string) {
	tasksContainer.innerHTML = "";
	tasksContainer.innerHTML = `<div class="row ">
                                    <div class="col s12 ">
                                        <div class="card-panel teal center-align">
                                            <p class="white-text textMessge">${message}</p>
                                            <i class="material-icons deep-orange-text text-lighten-2 medium">${icon}</i>
                                        </div>
                                    </div>
                                </div>`;
}
