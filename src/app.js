let treinos = document.getElementById("treinos_container");
let treinos_form = document.getElementById("treinos_form");
let formButton = document.getElementById("form_button");
let gridContainer = document.getElementById("grid-container");
let clicked = "";
let countCard = 2;

function create() {
	//cria as linhas ao clicar no botao de add na pag de criar treinos
	// let input_nome = document.createElement("input");
	// let input_rep = document.createElement("input");
	// let input_ser = document.createElement("input");
	// let deleteIcon = document.createElement("img");
	// let div = document.createElement("div");
	// div.className = "input-divs";
	// deleteIcon.src = "../assets/imgs/delete-icon.png";
	// deleteIcon.className = "delete-icon";
	// deleteIcon.setAttribute("onclick", "deleteTD(event)");
	// input_rep.type = "number";
	// input_ser.type = "number";

	// input_nome.placeholder = "Nome do Exercício";
	// input_rep.placeholder = "Repetições";
	// input_ser.placeholder = "Séries";

	// input_nome.className = "input_treinos";
	// input_ser.className = "input_treinos";
	// input_rep.className = "input_treinos";

	// let br = document.createElement("br");
	// div.appendChild(br);
	// div.appendChild(input_nome);
	// div.appendChild(input_rep);
	// div.appendChild(input_ser);
	// div.appendChild(deleteIcon);
	// treinos_form.appendChild(div);
	let form = document.getElementById("form-container");
	let div = document.createElement("div");
	div.classList.add("card-exercicio");

	let p = document.createElement("p");
	p.innerText = countCard;
	p.classList.add("num-exercicio");
	countCard++;

	div.appendChild(p);
	div.appendChild(document.createElement("br"));

	let inputNome = document.createElement("input");
	let inputRep = document.createElement("input");
	let inputSer = document.createElement("input");

	inputNome.type = "text";
	inputRep.type = "number";
	inputSer.type = "number";

	inputNome.placeholder = "Nome do Exercício";
	inputRep.placeholder = "Repetições";
	inputSer.placeholder = "Séries";

	let btn = document.createElement("button");
	btn.classList.add("btn-delete-card");
	btn.innerText = "Excluir";
	btn.setAttribute("onclick", "deleteTD(event)");

	div.appendChild(inputNome);
	div.appendChild(inputRep);
	div.appendChild(inputSer);
	div.appendChild(btn);

	form.appendChild(div);
}

function save(event) {
	//salva o treino na pag de criar
	let form = document.getElementById("form-container");
	let selects = document.getElementsByTagName("select");
	let inputs = [];

	for (let i = 0; i < form.getElementsByTagName("input").length; i++) {
		const element = form.getElementsByTagName("input")[i];
		if (element.value == null || element.value == "") {
			event.preventDefault();
		}
		if (i == 0) {
			inputs.push(element.value);
			for (const s of selects) {
				inputs.push(s.value);
			}
		} else {
			inputs.push(element.value);
		}
	}

	// verificando se inputs estao vazios
	if (!verificarInputs(inputs)) {
		alert("Os campos não podem estar vazios.");
	} else {
		let treinosStorage = localStorage.getItem("treinos");

		if (treinosStorage == null) {
			let treinos = [];
			treinos.push(inputs);
			let obj = JSON.stringify(treinos);
			localStorage.setItem("treinos", obj);
		} else {
			//verificando depois de saber se é null para não ocorrer erro de varrer algo nulo
			//ou seja, verificando somente depois ter mais de um elemento
			if (verificarExistencia(inputs[0])) {
				alert("Um treino com esse nome já existe, por favor altere.");
				return;
			}
			let treinos = localStorage.getItem("treinos");
			let treinos_obj = JSON.parse(treinos);
			let temp_arr = [];

			for (let i = 0; i < treinos_obj.length; i++) {
				const element = treinos_obj[i];
				temp_arr.push(element);
			}

			temp_arr.push(inputs);
			temp_arr = JSON.stringify(temp_arr);
			localStorage.setItem("treinos", temp_arr);
		}

		location.reload(true);
	}
}
function verificarInputs(inputs) {
	//verifica se existe algum input vazio
	let found = false;
	inputs.forEach((element) => {
		if (element == "") {
			found = true;
		}
	});

	if (!found) {
		return true;
	} else {
		return false;
	}
}
function verificarExistencia(nome) {
	//verifica se ja existe um treino com o nome do novo treino
	let found = false;
	let treinos = localStorage.getItem("treinos");
	treinos = JSON.parse(treinos);
	treinos.forEach((element) => {
		if (nome == element[0]) {
			found = true;
		}
	});

	return found;
}

function render(event) {
	let treinos = localStorage.getItem("treinos");

	if (treinos == null || treinos.length == 2) {
		//se não existir treinos mostra a mensagem de criar treino
		document
			.getElementById("empty-div")
			.setAttribute("style", "display: block; ");
	} else {
		document.getElementById("empty-div").setAttribute("style", "display: none");
		let treinos_obj = JSON.parse(treinos);

		//renderiza os treinos salvos
		treinos_obj.forEach((element) => {
			renderElement(element);
		});
	}
}
function deleteAll(event) {
	let currentDiv = event.target.parentElement.parentElement;
	localStorage.setItem(
		"table-to-edit",
		currentDiv.querySelector("h2").innerText,
	);

	//novo array sem o treino que sera deletado
	let newTreinos = removerTreinoAtual();
	newTreinos = JSON.stringify(newTreinos);
	localStorage.setItem("treinos", newTreinos);
	location.reload(true);
}

function save_user(event) {
	//verifica os campos de login e salva o nome do user
	let user = document.forms[0].elements[0].value;
	let password = document.forms[0].elements[1].value;

	if (user == "" || user == null || user == undefined) {
		if (password == "" || password == null || password == undefined) {
			alert("Prencha todos os campos.");
			event.preventDefault();
		} else {
			alert("Prencha o usuário.");
			event.preventDefault();
		}
	} else if (password == "" || password == null || password == undefined) {
		alert("Prencha a senha.");
		event.preventDefault();
	}
	localStorage.setItem("user", user);
}

window.addEventListener("load", (event) => {
	//set o nome elemento do user com o valor salvo
	document.getElementById("user_menu").innerText = localStorage.getItem("user");

	let path = location.href.split("/");
	path = path[path.length - 1];
	//need to rework this fns
	// verifyToggle();
	// verifyHover(path);

	if (localStorage.getItem("clicked")) {
		let links = document.getElementsByClassName("global-container");
		links = links[0].getElementsByTagName("ul")[0].getElementsByTagName("li");

		for (const l of links) {
			if (l.getAttribute("data-loc") == localStorage.getItem("clicked")) {
				if (l.getAttribute("not-clicked")) {
					l.classList.remove("not-clicked");
				}

				if (l.parentElement.parentElement.getAttribute("class") == "sidebar") {
					l.classList.add("link-clicked-side");
				} else {
					if (localStorage.getItem("menu-state") == "drawer") {
						return;
					}
					l.getElementsByTagName("div")[0].classList.add("link-clicked-drawer");
				}
			} else {
				l.classList.add("not-clicked");
			}
		}
	}
});

function verifyHover(path) {
	let links = document.getElementsByClassName("global-container");
	links = links[0].getElementsByTagName("ul")[0].getElementsByTagName("li");

	for (const l of links) {
		if (l.getAttribute("data-loc") == path) {
			clicked = path;
			localStorage.setItem("clicked", path);
			return l;
		}
	}
}

function verifyToggle() {
	let state = localStorage.getItem("menu-state");
	if (state == "drawer") {
		let button = document
			.getElementsByClassName("sidebar")[0]
			.getElementsByTagName("ul")[0]
			.getElementsByTagName("li")[0];
		button.click();

		let lis = document
			.getElementsByClassName("drawer")[0]
			.getElementsByTagName("ul")[0]
			.getElementsByTagName("li");

		for (const li of lis) {
			if (li.dataset.loc == localStorage.getItem("clicked")) {
				let div = li.getElementsByTagName("div")[0];
				li.classList.add("link-clicked-drawer");
			}
		}
	}
}

function redirect(event, path) {
	let state = document.getElementsByTagName("nav")[0].dataset.toogle;
	localStorage.setItem("menu-state", state);
	localStorage.setItem("clicked", path);
	location.href = path;
}

function showPassword() {
	let pswInput = document.getElementById("password_field");
	if (pswInput.type === "password") {
		pswInput.type = "text";
	} else {
		pswInput.type = "password";
	}
}

function editTable(event) {
	let currentDiv = event.target.parentElement.parentElement;
	localStorage.setItem(
		"table-to-edit",
		currentDiv.querySelector("h2").innerText,
	);
	// window.location.href = "../public/editar.html";
    redirect(event, "../public/editar.html")
}

function renderEdit(event) {
	//renderiza o elemento na pag de edicao
	//tablename = valor salvo no click na pag de treinos
	let tableName = localStorage.getItem("table-to-edit");
	let treinos = JSON.parse(localStorage.getItem("treinos"));
	treinos.forEach((element) => {
		if (element[0] == tableName) {
			tableToEdit(element);
		}
	});
}

function tableToEdit(data) {
	//renderiza a table para edicao
	//data == [exercicio x]
	let nome = document.getElementById("nome");
	nome.value = data[0];

	let musculo = document.getElementById("musculos");
	musculo.value = data[1];

	let foco = document.getElementById("foco");
	foco.value = data[2];

	let form = document.getElementById("form-container");

	let tempData = [];
	for (let i = 3; i < data.length; i++) {
		tempData.push(data[i]);
	}
	data = tempData;

	let count = 0;
	let div = document.createElement("div");
	div.classList.add("card-exercicio");
	countCard = 1;
	for (let i = 0; i < data.length; i++) {
		switch (count) {
			case 0:
				let p = document.createElement("p");
				p.classList.add("num-exercicio");
				p.innerText = countCard;
				countCard++;
				let input = document.createElement("input");
				input.value = data[i];
				input.placeholder = "Nome";
				div.appendChild(p);
				div.appendChild(input);
				count++;
				break;
			case 1:
				let input1 = document.createElement("input");
				input1.type = "number";
				input1.placeholder = "Repetições";
				input1.value = data[i];
				div.appendChild(input1);
				count++;
				break;
			case 2:
				let input2 = document.createElement("input");
				input2.value = data[i];
				input2.type = "number";
				input2.placeholder = "Séries";
				form.appendChild(input2);
				let btnDelete = document.createElement("button");
				btnDelete.classList.add("btn-delete-card");
				btnDelete.setAttribute("onclick", "deleteTD(event)");
				btnDelete.innerText = "Excluir";
				div.appendChild(input2);
				div.appendChild(btnDelete);
				form.appendChild(div);
				count = 0;
				div = document.createElement("div");
				div.classList.add("card-exercicio");
				break;

			default:
				break;
		}
	}
}

function saveEdit(event) {
	//salva o exercicio que foi editado
	let newArr = [];
	let inputs = document
		.getElementById("form-container")
		.querySelectorAll("input");

	let musculo = document.getElementById("musculos").value;
	let foco = document.getElementById("foco").value;
	if (
		!verificarInputEditar(inputs) &&
		musculo != null &&
		musculo != "" &&
		musculo != undefined &&
		foco != null &&
		foco != "" &&
		foco != undefined
	) {
		alert("Os campos não podem estar vazios.");
	} else {
		//coloca o novo treino em um array
		newArr.push(inputs[0].value);
		newArr.push(musculo);
		newArr.push(foco);

		for (let i = 1; i < inputs.length; i++) {
			const element = inputs[i];
			newArr.push(element.value);
		}

		//retorna um array sem o treino que foi editado
		let temp = removerTreinoAtual();

		//add o novo treino no array de todos os treinos
		temp.push(newArr);
		temp = JSON.stringify(temp);

		//salva o novo arr
		//tirar dps
		localStorage.setItem("treinos", temp);
		window.location.href = "../public/treinos.html";
	}
}
function verificarInputEditar(inputs) {
	let found = false;
	inputs.forEach((element) => {
		if (element.value == "") {
			found = true;
		}
	});

	if (!found) {
		return true;
	} else {
		return false;
	}
}

function removerTreinoAtual() {
	//retorna um array filtrado sem o treino que sera removido
	let treinos = JSON.parse(localStorage.getItem("treinos"));
	let nome = localStorage.getItem("table-to-edit");

	let temp = treinos.filter((element) => {
		return element[0] !== nome;
	});

	return temp;
}

function createEdit() {
	//cria a linha do form de editar ao clicar em add na pag de editar
	let div = document.createElement("div");
	let form = document.getElementById("form-editar");
	let nome = document.createElement("input");
	nome.placeholder = "Nome";
	let series = document.createElement("input");
	series.placeholder = "Séries";
	series.type = "number";
	let reps = document.createElement("input");
	reps.placeholder = "Repetições";
	reps.type = "number";
	let br = document.createElement("br");
	let deleteIcon = document.createElement("img");
	deleteIcon.src = "../assets/imgs/delete-icon.png";
	deleteIcon.className = "delete-icon";
	deleteIcon.setAttribute("onclick", "deleteTD(event)");
	div.appendChild(br);
	div.appendChild(nome);
	div.appendChild(reps);
	div.appendChild(series);
	div.appendChild(deleteIcon);
	form.appendChild(div);
}

function deleteTD(event) {
	//remove o td selecionado na pag de editar e treinos
	let parent = event.target.parentElement;
	parent.remove();
	countCard--;
}

function deleteEdit(event) {
	// deleta tudo no editar
	// icone de lixeira
	let newTreinos = removerTreinoAtual();
	newTreinos = JSON.stringify(newTreinos);
	localStorage.setItem("treinos", newTreinos);
	window.location.href = "../public/treinos.html";
}

function pesquisar(event) {
	//pesquisa pelo valor no input
	let field = document.getElementById("input-pesquisa");
	if (field == null || field.value == "") {
		alert("Preencha o campo ");
	} else {
		let treinos = localStorage.getItem("treinos");
		treinos = JSON.parse(treinos);
		let found = false;
		treinos.forEach((element) => {
			if (element[0] == field.value) {
				//remove os elementos atuais da tela
				document.getElementById("grid-container").innerHTML = "";
				//renderiza o elemento achado
				renderElement(element);
				found = true;
			}
		});
		if (!found) {
			alert("Treino não encontrado");
		}
	}
}

function verificarEnter(event) {
	//verifica o enter no campo de pesquisa
	if (event.key === "Enter") {
		pesquisar();
	}
}

function renderElement(element) {
	//renderiza um elemento por completo na pag de treinos ou de pesquisa
	let card = document.createElement("div");
	card.className = "card";
	let container = document.createElement("container");
	container.className = "container";
	let nomeExe = document.createElement("h2");
	nomeExe.innerText = element[0];
	container.appendChild(nomeExe);
	let musculo = document.createElement("h4");
	musculo.innerText = element[1];
	musculo.classList.add("musculo-render");
	container.appendChild(musculo);
	let foco = document.createElement("h4");
	foco.innerText = element[2];
	container.appendChild(foco);
	let table = document.createElement("table");
	table.contentEditable = "false";
	table.setAttribute("style", "font-size: 20px");
	let body = table.createTBody();
	let tr = document.createElement("tr");
	let nome = document.createElement("th");
	nome.innerText = "Nome";
	let series = document.createElement("th");
	series.innerText = "Séries";
	let reps = document.createElement("th");
	reps.innerText = "Reps";
	tr.appendChild(nome);
	tr.appendChild(series);
	tr.appendChild(reps);
	body.appendChild(tr);

	elementTemp = [];
	for (let i = 3; i < element.length; i++) {
		elementTemp.push(element[i]);
	}
	element = elementTemp;
	let trData = document.createElement("tr");
	let count = 0;
	for (let i = 0; i < element.length; i++) {
		// if (i != 0) {
		const e = element[i];
		switch (count) {
			case 0:
				let nome = document.createElement("td");
				nome.innerText = e;
				trData.appendChild(nome);
				count++;
				break;
			case 1:
				let series = document.createElement("td");
				series.innerText = e;
				trData.appendChild(series);
				count++;
				break;
			case 2:
				let reps = document.createElement("td");
				reps.innerText = e;
				trData.appendChild(reps);
				body.appendChild(trData);
				trData = document.createElement("tr");
				count = 0;
				break;

			default:
				break;
		}
		// }
	}
	let img = document.createElement("img");
	img.className = "edit-icon";
	img.src = "../assets/imgs/edit-icon.png";
	img.setAttribute("style", "height: 2.5rem");
	img.setAttribute("onclick", "editTable(event)");

	let deleteIcon = document.createElement("img");
	deleteIcon.className = "delete-icon";
	deleteIcon.src = "../assets/imgs/lixeira60.png";
	deleteIcon.setAttribute("style", "height: 2.5rem");
	deleteIcon.setAttribute("onclick", "deleteAll(event)");

	let buttonDelete = document.createElement("button");
	buttonDelete.innerText = "Excluir";
	buttonDelete.setAttribute("onclick", "deleteAll(event)");
	let buttonEdit = document.createElement("button");
	buttonEdit.innerText = "Editar";
	buttonEdit.setAttribute("onclick", "editTable(event)");
	buttonEdit.classList.add("btn-editar");
	buttonDelete.classList.add("btn-deletar");
	let divButton = document.createElement("div");
	divButton.appendChild(buttonEdit);
	divButton.appendChild(buttonDelete);
	divButton.classList.add("div-excluir-editar");

	body.appendChild(trData);
	container.appendChild(table);
	// container.appendChild(img);
	// container.appendChild(deleteIcon);
	container.appendChild(divButton);

	card.appendChild(container);
	// card.setAttribute("class", "")
	gridContainer.appendChild(card);
}

function deleteEverything(event) {
	//remove todos os treinos na pag de treinos
	localStorage.removeItem("treinos");
	location.reload(true);
}

function menuToggle(event) {
	let container = document.getElementsByClassName("sidebar")[0];
	if (container == null) {
		container = document.getElementsByClassName("drawer")[0];
	}

	if (container.getAttribute("data-toogle") == "side") {
		container.dataset.toogle = "drawer";
		container.setAttribute("class", "drawer");
		let links = container.getElementsByTagName("a");
		for (const a of links) {
			a.setAttribute("style", "display: block");
		}
	} else {
		container.dataset.toogle = "side";
		container.setAttribute("class", "sidebar");
		let links = container.getElementsByTagName("a");
		for (const a of links) {
			a.setAttribute("style", "display: none");
		}
	}
}
