import { toDoList, getFromStorage, saveToStorage } from "../storage";

type StrNumBol = (string | number | boolean)[];

const tasksContainer = document.querySelector<HTMLUListElement>("#tasks-container");
const tasksInStorage: StrNumBol = getFromStorage(toDoList);

renderTasks(tasksInStorage);

if (tasksInStorage.length === 0) {
	renderDefaultMessage("Nothing here yet!! Add somthing to appear here", "sentiment_very_satisfied");
}

export function renderTasks(tasks: any) {
	tasksContainer.innerHTML = "";

	let checked = "";

	tasks.forEach((task: any) => {
		if (task.isComplete === true) {
			checked = "checked";
		} else {
			checked = "";
		}

		tasksContainer.innerHTML += `<li class="collection-item avatar valign-wrapper " data-id="${task.id}" id="list-item" draggable="true">
                                        <label>
                                            <input type="checkbox" ${checked} id="indeterminate-checkbox" class="checkbox" data-id="${task.id}"  />
                                            <span></span>
                                        </label>                                
                                        <div class="col s12 ">
                                            <input  type="text" value="${task.title}" disabled id="edit-task-input" data-id=${task.id}  >
                                            <span class="helper-text " data-error="wrong" data-success="right"></span>
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

	function handleEditEvent(event: any): void {
		const id = event.target.dataset.id;

		const editInputs = document.querySelectorAll("#edit-task-input") as NodeList | null;

		const arr: any = [...editInputs];

		const findItem: any = arr.find((item: any) => +item.dataset.id === +id);
		findItem.disabled = false;

		editInputs.forEach((input) => {
			input.addEventListener("change", (event: any) => {
				const target = event.target as HTMLInputElement;

				const value = target.value;
				const id = target.dataset.id;

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

	function updateValueInTaskList(id: string, value: string, taskList: any): any {
		const itemIndex = taskList.findIndex((task: any) => +task.id === +id);

		taskList[itemIndex].title = value;

		return taskList;
	}

	//////////////////// end of edit task event  //////////////////////////
	// delete list item event
	const clearBtns = document.querySelectorAll("#clear-btn");

	clearBtns.forEach((btn) => {
		btn.addEventListener("click", deleteTask);
	});

	function deleteTask(event: any): void {
		const target = event.target as HTMLInputElement;

		const id = target.dataset.id;

		const filteredTasks: StrNumBol = tasks.filter((task: any) => parseInt(task.id) !== parseInt(id));

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
		item.addEventListener("change", (event: any) => {
			event.stopPropagation();

			const target = event.target as HTMLInputElement;

			const id: string = target.dataset.id;

			if (target.checked === true) {
				const findCheckedTask: any = tasks.find((task: any) => +task.id === +id);
				findCheckedTask.isComplete = true;

				saveToStorage(toDoList, tasks);

				const newCheckedList = getFromStorage(toDoList);

				renderTasks(newCheckedList);
			} else {
				const findCheckedTask: any = tasks.find((task: any) => +task.id === +id);
				findCheckedTask.isComplete = false;

				saveToStorage(toDoList, tasks);

				const newCheckedList = getFromStorage(toDoList);

				renderTasks(newCheckedList);
			}
		});
	});

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
