import { dictionary } from './dictionary.js';

//se importa el diccionario


// funcion mostrar palabras

function showWord(categories) {

    // espacio en donde se va a poner la lista
    const listContainer = document.getElementById('word-list');
    listContainer.innerHTML = ''; 

    // Obtener las palabras de la categoría seleccionada
    const words = dictionary.categories[categories];

    // ver si la categoria (array) tiene palabras 
    if (words && words.length > 0) {
        words.forEach(word => {

            // crear un parrafo cada vez que se encuentra una palabra 

            const wordElement = document.createElement('p');
            wordElement.innerHTML = `${word.english} (${word.spanish}): ${word.example}`;
            listContainer.appendChild(wordElement);
        });
    } else {
        listContainer.innerHTML = 'No hay palabras disponibles para esta categoría.';
    }
}

// cada funcioncs cuando se selecciona un input-radio

document.getElementById('animals').addEventListener('change', function() {
    if (this.checked) {
        showWord('animals'); 
    }
});

document.getElementById('fruits').addEventListener('change', function() {
    if (this.checked) {
        showWord('fruits'); 
    }
});

document.getElementById('colors').addEventListener('change', function() {
    if (this.checked) {
        showWord('colors'); 
    }
});

document.getElementById('physical_descriptions').addEventListener('change', function() {
    if (this.checked) {
        showWord('physical_descriptions'); 
    }
});

document.getElementById('skills').addEventListener('change', function() {
    if (this.checked) {
        showWord('skills'); 
    }
});

document.getElementById('verbs').addEventListener('change', function() {
    if (this.checked) {
        showWord('verbs'); 
    }
});

document.querySelector('.newword').addEventListener('click', function () {
    // Crear el nuevo div flotante
    const floatingDiv = document.createElement('div');
    floatingDiv.className = 'floating-div';

    // Crear el fondo desenfocado (overlay)
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // Contenido del div flotante
    floatingDiv.innerHTML = `
        <button class="close-btn">Cerrar</button>
        <p>Palabra en español:</p>
        <input type="text" class="word1" placeholder="Agrega la palabra en español">
        <p>Palabra en inglés:</p>
        <input type="text" class="word2" placeholder="Agrega la palabra en inglés">
        <p>Ejemplo:</p>
        <input type="text" class="example" placeholder="Agrega un ejemplo">

        <h3>Categorías</h3>
        <div class="div-categories">
            <input type="radio" name="categ" class="category" id="animals">
            <p>Animales</p>
            <input type="radio" name="categ" class="category" id="fruits">
            <p>Frutas</p>
            <input type="radio" name="categ" class="category" id="colors">
            <p>Colores</p>
        </div>
        <div class="div-categories1">
            <input type="radio" name="categ" class="category" id="physical_descriptions">
            <p>Descripciones</p>
            <input type="radio" name="categ" class="category" id="skills">
            <p>Habilidades</p>
            <input type="radio" name="categ" class="category" id="verbs">
            <p>Verbos</p>
        </div>

        <button class="save-btn">Guardar</button>
    `;

    // Añadir el fondo desenfocado y el div flotante al body
    document.body.appendChild(overlay);
    document.body.appendChild(floatingDiv);

    // Cerrar el floating div al hacer clic en el botón de cerrar
    floatingDiv.querySelector('.close-btn').addEventListener('click', function () {
        document.body.removeChild(overlay);
        document.body.removeChild(floatingDiv);
    });

    // Agregar el div al cuerpo
    document.body.appendChild(floatingDiv);

    // Botón cerrar
    floatingDiv.querySelector('.close-btn').addEventListener('click', function () {
        floatingDiv.remove();
    });

    // Botón guardar
    floatingDiv.querySelector('.save-btn').addEventListener('click', function () {
        const inputValue = floatingDiv.querySelector('.word').value;
        if (inputValue.trim() !== '') {
            alert(`Palabra guardada: ${inputValue}`);
        } else {
            alert('Por favor, ingresa una palabra.');
        }
    });
    floatingDiv.querySelector('.save-btn').addEventListener('click', function () {
        const spanish = floatingDiv.querySelector('.word1').value;
        const english = floatingDiv.querySelector('.word2').value;
        const example = floatingDiv.querySelector('.example').value;
        
        if (spanish.trim() === '' || english.trim() === '') {
            alert('Por favor, ingresa la palabra en español e inglés.');
            return;
        }

        // Obtener la categoría seleccionada
        const category = document.querySelector('input[name="categ"]:checked');
        if (!category) {
            alert('Por favor, selecciona una categoría.');
            return;
        }

        // Crear el objeto para la nueva palabra
        const newWord = {
            english: english,
            spanish: spanish,
            example: example
        };

        // Asignar un ID único basado en el tamaño actual del array de la categoría
        newWord.id = dictionary.categories[category.id].length + 1;

        // Agregar la nueva palabra a la categoría
        dictionary.categories[category.id].push(newWord);

        // Mostrar mensaje de éxito
        alert(`Palabra añadida: ${english} (${spanish})`);

        // Cerrar el div flotante
        document.body.removeChild(overlay);
        document.body.removeChild(floatingDiv);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Referencias a los elementos
    const translateButton = document.querySelector('.translate');
    const responseElement = document.getElementById('response');
    const inputWord = document.querySelector('.word');
    const languageRadios = document.querySelectorAll('input[name="words"]'); // Radios de idioma

    // Evento para traducir
    translateButton.addEventListener('click', function () {
        const word = inputWord.value.toLowerCase(); // Palabra ingresada
        if (!word) {
            responseElement.textContent = 'Por favor, introduce una palabra.';
            return;
        }

        // Verificar qué idioma está seleccionado
        let selectedLanguage = null;
        languageRadios.forEach((radio) => {
            if (radio.checked) {
                selectedLanguage = radio.parentNode.classList.contains('english') ? 'english' : 'spanish';
            }
        });

        if (!selectedLanguage) {
            responseElement.textContent = 'Por favor, selecciona un idioma.';
            return;
        }

        // Buscar traducción en tu diccionario
        let translation = null;
        for (const category in dictionary.categories) {
            const words = dictionary.categories[category];
            const wordObj = words.find((entry) =>
                selectedLanguage === 'english'
                    ? entry.spanish.toLowerCase() === word
                    : entry.english.toLowerCase() === word
            );

            if (wordObj) {
                translation = selectedLanguage === 'english' ? wordObj.english : wordObj.spanish;
                break;
            }
        }

        // Mostrar el resultado
        responseElement.textContent = translation
            ? `Traducción: ${translation}`
            : 'No se encontró la palabra en el diccionario.';
    });
});


