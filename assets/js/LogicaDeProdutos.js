cont = 2
y = 2
var contTMP = 0

function LogicaCampos(index) {
    
    // Obtém o valor do produto selecionado para o índice atual
    const produtoSelecionado = document.getElementById(`produto-${index}`).value;

    // Seleciona o contêiner principal para os campos dinâmicos
    const camposDinamicos = document.getElementById(`campos-dinamicos-${index}`);
    
    // Verifica se já existe um contêiner específico para o índice e cria caso não exista
    let contêinerProduto = document.getElementById(`produto-campos-${index}`);
    if (!contêinerProduto) {
        contêinerProduto = document.createElement('div');
        contêinerProduto.id = `produto-campos-${index}`;
        camposDinamicos.appendChild(contêinerProduto);
    }

    // Limpa apenas o contêiner do índice atual
    contêinerProduto.innerHTML = '';

    

    if (produtoSelecionado === "Tradicional") {
        contTMP = index;
        
        // Para Ovo Tradicional, 2 cascas e sem recheio
        for (let i = 1; i <= 2; i++) {
            
            //console.log(cont)
            //console.log("Cont:" + cont)
            contêinerProduto.innerHTML += `
                <h5>Sabor da casca ${i}</h5>
                <div class="box-user">
                    <input type="text" name="casca_${contTMP}" id="casca-input_${contTMP}" placeholder=" " oninput="filtrarCascas(${contTMP})" required autocomplete="off">
                    <label>Casca ${i}</label>
                    <div id="casca-dropdown_${contTMP}" class="dropdown"></div>
                </div>
                <div class="box-user">
                <h5>Tipo do chocolate da casca ${i}</h5>
                <select id="tipo-chocolate-${contTMP}" name="tipo-chocolate-${contTMP}" required>
                    <option value="" disabled selected>Selecione um tipo de chocolate</option>
                    <option value="Ao leite">Ao leite</option>  
                    <option value="Meio amargo">Meio amargo</option>    
                    <option value="Branco">Branco</option>                                                               
                </select>
            </div>
            `;
            contTMP += 1
        }
        contêinerProduto.innerHTML += ` 
            <h5>Observação</h5>
            <div class="box-user">
                    <input type="text" name="observacao-${index}" id="observacao-${index}" placeholder=" ">
                    <label>Observação</label>
            </div>
            <h5>Peso do ovo</h5>
             <div class="box-user">
                <select id="peso-${index}" name="peso-${index}" required>
                    <option value="" disabled selected>Selecione um peso</option>
                    <option value="150">150g</option>  
                    <option value="250">250g</option>    
                    <option value="350">350g</option>  
                    <option value="400">400g</option>   
                    <option value="500">500g</option> 
                    <option value="750">750g</option>   
                    <option value="1kg">1kg</option>                                                             
                </select>
            </div>
        `;
        y += 1
    } else if (produtoSelecionado === "Tradicional recheado") {
        contTMP = index;
        for (let i = 1; i <= 2; i++) {
            
            contêinerProduto.innerHTML += `
                <h5>Sabor da casca ${i}</h5>
                <div class="box-user">
                    <input type="text" name="casca_${contTMP}" id="casca-input_${contTMP}" placeholder=" " oninput="filtrarCascas(${contTMP})" required autocomplete="off">
                    <label>Casca ${i}</label>
                    <div id="casca-dropdown_${contTMP}" class="dropdown"></div>
                </div>
                <h5>Sabor do recheio ${i}</h5>
                <div class="box-user">
                    <input type="text" name="recheio_${contTMP}" id="recheio-input_${contTMP}" placeholder=" " oninput="filtrarRecheios(${contTMP})" required autocomplete="off">
                    <label>Recheio ${i}</label>
                    <div id="recheio-dropdown_${contTMP}" class="dropdown"></div>
                </div>
                <h5>Tipo do chocolate da casca ${i}</h5>
                <div class="box-user">
                <select id="tipo-chocolate-${contTMP}" name="tipo-chocolate-${contTMP}">
                    <option value="" disabled selected>Selecione um tipo de chocolate</option>
                    <option value="Ao leite">Ao leite</option>  
                    <option value="Meio amargo">Meio amargo</option>    
                    <option value="Branco">Branco</option>                                                               
                </select>
            </div>
            `;
            contTMP += 1
        }
        
        contêinerProduto.innerHTML += ` 
        <h5>Observação</h5>
            <div class="box-user">
                    <input type="text" name="observacao-${index}" id="observacao-${index}" placeholder=" ">
                    <label>Observação</label>
            </div>
        <h5>Peso do ovo</h5>
         <div class="box-user">
            <select id="peso-${index}" name="peso-${index}" required>
                <option value="" disabled selected>Selecione um peso</option>
                <option value="150">150g</option>  
                <option value="250">250g</option>    
                <option value="350">350g</option>  
                <option value="400">400g</option>   
                <option value="500">500g</option>  
                <option value="750">750g</option>  
                <option value="1kg">1kg</option>                                                             
            </select>
        </div>
    `;
        
    } else if (produtoSelecionado === "Colher") {
        contêinerProduto.innerHTML += `
        <h5>Sabor da casca ${index}</h5>
            <div class="box-user">
                <input type="text" name="casca_${index}" id="casca-input_${index}" placeholder=" " oninput="filtrarCascas(${index})" required autocomplete="off">
                <label>Cascas</label>
                <div id="casca-dropdown_${index}" class="dropdown"></div>
            </div>
            <h5>Sabor do recheio ${index}</h5>
            <div class="box-user">
                    <input type="text" name="recheio_${index}" id="recheio-input_${index}" placeholder=" " oninput="filtrarRecheios(${index})" required autocomplete="off">
                    <label>Recheio</label>
                    <div id="recheio-dropdown_${index}" class="dropdown"></div>
            </div>
            <h5>Tipo do chocolate da casca ${index}</h5>
            <div class="box-user">
                <select id="tipo-chocolate-${index}" name="tipo-chocolate-${index}">
                    <option value="" disabled selected>Selecione um tipo de chocolate</option>
                    <option value="Ao leite">Ao leite</option>  
                    <option value="Meio amargo">Meio amargo</option>    
                    <option value="Branco">Branco</option>                                                               
                </select>
            </div>
            <h5>Observação</h5>
            <div class="box-user">
                    <input type="text" name="observacao-${index}" id="observacao-${index}" placeholder=" ">
                    <label>Observação</label>
            </div>
            <h5>Peso do ovo</h5>
            <div class="box-user">
                <select id="peso-${index}" name="peso-${index}" required>
                    <option value="" disabled selected>Selecione um peso</option>
                    <option value="150">150g</option>  
                    <option value="250">250g</option>    
                    <option value="350">350g</option>  
                    <option value="400">400g</option>   
                    <option value="500">500</option>   
                    <option value="750">750g</option> 
                    <option value="1kg">1kg</option>                                                             
                </select>
            </div>
        `;
    } else if (produtoSelecionado === "Caixa de bombom") {
        contêinerProduto.innerHTML = `
        <h5>Tipo do bombom</h5>
            <div class="box-user">
                <select id="tipo-bombom-${index}" name="tipo-bombom-${index}" required>
                    <option value="" disabled selected>Selecione o tipo do bombom</option>
                    <option value="Maciço">Maciço</option>  
                    <option value="Recheado">Recheado</option>                                                                 
                </select>
            </div>
            <div id="conteudo-adicional-${index}" class="conteudo-adicional"></div>
        `;
        

        let tipoBombom = '';
        const selectElement = document.getElementById(`tipo-bombom-${index}`);

        // Adiciona um listener para capturar mudanças no primeiro select
        selectElement.addEventListener('change', (event) => {
            tipoBombom = event.target.value; 
            console.log(tipoBombom, index); 

            // Limpa somente o contêiner de conteúdo adicional
            const conteudoAdicional = document.getElementById(`conteudo-adicional-${index}`);
            conteudoAdicional.innerHTML = '';

            // Verifica o valor de tipoBombom
            if (tipoBombom === "Maciço") {
                // Adiciona o select de "conteudo-bombom"
                conteudoAdicional.innerHTML = `
                        <h5>Tipo de recheio</h5>
                        <div class="box-user">
                            <select id="conteudo-bombom-${index}" name="conteudo-bombom-${index}" required>
                                <option value="" disabled selected>Selecione o tipo</option>
                                <option value="Sortido">Sortido</option>  
                                <option value="Especifico">Específico</option>                                                                 
                            </select>
                        </div>
                `;

        
                document.addEventListener("change", (event) => {

                    const conteudoAdicional = document.getElementById(`conteudo-adicional-${index}`);
                    if (event.target && event.target.matches(`[id^="conteudo-bombom-"]`)) {
                        const index = event.target.id.split("-").pop(); // Pega o índice do ID
                        const conteudoAdicional = document.getElementById(`conteudo-adicional-${index}`);
                        const ConteudoBombom = event.target.value;
                        console.log(ConteudoBombom);
                        conteudoAdicional.innerHTML = "";

                


                        // Limpa novamente o conteúdo adicional subsequente
                        conteudoAdicional.innerHTML = `
                        <h5>Tipo de recheio</h5>
                            <div class="box-user">
                                <select id="conteudo-bombom-${index}" name="conteudo-bombom-${index}">
                                    <option value="Sortido" ${ConteudoBombom === "Sortido" ? "selected" : ""}>Sortido</option>
                                    <option value="Especifico" ${ConteudoBombom === "Especifico" ? "selected" : ""}>Específico</option>
                                </select>
                            </div>
                        `;
                    
                    
                    if (ConteudoBombom === "Sortido") {
                        // Adiciona o select para "peso"
                        conteudoAdicional.innerHTML += `
                        <h5>Observação</h5>
                        <div class="box-user">
                                <input type="text" name="observacao-${index}" id="observacao-${index}" placeholder=" ">
                                <label>Observação</label>
                        </div>
                        <h5>Peso da caixa de bombom</h5>
                            <div class="box-user">
                                <select id="peso-${index}" name="peso-${index}" required>
                                    <option value="" disabled selected>Selecione um peso</option>
                                    <option value="150">150g</option>  
                                    <option value="250">250g</option>    
                                    <option value="350">350g</option>  
                                    <option value="400">400g</option>   
                                    <option value="500">500g</option>  
                                    <option value="750">750g</option>   
                                    <option value="1kg">1kg</option>                                                             
                                </select>
                            </div>
                        `;
                        y += 1
                    } else {
                        // Adiciona o select para "tipo-sabor-bombom"
                        conteudoAdicional.innerHTML += `
                        <h5>Sabor do bombom</h5>
                            <div class="box-user">
                                <select id="tipo-sabor-bombom-${index}" name="tipo-sabor-bombom-${index}" required>
                                    <option value="" disabled selected>Selecione o sabor do bombom</option>
                                    <option value="Crocante branco">Crocante branco</option>  
                                    <option value="Crocante preto">Crocante preto</option> 
                                    <option value="Coco">Coco</option>   
                                    <option value="Preto e branco">Preto e Branco</option>    
                                    <option value="Amendoin">Amendoin</option>                                                             
                                </select>
                            </div>
                            <h5>Observação</h5>
                            <div class="box-user">
                                    <input type="text" name="observacao-${index}" id="observacao-${index}" placeholder=" ">
                                    <label>Observação</label>
                            </div>
                                                    <h5>Peso da caixa de bombom</h5>
                            <div class="box-user">
                                <select id="peso-${index}" name="peso-${index}" required>
                                    <option value="" disabled selected>Selecione um peso</option>
                                    <option value="150">150g</option>  
                                    <option value="250">250g</option>    
                                    <option value="350">350g</option>  
                                    <option value="400">400g</option>   
                                    <option value="500">500g</option>   
                                    <option value="750">750g</option> 
                                    <option value="1kg">1kg</option>                                                             
                                </select>
                            </div>
                        `;
                        y += 1
                    }
                }});
            } else if (tipoBombom === "Recheado") {
                // Caso tipoBombom não seja "Maciço", cria dinamicamente um input de recheio
                conteudoAdicional.innerHTML = `
                <h5>Recheio do bombom</h5>
                    <div class="box-user">
                        <input type="text" name="recheio_${index}" id="recheio-input_${index}" placeholder=" " oninput="filtrarRecheios(${index})" required autocomplete="off">
                        <label>Recheio ${index}</label>
                        <div id="recheio-dropdown_${index}" class="dropdown"></div>
                    </div>
                    <h5>Observação</h5>
                    <div class="box-user">
                            <input type="text" name="observacao-${index}" id="observacao-${index}" placeholder=" ">
                            <label>Observação</label>
                    </div>
                                            <h5>Peso da caixa de bombom</h5>
                            <div class="box-user">
                                <select id="peso-${index}" name="peso-${index}">
                                    <option value="" disabled selected>Selecione um peso</option>
                                    <option value="150">150g</option>  
                                    <option value="250">250g</option>    
                                    <option value="350">350g</option>  
                                    <option value="400">400g</option>   
                                    <option value="500">500g</option> 
                                    <option value="750">750g</option>   
                                    <option value="1kg">1kg</option>                                                             
                                </select>
                            </div>
                `;
                y += 1
                
            }
        });
    }
}







