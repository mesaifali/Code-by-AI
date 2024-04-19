document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const passwordLengthInput = document.getElementById('password-length');
    const includeUppercaseCheckbox = document.getElementById('include-uppercase');
    const includeLowercaseCheckbox = document.getElementById('include-lowercase');
    const includeNumbersCheckbox = document.getElementById('include-numbers');
    const includeSymbolsCheckbox = document.getElementById('include-symbols');
    const generateBtn = document.getElementById('generate-btn');

    const characters = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    const generatePassword = () => {
        let charSet = '';
        const passwordLength = passwordLengthInput.value;

        if (includeUppercaseCheckbox.checked) {
            charSet += characters.uppercase;
        }

        if (includeLowercaseCheckbox.checked) {
            charSet += characters.lowercase;
        }

        if (includeNumbersCheckbox.checked) {
            charSet += characters.numbers;
        }

        if (includeSymbolsCheckbox.checked) {
            charSet += characters.symbols;
        }

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            password += charSet[randomIndex];
        }

        passwordInput.value = password;
    };

    const copyPassword = () => {
        passwordInput.select();
        document.execCommand('copy');
    };

    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);
});