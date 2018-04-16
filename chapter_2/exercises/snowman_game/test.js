  // Declare variables
  var pos = 0;
  var num = -1;
  var i = -1;
  var graf = "Thise ise a test";
   
  // Search the string and counts the number of e's
  while (pos != -1) {
    pos = graf.indexOf("e", i + 1);
    num += 1;
    i = pos;
  }
   
  // Write the response to the page
  console.log(graf+"\n")
  console.log("There were " + num + " e's in that paragraph.");
//-->