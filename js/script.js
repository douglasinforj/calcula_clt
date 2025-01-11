document.getElementById("calculo-form").addEventListener("submit", function (e){
    e.preventDefault();

    //recebendo valores do usuário
    const salario = parseFloat(document.getElementById("salario").value);
    const tempo = parseFloat(document.getElementById("tempo").value);
    const tipoDesligamento = document.getElementById("tipo-desligamento").value;
    const feriasVencidas = parseInt(document.getElementById("ferias").value) || 0;
    const saldoFGTS = parseFloat(document.getElementById("fgts").value) || 0;

    //temas para calculo
    let avisoPrevio = 0;
    let multaFGTS =0;
    let feriasProporcionais = 0;
    let decimoProporcional = 0;

    //Calculando aviso prévio e multa de fgts se aplicavel
    if (tipoDesligamento === "sem-justa-causa"){
        avisoPrevio = salario;
        multaFGTS = saldoFGTS * 0.4;
    }


    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ` 
    <h2>Resultado</h2>
    <p><strong>Aviso Prévio:</strong>R$ ${avisoPrevio.toFixed(2)}</p>
    `

})