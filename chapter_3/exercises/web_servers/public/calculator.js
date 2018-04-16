function Cereal(sugar, protein, fibre) {
    this.sugar = sugar;
    this.protein = protein;
    this.fibre = fibre;
}

//remember, usually better to define a new method on the prototype (rater than in the constructor)
Cereal.prototype.calculate = function(quantity) {
    return [
        (this.sugar * quantity),
        (this.protein * quantity),
        (this.fibre * quantity)
    ];
};

//define our data in such a way that will make it easy to grab a paritucular cereal instance based on the value of the select box
const cereals = {
    cheerios : new Cereal(8, 1.4, 2.4),
    miniwheats : new Cereal(10, 2, 4.3)
};

//we want our code to run when the user submits the form. jQuery has an easy way to listen for when that happens

$("#calculator").submit(function(e) {
    //preventDefault is something we can use to literally prevent the
    //default behaviour of <form> when it is submitted. in this case,
    //that is a page refresh. We want to prevent that (we don't have
    //a back-end server to talk to here) and simply run our own code.
    e.preventDefault();
    //first, get the values from the form
    var cerealChosen = $('select').val();
    var quantity = $('#serving').val();
    //now that we have the values, do the calculation
    //we need to do the calculation using the calculate() method,
    //**on the corresponding cereal instance**
    //because of the way we built the cereals object above,
    //we can refer to the specific Cereal object we want by
    //using bracket notation
    var result = cereals[cerealChosen].calculate(quantity);
    //result is an array of the values we need, all we need to
    //do now is update the html with those values
    $(".item#sugar p").html(result[0]);
    $(".item#protein p").html(result[1]);
    $(".item#fibre p").html(result[2]);
    //the above jQuery seletors are pretty complex, might want to spend
    //a few minutes breaking them down to see what they're doing
});

