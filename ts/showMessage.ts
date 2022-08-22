function showMessage(container, className, message) {
	const element = document.querySelector(container);
	element.innerHTML = `<a onclick="M.toast({html: '${message}'})" class="btn btn-${className}">${message}</a>`;
}
