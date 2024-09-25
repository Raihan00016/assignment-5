
let accountBalance = 5500;


function updateBalanceDisplay() {
    document.querySelector('.stat-value').textContent = accountBalance + ' BDT';
}


function getCurrentTime() {
    const now = new Date();
    return now.toString(); 
}


function addToHistory(amount, cause) {
    const historyList = document.getElementById('history-list');

    
    const historyItem = document.createElement('div');
    historyItem.classList.add('p-4', 'bg-white', 'rounded', 'shadow');

    historyItem.innerHTML = `
        <p class="font-bold">${amount} Taka is Donated for ${cause}, Bangladesh</p>
        <p>Date: ${getCurrentTime()}</p>
    `;

    
    historyList.prepend(historyItem);
}


function handleDonation(cause, inputId, displayId) {
    const donationInput = document.getElementById(inputId);
    const donationAmount = parseInt(donationInput.value);

    
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }
    if (donationAmount > accountBalance) {
        alert('Insufficient funds. Please enter an amount less than or equal to your balance.');
        return;
    }

    
    accountBalance -= donationAmount;
    updateBalanceDisplay();

    
    const donationDisplay = document.getElementById(displayId);
    const currentAmount = parseInt(donationDisplay.textContent.split(' ')[0]);
    donationDisplay.textContent = (currentAmount + donationAmount) + ' BDT';

    
    donationInput.value = '';

    
    addToHistory(donationAmount, cause);
}


document.getElementById('btn-donate-1').addEventListener('click', function () {
    handleDonation('Flood at Noakhali', 'btn-noakhali', 'input-noakhali');
});

document.getElementById('btn-donate-2').addEventListener('click', function () {
    handleDonation('Flood Relief in Feni', 'btn-feni', 'input-feni');
});

document.getElementById('btn-donate-3').addEventListener('click', function () {
    handleDonation('Injured in Quota Movement', 'btn-quota', 'input-quota');
});

function switchToHistory() {
    document.getElementById('history-section').classList.remove('hidden');
}

document.querySelector('.history-button').addEventListener('click', switchToHistory);

updateBalanceDisplay();
