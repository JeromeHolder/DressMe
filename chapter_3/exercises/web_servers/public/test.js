function Cereal(sugar, protein, fibre) {
    this.sugar = sugar;
    this.protein = protein;
    this.fibre = fibre;
}

Cereal.prototype.calculate = function(quantity) {
    return [
        (this.sugar * quantity),
        (this.protein * quantity),
        (this.fibre * quantity)
    ]
}

const cereals = {
    cheerios = new Cereal(8, 10, 12),
    miniwheats = new Cereal(6, 8, 10)
}


$('calculator').submit(function(e) {
    e.preventDefault();
    
    let cerealChosen = $('select').val();
    let quantity = $('#serving').val();
    let result = cereals[cerealChosen].calculate(quantity);

    $('.item#sugar p').html(result[0]);
    $('.item#protein p').html(result[1]);
    $('.item#fibre p').html(result[2]);
});