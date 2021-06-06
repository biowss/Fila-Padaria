let fila = document.getElementById('fila');
let timer = setInterval(remove, 10000);

let queue = [
  {
    name: "Caíque Moura",
    amount: 3,
  },
  {
    name: "Laíne Andrade",
    amount: 1,
  },
  {
    name: "Bruno Castro",
    amount: 2,
  },
  {
    name: "Ednaldo Pereira",
    amount: 27,
  },
];

/* --- Inicializar site com a fila pronta. --- */

onload = start();

function start() {
  queue.map((item, index) => {  
    let row = fila.insertRow(index);  
    let cell = row.insertCell(0);
    cell.className = 'p-2 m-1';

    if(item.amount == 1) {
      cell.innerHTML = `<p> ${item.name} </p>` +
                          `<span>Quantidade: ${item.amount} pão</span>`                         
    }
    else {      
      cell.innerHTML = `<p> ${item.name} </p>` +
                          `<span>Quantidade: ${item.amount} pães</span>`    
    }
  })
}

/* --- Função add ativada pelo botão: --- */

function add() {
  let name = document.getElementById('name').value;
  let amount = document.getElementById('quantity').value;
  let size = queue.length;

  if(validateFields(name, amount)) {
    // Se não tiver pessoas na fila, aciona o timer ao adicionar a pessoa.
    if(size == 0) { 
      clearInterval(timer);
      timer = setInterval(remove, 10000);      
    }
    
    // Converte amount em inteiro depois de validar para adicionar no array queue
    amount = parseInt(amount);

    // Adiciona na queue
    queue.push({name, amount});
  
    // Adiciona na tabela
    let row = fila.insertRow(size);  
    let cell = row.insertCell(0);
    cell.className = 'p-2 m-1';
    if(amount == 1) {
      cell.innerHTML = `<p> ${name} </p>` +
                         `<span>Quantidade: ${amount} pão</span>`                         
    }
    else {      
      cell.innerHTML = `<p> ${name} </p>` +
                         `<span>Quantidade: ${amount} pães</span>`    
    }

    if(amount == 71) {
      queue = queue.reverse();

      fila.innerHTML = "";
      start();
    }
  }
}

/* --- Função remove, trigada a cada 10 segundos --- */

function remove() {  
  let size = queue.length;

  if(size > 0) {
    queue.shift();
    fila.deleteRow(0);
  }
  else {    
    clearInterval(timer);
  }
}

/* --- Função de validação de campos: --- */

function validateFields(name, amount) {
  let nameError = document.querySelectorAll('.error')[0];
  let quantityError = document.querySelectorAll('.error')[1];  
  let fieldRequired = '<span>*Campo Obrigatório!</span>';
  let numberRequired = '<span>*Quantidade precisa ser um número!</span>';
  
  if(name == '' || amount == '' || isNaN(amount)) {
    if(name == '') {
      nameError.innerHTML = fieldRequired;      
    }
    else {
      nameError.innerHTML = '';
    }

    if(item.amount == '') {
      quantityError.innerHTML = fieldRequired;      
    } 
    else if(isNaN(item.amount)) {
      quantityError.innerHTML = numberRequired;
    }
    else {
      quantityError.innerHTML = '';
    }

    return false;
  }  
  else {
    nameError.innerHTML = '';
    quantityError.innerHTML = '';
    
    return true;    
  }
}