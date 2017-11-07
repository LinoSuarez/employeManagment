
$("#submitButton").on("click", function(event){
event.preventDefault();
var name = $("#nameInput").val().trim();
var role = $("#roleInput").val().trim();
var date = $("#dateInput").val().trim();
var rate = $("#rateInput").val().trim().replace(/,/g, '');
pushData(name, role, date, rate);
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function addElementTable(name, role, date, rate){
    var monthsWorked = monthDiff(new Date(date));
    var totalBilled = rate * monthsWorked;

    var tr = $("<tr>");

    tr.append($("<td>").text(name));
    tr.append($("<td>").text(role));
    tr.append($("<td>").text(date));
    
    tr.append($("<td>").text(monthsWorked));
    tr.append($("<td>").text(numberWithCommas(rate)));
    tr.append($("<td>").text(numberWithCommas(totalBilled)));

    $("#employeeTable").append(tr);

}
var config = {
    apiKey: "AIzaSyDSwitaHejKRbfkJXlB1APafhRsYJXWiQU",
    authDomain: "in-class-demo-c8814.firebaseapp.com",
    databaseURL: "https://in-class-demo-c8814.firebaseio.com",
    projectId: "in-class-demo-c8814",
    storageBucket: "in-class-demo-c8814.appspot.com",
    messagingSenderId: "753704861720"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();


  function pushData (name, role, date, rate){
    var monthsWorked = monthDiff(new Date(date));
    var totalBilled = 10;

    
    database.ref().push({
        name: name,
        role: role,
        date: date,
        rate: rate,
        monthsWorked: monthsWorked,
        totalBilled: totalBilled

    })}

  
    database.ref().on('child_added', function(data) {
        addElementTable(data.val().name,
        data.val().role,
        data.val().date,
        data.val().rate);
      });
      
      function monthDiff(d1) {
        d2 = new Date();
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() ;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
   
    
    
