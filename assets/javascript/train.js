$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyBY-a5xUx-MLIWzHYrfCNt-UbP2fvtbkcc",
        authDomain: "train-scheduler-67d80.firebaseapp.com",
        databaseURL: "https://train-scheduler-67d80.firebaseio.com",
        projectId: "train-scheduler-67d80",
        storageBucket: "train-scheduler-67d80.appspot.com",
        messagingSenderId: "596082708835"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var trainDestination = "";
    var trainFrequency = 0;
    var trainTime = "";
    var clickCounter = 1;

    $("#add-train").on("click", function(event){
        event.preventDefault();
        if ($("#train-input").val(),$("#destination-input").val(),$("#time-input").val(), $("#frequency-input").val() === "") {
            alert("All input fields are mandotary. Enter data in all fields and click the submit button.");

        } else if ($("#time-input").val() > 24) {
            alert("Pls enter the 24 hr time format and time cannot be greater than 24.");
        } else {

            trainName = $("#train-input").val().trim();
            trainDestination = $("#destination-input").val().trim();
            trainTime = $("#time-input").val().trim();
            trainFrequency = $("#frequency-input").val().trim(); 

            // console.log("Input Values");
            // console.log(trainName);
            // console.log(trainDestination);
            // console.log(trainTime);
            // console.log(trainFrequency);

            var trainDetail = {
                name : trainName,
                destination : trainDestination,
                frequency : trainFrequency,
                time : trainTime
            };

            database.ref().push(trainDetail);

            // console.log("Temporary object train values");
            // console.log(trainDetail.name);
            // console.log(trainDetail.destination);
            // console.log(trainDetail.frequency);
            // console.log(trainDetail.time);

            alert("A new train details has been added.."); 
        }
    });

    database.ref().on("child_added", function(childSnapshot, prevChildKey){
        console.log("Hello");
        console.log(childSnapshot.val());
        
        var trainNumber = clickCounter++;
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;

        console.log("database train value");
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);

        // console.log(convertedDate.format("MM/DD/YY"));
        // console.log(convertedDate.format("MMM Do, YYYY hh:mm:ss"));
        console.log("--------------------");

        // moment().format()
        // console.log(convertedDate.toNow());
        // console.log(convertedDate.diff(moment(), "years"));
        // console.log(convertedDate.diff(moment(), "months"));
        // console.log(convertedDate.diff(moment(), "days"));
        console.log("--------------------");
        


        // var currentTime = moment();

        // var trainTimeConvert = currentTime(trainTime, "HH:mm").subtract(1, "years");
        // console.log("trainTimeConvert", + trainTimeConvert);


        // var diffTime  = currentTime.diff(trainTimeConvert, "minutes");
        // console.log(currentTime.diff(trainTimeConvert, "minutes");)
        // console.log(diffTime);

        // var remainder = diffTime % trainFrequency;
        // console.log("Remainder: " + remainder);

        // var timeRemain = trainFrequency - remainder;
        // console.log("Time Remain: " + timeRemain);

        // var newTrainTime = moment().add(timeRemain, "minutes");
        // var newTrainTimeFormat = moment(newTrainTime).format("HH:mm");

        var row = $(("<tr class = 'tableRow'><td>" + trainNumber + "</td><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainTime + "</td><td>" + trainFrequency  + "</td><td>" + ""  + "</td><td>" + "" + "</td></tr>"));

        $(".tableBody").append(row);
    });        
});
  