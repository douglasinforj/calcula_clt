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

    //Regras mais detalhadas de calculos

    //Calcular INSS
    function calcularINSS(salario) {
        let inss = 0;

        if (salario <= 1412){
            inss = salario * 0.075;
        } else if (salario <= 2666.68){
            inss = 1412 * 0.075 + (salario - 1412) * 0.09;
        } else if (salario <= 4000.03) {
            inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salario - 2666.68) * 0.12;
        } else if (salario <= 7786.02) {
            inss = 1412 * 0.075 + 
            (2666.68 - 1412) * 0.09 +
            (4000.03 - 2666.68) * 0.12 +
            (salario - 4000.03) * 0.14;
        } else{
            inss = 908.86  //Teto do Inss de contribuição. 
        }
        return inss;
    }




    //Calculo Descontos
    const inss = calcularINSS(salario);

    //total
    const total = avisoPrevio + multaFGTS + feriasVencidas + feriasProporcionais + decimoProporcional;


    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ` 
    <h2>Resultado</h2>
    <p><strong>Aviso Prévio:</strong>R$: ${avisoPrevio.toFixed(2)}</p>
    <p><strong>Multa:</strong>R$ ${multaFGTS.toFixed(2)}
    <p><strong>Ferias Proporcionais:<strong>R$ ${feriasProporcionais.toFixed(2)}</p>
    <p><strong>13º Proporcional:</strong> R$ ${decimoProporcional.toFixed(2)}</p>
    <p><strong>INSS</strong>R$ ${inss.toFixed(2)} </p>
    <p><strong>Total a Receber:</strong> R$ ${total.toFixed(2)}</p>
    `

})