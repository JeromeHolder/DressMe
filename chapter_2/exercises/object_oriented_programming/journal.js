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

Journal.prototype.displayEntries = function() {
    console.log(this.name);
    for(let i = 0; i < this.entry.length; i++) {
        console.log(this.entry[i]);
    }
};

const entry1 = new Entries(
    'First',
    'This is a test',
    'Jerome'
);

const entry2 = new Entries(
    'Second',
    'This is also a test',
    'Jerome'
);

const myJournal = new Journal('Jerome');

myJournal.addEntry(entry1);
myJournal.addEntry(entry2);

myJournal.displayEntries();