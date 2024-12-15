// *** Función que verifica si los 4 campos tiene una entrada válida ***
function checkInputs() {
    let inputCounter = 0;
    for (let a = 0; a < 4; a++) {
        var inputField = document.getElementById(`campo-${a}`);
        if (inputField.checkValidity() && inputField.value.trim() != '') {
            inputCounter++
        }
    }
    console.clear();
    if (inputCounter == 4) {
        console.log(`Todos los campos están completos`);
    } else {
        console.log(`¡Faltan completar ${4 - inputCounter} campos con entradas validas!`);
    }
}


// ------------ Eventos en los que ejecutan la función ------------ 
document.addEventListener("DOMContentLoaded", checkInputs);
window.addEventListener('load', checkInputs);
window.addEventListener('resize', checkInputs);
window.addEventListener('click', checkInputs);
window.addEventListener('keydown', checkInputs);


// ------------ Eventos en los que se ejecuta la función validando en "tiempo real" ------------ 
for (let a = 0; a < 4; a++) {
    var inputField = document.getElementById(`campo-${a}`);
    if (inputField) {
        inputField.addEventListener('input', checkInputs); //  Ejecuta la función cuando el campo de la entrada es mofiicado
        inputField.addEventListener('change', checkInputs); // Ejecuta la función cuando el campo de la entrada es mofiicado
    }
}
