function showMessage(container: string, className: string, message: string) {
	const element = document.querySelector<HTMLDivElement>(container);
	element.innerHTML = `<a onclick="M.toast({html: '${message}'})" class="btn btn-${className}">${message}</a>`;
}
