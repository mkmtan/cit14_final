document.addEventListener("DOMContentLoaded", function ()   {
    const formProgress = document.getElementById("formProgress");
    const inputFields = [
        {   element: document.getElementById("FullNameInput"), validate: validateFullName },
        {   element: document.getElementById("ageInput"), validate: validateAge },
        {   element: document.getElementById("emailInput"), validate: validateEmail },
        {   element: document.getElementById("dobInput"), validate: validateDateOfBirth },
    ];
    
    function validateFullName(input)    {
        return /^[A-Za-z\s]+$/.test(input.value);
    }
    function validateAge(input) {
        const age = parseInt(input.value, 10);
        return !isNaN(age) && age > 0 && age <= 100;
    }
    function validateEmail(input)   {
        return /\S+@\S+\.\S+/.test(input.value);
    }
    function validateDateOfBirth(input) {
        return input.value.trim() !=="";
    }
    function updateProgressBar()    {
        const validInputCount = inputFields.reduce((count, field) => {
            if (field.validate(field.element))  {
                return count + 1;
            }
            return count;
        }, 0 );
        const progress = (validInputCount / inputFields.length) * 100;
        formProgress.style.width = progress + "%";
        formProgress.innerText = progress + "%";
    }

    function validateInputs()   {
        inputFields.forEach((field) => {
            const input = field.element;
            if (input.value.trim() === ""){
                input.classList.remove("is-invalid", "is-valid");
            } else if (field.validate(input)) {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            } else {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            }
        });
        updateProgressBar();
    }
    inputFields.forEach((field) => {
        field.element.addEventListener("input", validateInputs);
    });

    validateInputs();
});

//TAN, Ma. Khella M. | CITCS-2F Group A