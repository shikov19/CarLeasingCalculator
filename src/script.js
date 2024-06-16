document.addEventListener('DOMContentLoaded', function() {
    const carTypeSelect = document.getElementById('car-type');
    const carValueSlider = document.getElementById('car-value-slider');
    const carValueInput = document.getElementById('car-value');
    const leasePeriodSlider = document.getElementById('lease-period-slider');
    const leasePeriodInput = document.getElementById('lease-period');
    const downPaymentSlider = document.getElementById('down-payment-slider');
    const downPaymentInput = document.getElementById('down-payment');

    const totalCostElement = document.getElementById('total-cost');
    const downPaymentAmountElement = document.getElementById('down-payment-amount');
    const monthlyInstallmentElement = document.getElementById('monthly-installment');
    const interestRateElement = document.getElementById('interest-rate');

    function getInterestRate() {
        return carTypeSelect.value === 'brand-new' ? 2.99 / 100 : 3.7 / 100;
    }

    function calculateLeasingDetails() {
        const carValue = parseFloat(carValueInput.value);
        const leasePeriod = parseInt(leasePeriodInput.value);
        const downPaymentPercentage = parseFloat(downPaymentInput.value);
        const annualInterestRate = getInterestRate();
        const monthlyInterestRate = annualInterestRate / 12;

        const downPaymentAmount = carValue * (downPaymentPercentage / 100);
        const amountFinanced = carValue - downPaymentAmount;

        const monthlyInstallment = (amountFinanced * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));
        const totalCost = (monthlyInstallment * leasePeriod) + downPaymentAmount;

        totalCostElement.textContent = `€${totalCost.toFixed(2)}`;
        downPaymentAmountElement.textContent = `€${downPaymentAmount.toFixed(2)}`;
        monthlyInstallmentElement.textContent = `€${monthlyInstallment.toFixed(2)}`;
        interestRateElement.textContent = `${(annualInterestRate * 100).toFixed(2)}%`;
    }

    carTypeSelect.addEventListener('change', calculateLeasingDetails);

    carValueSlider.addEventListener('input', function() {
        carValueInput.value = carValueSlider.value;
        calculateLeasingDetails();
    });

    carValueInput.addEventListener('input', function() {
        carValueSlider.value = carValueInput.value;
        calculateLeasingDetails();
    });

    downPaymentSlider.addEventListener('input', function() {
        downPaymentInput.value = downPaymentSlider.value;
        calculateLeasingDetails();
    });

    downPaymentInput.addEventListener('input', function() {
        downPaymentSlider.value = downPaymentInput.value;
        calculateLeasingDetails();
    });

    leasePeriodSlider.addEventListener('input', function() {
        leasePeriodInput.value = leasePeriodSlider.value;
        calculateLeasingDetails();
    });

    leasePeriodInput.addEventListener('input', function() {
        leasePeriodSlider.value = leasePeriodInput.value;
        calculateLeasingDetails();
    });

    calculateLeasingDetails();
});
