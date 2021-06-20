(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

const AddLineInput = (data) => {

    const id = String(generateID(5))
    const mainFormQuestions = document.querySelector('.main-form-questions');
    const newInput = document.createElement('div');
    newInput.setAttribute('class', "row mt-1 align-items-center input-field")
    newInput.innerHTML = `
        <div class="col col-4">
            ${data.question} <sup>${data.isRequired ? '*' : ""}</sup> :
        </div>
        <div class="col col-7">
            <input name=${data.question} type="input" class="form-control" id=${id} required=${data.isRequired} />
        </div>
        <div class="col col-1">
            <i class="fas fa-user-edit edit ${id}" data-bs-toggle="modal" data-bs-target="#editModal"></i>
        </div>
    `
    mainFormQuestions.appendChild(newInput);
}

const AddTextArea = (data) => {
    const id = String(generateID(5))
    const mainFormQuestions = document.querySelector('.main-form-questions');
    const newInput = document.createElement('div');
    newInput.setAttribute('class', 'row mt-1 align-items-center input-field')
    newInput.innerHTML = `
        <div class="col col-11 justify-content-around">
            <label for="question" class="form-label">${data.question} <sup>${data.isRequired ? '*' : ""}</sup> :</label>
            <textarea class="form-control" id=${id} name=${data.question} rows="3" value="" required=${data.isRequired}></textarea>
            <div class="invalid-feedback">
                Please Answer the question.
            </div>
        </div>
        <div class="col col-1 justify-content-center">
            <i class="fas fa-user-edit edit ${id}" data-bs-toggle="modal" data-bs-target="#editModal"></i>
        </div>
    `
    mainFormQuestions.appendChild(newInput);
    console.log("multiple line called")

}

const AddRadioInput = (data) => {
    const id = String(generateID(5))
    const mainFormQuestions = document.querySelector('.main-form-questions');
    const newInput = document.createElement('div');
    newInput.setAttribute('class', 'row mt-1 align-items-center input-field')
    console.log(data.answers)

    const radioOptions = document.createElement('div');
    radioOptions.setAttribute('class', "col col-11 justify-content-center")
    radioOptions.innerHTML = `
    <label class="form-label">${data.question} <sup>${data.isRequired ? "*" : ""}</sup></label>
    `

    data.answers.forEach((answer, index) => {

        radioOptions.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="${data.question}" id="${answer}" value=${answer}>
                <label class="form-check-label" for="${answer}">
                    ${answer}
                </label>
            </label>
            `
    })

    data.includeOther ? radioOptions.innerHTML += `
        <div class="form-check">
                <input class="form-check-input" type="radio" name="${data.question}" id="otherOption" value="other">
                <label class="form-check-label" for="otherOption">
                    Other
                </label>
            </label>
    ` : ""
    newInput.appendChild(radioOptions)
    newInput.innerHTML += `
        <div class="col col-1 justify-content-start">
            <i class="fas fa-user-edit edit ${id}" data-bs-toggle="modal" data-bs-target="#editModal"></i>
        </div>
    `

    mainFormQuestions.appendChild(newInput)
    console.log("radio input are added")
}

const AddCheckbox = (data) => {
    const id = String(generateID(5))
    const mainFormQuestions = document.querySelector('.main-form-questions');
    const newInput = document.createElement('div');
    newInput.setAttribute('class', 'row mt-1 align-items-center input-field')
    console.log(data.answers)

    const checkboxOptions = document.createElement('div');
    checkboxOptions.setAttribute('class', "col col-11 justify-content-center")
    checkboxOptions.innerHTML = `
    <label class="form-label">${data.question} <sup>${data.isRequired ? "*" : ""}</sup></label>
    `

    data.answers.forEach((answer, index) => {

        checkboxOptions.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="${data.question}" id="${answer}" value=${answer}>
                <label class="form-check-label" for="${answer}">
                    ${answer}
                </label>
            </label>
            `
    })

    data.includeOther ? checkboxOptions.innerHTML += `
        <div class="form-check">
                <input class="form-check-input" type="radio" name="${data.question}" id="otherOptions" value="others">
                <label class="form-check-label" for="otherOptions">
                    Other
                </label>
            </label>
    ` : ""

    newInput.appendChild(checkboxOptions)
    newInput.innerHTML += `
        <div class="col col-1 justify-content-start">
            <i class="fas fa-user-edit edit ${id}" data-bs-toggle="modal" data-bs-target="#editModal" ></i>
        </div>
    `

    mainFormQuestions.appendChild(newInput)
    console.log("checkbox input are added")
}

const AddQuestion = (data) => {

    switch (data.answerType) {
        case "One Line":
            console.log("one line")
            AddLineInput(data);
            break;
        case "Multiple Lines":
            AddTextArea(data);
            break;
        case "Radio":
            AddRadioInput(data);
            break;
        case "Checkbox":
            AddCheckbox(data);
            break;
        default:
            break;
    }
    console.log("add question called")
}

//canceling form submit
const QuestionForm = document.querySelector('.question-form');
QuestionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    let answers = []
    let question = document.querySelector('#question').value;
    let on = document.querySelector('.onOrOff').classList.contains('on');
    let isRequired = document.querySelector('#isRequired').checked ? true : false;
    let answerType = document.querySelector('.questionType').value;
    let includeOther = document.querySelector('#includeOtherOption').checked ? true : false;

    document.querySelectorAll('.option').forEach(option => {
        answers.push(option.value);
    })

    const data = { question, on, isRequired, answerType, answers, includeOther }

    console.log(data)
    AddQuestion(data);
    document.querySelector('.question-form').reset();
    document.querySelector('.inputs').style.display = "none"
    document.querySelector('.close').click()

})

// program to generate random strings

// generating unique id for inputs
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateID = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//showing answer fields depending upon question type
const questionType = document.querySelector(".questionType");
questionType.addEventListener('change', (event) => {
    if (event.target.value === "Radio" || event.target.value === "Checkbox") {
        document.querySelector('.inputs').style.display = "block"
    }
    else {
        document.querySelector('.inputs').style.display = "none"
    }
})


//adding options
const addAnother = document.querySelector('.add-another');
addAnother.addEventListener('click', () => {
    let answers = document.querySelector('.answers');
    let answersList = document.querySelectorAll('.answer');
    let length = answersList.length

    let newDiv = document.createElement('div');
    newDiv.setAttribute("class", "row mt-1 answer");
    newDiv.innerHTML = `
    <div class="col col-11">
        <input placeholder="Answer ${length + 1}" type="text" class="options mt-1 form-control" required>
    </div>
    <div class="col col-1 delete">
        <i class="fas fa-trash-alt"></i>
    </div>
    `
    answers.appendChild(newDiv)

})


//deleting options
const answers = document.querySelector('.answers');
answers.addEventListener('click', (event) => {
    if (event.target && event.target.matches("i.fas.fa-trash-alt")) {
        let answersList = document.querySelectorAll('.answer');
        if (answersList.length > 1) {
            answersList[answersList.length - 1].remove()
        }
    }
})

//onOrOff
const onOrOff = document.querySelector('.onOrOff');
onOrOff.addEventListener('click', () => {
    onOrOff.classList.toggle('on');
    onOrOff.classList.toggle('off');
    const span = document.querySelector('.onOrOff span');
    if (onOrOff.classList.contains('on')) {
        span.textContent = "ON"
    }
    else {
        span.textContent = "OFF"
    }
})

const sort_element = document.querySelector('.main-form-questions');
const sortable = Sortable.create(sort_element)