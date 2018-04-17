function Journal(name) {
    this.name = name;
    this.entry = [];
}

function Entries(title, content, author) {  
        this.title = title,
        this.content = content,
        this.author = author   
}

Journal.prototype.addEntry = function(Entries) {
    this.entry.push(Entries);
};

Journal.prototype.formatEntry = function(entry) {
    console.log(entry)
    return `<article>
        <h3> ${entry.title} </h3>
        <p> ${entry.content} </p>
        <p> ${entry.author} </p>
    </article>`;
};

Journal.prototype.displayEntries = function() {
    console.log(this.name);
    var parent = $('#past');
    this.entry.forEach(function(entry) {        
        parent.append(Journal.prototype.formatEntry(entry));
    });
};



// const entry1 = new Entries(
//     'First',
//     'This is a test',
//     'Jerome'
// );

// const entry2 = new Entries(
//     'Second',
//     'This is also a test',
//     'Jerome'
// );

const myJournal = new Journal('Jerome');

$(document).ready(function(e) {
    $('#entry').submit(function(e){
        e.preventDefault();
        let newEntry = new Entries(
            $('#titleinput').val(),
            $('#contentinput').val(),
            $('#authorinput').val()
        )
        myJournal.addEntry(newEntry);
        this.reset();
        $('#submitmessage').html('Your entry has been submitted');
    })    
    
    $('#past').submit(function(e) {
        e.preventDefault();
        myJournal.displayEntries();
    })
});
