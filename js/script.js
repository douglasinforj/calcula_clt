document.getElementById("calculo-form").addEventListener("submit", function (e){
    e.preventDefault();

    //recebendo valores do usuário
    const salario = parseFloat(document.getElementById("salario").value);
    const tempo = parseFloat(document.getElementById("tempo").value);
    const tipoDesligamento = document.getElementById("tipo-desligamento").value;
    const feriasVencidas = parseInt(document.getElementById("ferias").value) || 0;
    const saldoFGTS = parseFloat(document.getElementById("fgts").value) || 0;

    //Validando campos

    if (isNaN(salario) || salario <= 0){
        alert("Por favor, insira um salário válido")
    }

    if (isNaN(tempo) || salario <= 0){
        alert("Por favor, insira o tempo de trabalho válido")
    }





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

    //Calcular IRRF
    function calcularIRRF(salario) {
        let irrf = 0;

        if (salario <= 2259.20) {
            irrf = 0;
        }else if (salario <= 2826.65){
            irrf = salario * 0.075 - 169.44
        }else if(salario <= 3751.05){
            irrf = salario * 0.15 - 381.44
        }else if(salario <= 4664.68){
            irrf = salario * 0.225 - 662.77
        } else{
            irrf = salario * 0.227 - 896.00      //Salario acima de 4664.68
        }
        return Math.max(0, irrf);  //garantindo que não seja negativo
    }




    //Calculo Descontos
    const inss = calcularINSS(salario);
    const irrf = calcularIRRF(salario);

    //total
    const total = avisoPrevio + multaFGTS + 
    feriasVencidas + 
    feriasProporcionais + 
    decimoProporcional - 
    inss -
    irrf;


    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ` 
    <h2>Resultado</h2>
    <p><strong>Aviso Prévio:</strong>R$: ${avisoPrevio.toFixed(2)}</p>
    <p><strong>Multa:</strong>R$ ${multaFGTS.toFixed(2)}
    <p><strong>Ferias Proporcionais:<strong>R$ ${feriasProporcionais.toFixed(2)}</p>
    <p><strong>13º Proporcional:</strong> R$ ${decimoProporcional.toFixed(2)}</p>
    <p><strong>INSS</strong>R$ ${inss.toFixed(2)} </p>
    <p><strong>IRRF</strong>R$ ${irrf.toFixed(2)}</p>
    <p><strong>Total a Receber:</strong> R$ ${total.toFixed(2)}</p>
    `
    // mostrar botão de impressão aoós calculos
    document.getElementById("imprimir-btn").style.display = "inline"

    /*Função para imprimir relatório
    document.getElementById("imprimir-btn").addEventListener("click", function (){
        const resultadoDiv = document.getElementById("resultado").innerHTML;
        const janelaImpressao = window.open('', '', 'height=600, width=800');
        janelaImpressao.document.write('<html><head><title>Relatório de Rescisão</title>');
        janelaImpressao.document.write('</head><body>');
        janelaImpressao.document.write('<h1>Relatório de Rescisão Trabalhista</h1>');
        janelaImpressao.document.write(resultadoDiv);
        janelaImpressao.document.write('<button onclick="window.print()">Imprimir</button>');
        janelaImpressao.document.write('</body></html>');
        janelaImpressao.document.close();
    }) */

    
    //Função para imprimir relatório como estilização css
    document.getElementById("imprimir-btn").addEventListener("click", function () {
        const resultadoDiv = document.getElementById("resultado").innerHTML;
        const janelaImpressao = window.open('', '', 'height=600,width=800');
        
        janelaImpressao.document.write(`
          <html>
            <head>
              <title>Relatório de Rescisão</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  line-height: 1.6;
                  color: #333;
                }
                h1 {
                  text-align: center;
                  color: #007BFF;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 10px;
                  text-align: left;
                }
                th {
                  background-color: #f4f4f4;
                  font-weight: bold;
                }
                tr:nth-child(even) {
                  background-color: #f9f9f9;
                }
                tr:hover {
                  background-color: #f1f1f1;
                }
                button {
                  display: block;
                  margin: 20px auto;
                  padding: 10px 20px;
                  font-size: 16px;
                  background-color: #007BFF;
                  color: #fff;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                }
                button:hover {
                  background-color: #0056b3;
                }
              </style>
            </head>
            <body>
              <h1>Relatório de Rescisão Trabalhista</h1>
              ${resultadoDiv}
              <button onclick="window.print()">Imprimir</button>
            </body>
          </html>
        `);
        
        janelaImpressao.document.close();
      });


})