/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function aggiungiScelta(scelta){

    scelta.classList.add("selezionato");
    scelta.classList.remove("non-selezionato");

    for(let box of boxes_liberi){

        if(box == scelta || box.dataset.questionId != scelta.dataset.questionId){
            continue;
        }

        box.classList.remove("selezionato");
        box.classList.add("non-selezionato");

    }

    scelta.removeEventListener('click', click);
    boxes_occupati.push(scelta);

    const indiceDaLevare = boxes_liberi.indexOf(scelta);
    boxes_liberi.splice(indiceDaLevare, 1);

    scelta.querySelector(".checkbox").src = "./images/checked.png";

}

function rimuoviScelta(box){

    const indiceDaLevare = boxes_occupati.indexOf(box);
    boxes_occupati.splice(indiceDaLevare, 1);

    boxes_liberi.push(box);
    box.addEventListener('click', click);

    box.querySelector(".checkbox").src = "./images/unchecked.png";

}

function click(event){

    const scelta = event.currentTarget;

    for(let box of boxes_occupati){

        if(scelta.dataset.questionId == box.dataset.questionId)
            rimuoviScelta(box);

    }

    aggiungiScelta(scelta);

    if(fineQuiz()){

        for(let box of boxes_liberi){
            box.removeEventListener('click', click);
        }

        mostraRisultato();

    }

}

function inizia(){

    for(let box of boxes){

        box.addEventListener('click', click);
        boxes_liberi.push(box);

    }

    document.getElementById("risultato").classList.add("hidden");

}

function fineQuiz(){

    let c = 0;

    for(let box of boxes_occupati){
        c++;
    }

    if(c == 3){
        return true;
    }

    return false;
}

function mostraRisultato(){

    const risultato = {
        blep: 0,
        happy: 0,
        sleeping: 0,
        dopey: 0,
        burger: 0,
        cart: 0,
        nerd: 0,
        shy: 0,
        sleepy: 0,
    }

    for(let box of boxes_occupati){
        risultato[box.dataset.choiceId]++;
    }

    const vincitore = theWinnerIs(risultato);

    const titolo_risultato = document.querySelector("#risultato h1");
    const descrizione_risultato = document.querySelector("#risultato p");
    titolo_risultato.textContent = RESULTS_MAP[vincitore].title;
    descrizione_risultato.textContent = RESULTS_MAP[vincitore].contents;

    document.getElementById("risultato").classList.remove("hidden");

}

function theWinnerIs(risultato){

    let max = 0;
    let vincitore = "";

    for(personality in risultato){
        if(risultato[personality] > max){

            vincitore = personality;
            max = risultato[personality]; 

        }
    }

    return vincitore;
}

function ricominciaQuiz(event){

    let box = undefined;

    for(box of boxes_occupati){
        box.querySelector(".checkbox").src = "./images/unchecked.png";
        box.classList.remove("selezionato");
    }

    for(box of boxes_liberi){
        box.classList.remove("non-selezionato");
    }

    boxes_occupati.splice(0, 3);
    boxes_liberi.splice(0, 24);

    inizia();
    window.scrollTo(0,0);

}

/* ---------------------------------------------------------------- */

const boxes_liberi = [];
const boxes_occupati = [];
const ricominciaButt = document.querySelector("#risultato div");
const boxes = document.querySelectorAll(".choice-grid div");

inizia();
ricominciaButt.addEventListener('click', ricominciaQuiz);