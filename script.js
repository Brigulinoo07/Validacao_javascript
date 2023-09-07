//Adicionando máscara ao telefone fixo:
function MascaraTelefone(tel) {
     // Remove caracteres não numéricos
    var v = tel.value.replace(/\D/g, '');
    var formattedValue = '';

    if (v.length >= 1) {
        formattedValue = '(' + v.substring(0, 2) + ')';
    }

    if (v.length > 2) {
        formattedValue += ' ' + v.substring(2, 6);
    }

    if (v.length > 6) {
        formattedValue += '-' + v.substring(6, 10);
    }

    tel.value = formattedValue;
}

// Adicionando máscara ao celular:
function MascaraCelular(cel) {
     // Remove caracteres não numéricos
    var v = cel.value.replace(/\D/g, '');
    var formattedValue = '';

    if (v.length >= 1) {
        formattedValue = '(' + v.substring(0, 2) + ')';
    }

    if (v.length > 2) {
        formattedValue += ' ' + v.substring(2, 7);
    }

    if (v.length > 7) {
        formattedValue += '-' + v.substring(7, 11);
    }

    cel.value = formattedValue;
}


//Adicionando máscara ao CPF:
function MascaraCPF(cpf) {
     // Remove caracteres não numéricos
    var v = cpf.value.replace(/\D/g, '');
    var formattedValue = '';

    if (v.length >= 1) {
        formattedValue = v.substring(0, 3);
    }

    if (v.length > 3) {
        formattedValue += '.' + v.substring(3, 6);
    }

    if (v.length > 6) {
        formattedValue += '.' + v.substring(6, 9);
    }

    if (v.length > 9) {
        formattedValue += '-' + v.substring(9, 11);
    }

    cpf.value = formattedValue;
}


//Adicionando máscara ao RG:
function MascaraRG(rg){
    
    // Remove caracteres não numéricos, exceto o X (maiúsculo):
    var v = rg.value.replace(/[^\dX]/g, ''); 
    var formattedValue = '';

    if (v.length >= 1) {
        formattedValue = v.substring(0, 2);
    }

    if (v.length > 2) {
        formattedValue += '.' + v.substring(2, 5);
    }

    if (v.length >= 5) {
        formattedValue += '.' + v.substring(5, 8);
    }

    if (v.length >= 8) {
        formattedValue += '-' + v.substring(8, 9);
    }

    rg.value = formattedValue;
}

//Adicionando máscara ao CEP:
function MascaraCEP(cep) {
     // Remove caracteres não numéricos
    var v = cep.value.replace(/\D/g, ''); 
    var formattedValue = '';

    if (v.length > 5) {
        formattedValue = v.substring(0, 5) + '-' + v.substring(5, 8);
    } else {
        formattedValue = v;
    }

    cep.value = formattedValue;
}


$("#cep").blur(function(){

    var cep = this.value.replace(/[^0-9]/, "");
    
    if(cep.length != 8){
        return false;
    }
    
    var url = "https://viacep.com.br/ws/"+cep+"/json/";
    
    $.getJSON(url, function(dadosRetorno){
            $("#endereco").val(dadosRetorno.logradouro);
            $("#bairro").val(dadosRetorno.bairro);
            $("#cidade").val(dadosRetorno.localidade);
            $("#estado").val(dadosRetorno.uf);

    });
});

//Validando CPF inserido:
function validarCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validarForm()
{
    var nome = document.getElementById('nome').value
    var endereco = document.getElementById('endereco').value
    var bairro = document.getElementById('bairro').value
    var cep = document.getElementById('cep').value.replace(/[^0-9]/, "")
    var cidade = document.getElementById('cidade').value
    var estado = document.getElementById('estado').value
    var telefone = document.getElementById('telefone').value
    var celular = document.getElementById('celular').value
    var rg = document.getElementById('rg').value.replace(/\.|\-/g, "")
    var cpf = document.getElementById('cpf').value.replace(/\.|\-/g, "")

    var url = "https://viacep.com.br/ws/"+cep+"/json/";

    if(nome != "")
    {
        console.log('Nome Válido! \nQuantidade de Caracteres: ' + nome.length)
    }else{
        console.log('Preencha o campo \'Nome\'')
    }

    if(telefone != "")
    {
        console.log('Telefone Válido!')
    }else{
        console.log('Preencha o campo \'Telefone\'')
    }

    if(celular != "")
    {
        console.log('Celular Válido!')
    }else{
        console.log('Preencha o campo \'Celular\'')
    }

    if(rg != "")
    {
        console.log('RG Válido!')
    }else{
        console.log('Preencha o campo \'RG\'')
    }

    if(cpf != "")
    {
        if(validarCPF(cpf)){
            console.log('CPF Válido!')
        }else{
            console.log('CPF Inválido!')
        }
            
    }else{
        console.log('Preencha o campo \'CPF\'')
    }

    if(cep.length == 8)
    {
        $.getJSON(url, function(dadosRetorno){
            try{
                if(typeof dadosRetorno.complemento != "undefined"){
                    console.log('CEP Válido!')
                }else{
                    console.log('CEP não existe!')
                }
            }catch(ex){}
        });
    }else{
        console.log('Campo \'CEP\' está vázio ou é inválido, preencha para validar os campos de endereço!')
        return false
    }

    if(endereco != "")
    {
        $.getJSON(url, function(dadosRetorno){
            if(endereco == dadosRetorno.logradouro){
                console.log('Endereço Válido!')
            }else{
                console.log('Endereço não está de acordo com o CEP!')
            }
        });
    }else{
        console.log('Preencha o campo \'Endereço\'')
    }

    if(bairro != "")
    {
        $.getJSON(url, function(dadosRetorno){
            if(bairro == dadosRetorno.bairro){
                console.log('Bairro Válido!')
            }else{
                console.log('Bairro não está de acordo com o CEP!')
            }
        });
    }else{
        console.log('Preencha o campo \'Bairro\'')
    }

    if(cidade != "")
    {
        $.getJSON(url, function(dadosRetorno){
            if(cidade == dadosRetorno.localidade){
                console.log('Cidade Válida!')
            }else{
                console.log('Cidade não está de acordo com o CEP!')
            }
        });
    }else{
        console.log('Preencha o campo \'Cidade\'')
    }

    if(estado != "")
    {
        $.getJSON(url, function(dadosRetorno){
            if(estado == dadosRetorno.uf){
                console.log('Estado Válido!')
            }else{
                console.log('Estado não está de acordo com o CEP!')
            }
        });
    }else{
        console.log('Preencha o campo \'Estado\'')
    }
}