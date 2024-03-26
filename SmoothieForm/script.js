// Event listener to wait for DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    const form = document.getElementById("smoothie-form");

    // Add event listener for form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather selected options
        const flavor = document.querySelector('input[name="flavor"]:checked').value;
        const protein = document.getElementById("protein").checked;
        const spinach = document.getElementById("spinach").checked;
        const honey = document.getElementById("honey").checked;
        const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(topping => topping.value);

        // Create Smoothie object
        const smoothie = new Smoothie(flavor, protein, spinach, honey, toppings);

        // Display order details
        const smoothieOutput = document.getElementById("smoothie-output");
        smoothieOutput.innerHTML = smoothie.getBill();
    });
});

// Smoothie class definition
class Smoothie {
    constructor(flavor, protein, spinach, honey, toppings) {
        this.flavor = flavor;
        this.protein = protein;
        this.spinach = spinach;
        this.honey = honey;
        this.toppings = toppings;
    }

    // Method to get the cost of selected flavor
    getFlavorCost() {
        // Define pricing for flavors
        const flavorPrices = {
            strawberry: 3.00,
            banana: 2.50,
            mango: 3.50,
            pineapple: 3.00,
            cherry: 3.00,
            tropical: 3.50
        };

        return flavorPrices[this.flavor] || 0.00; // Return the price or default to 0
    }

    // Method to get selected extras and their costs
    getExtras() {
        let extras = '';
        if (this.protein) extras += 'Protein ($1.00)';
        if (this.spinach) extras += `${extras ? ', ' : ''}Spinach ($1.00)`;
        if (this.honey) extras += `${extras ? ', ' : ''}Honey ($0.50)`;
        return extras;
    }

    // Method to get selected toppings
    getToppings() {
        return this.toppings.join(', ');
    }

    // Method to calculate total cost
    getTotalCost() {
        const flavorCost = this.getFlavorCost();
        const extrasCost = (this.protein ? 1.00 : 0) + (this.spinach ? 1.00 : 0) + (this.honey ? 0.50 : 0);
        return (flavorCost + extrasCost).toFixed(2);
    }

    // Method to generate the bill with all details
    getBill() {
        let bill = `<p>Flavor: ${this.flavor} ($${this.getFlavorCost().toFixed(2)})</p>`;
        
        const extras = this.getExtras();
        if (extras) {
            bill += `<p>Extras: ${extras}</p>`;
        }

        const toppings = this.getToppings();
        if (toppings) {
            bill += `<p>Toppings: ${toppings}</p>`;
        }

        bill += `<h4>Bill: $${this.getTotalCost()}</h4>`;
        return bill;
    }
}
