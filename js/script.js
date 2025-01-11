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

    // Calcular as ferias proporcionais
    feriasProporcionais = (salario / 12) * tempo;

    //Calcular 13º salário proporcional
    decimoProporcional = (salario / 12) * tempo;

    //total
    const total = avisoPrevio + multaFGTS + feriasVencidas + feriasProporcionais + decimoProporcional;


    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ` 
    <h2>Resultado</h2>
    <p><strong>Aviso Prévio:</strong>R$: ${avisoPrevio.toFixed(2)}</p>
    <p><strong>Multa:</strong>R$ ${multaFGTS.toFixed(2)}
    <p><strong>Ferias Proporcionais:<strong>R$ ${feriasProporcionais.toFixed(2)}</p>
    <p><strong>13º Proporcional:</strong> R$ ${decimoProporcional.toFixed(2)}</p>
    <p><strong>Total a Receber:</strong> R$ ${total.toFixed(2)}</p>
    `

})