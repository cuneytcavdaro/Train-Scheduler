$(document).ready(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyC1UJ0Rd5MqFWySYBM2_CUnCOlUXuP-Tn0",
        authDomain: "train-b1f12.firebaseapp.com",
        databaseURL: "https://train-b1f12.firebaseio.com",
        projectId: "train-b1f12",
        storageBucket: "train-b1f12.appspot.com",
        messagingSenderId: "764226486980",
        appId: "1:764226486980:web:ffb03fc3c4011f30"
     };
    
      firebase.initializeApp(firebaseConfig);
      var database = firebase.database();

      var tName;
      var tDestination;
      var tTime;
      var tFrequency;  
    
    $("#trainBtn").on("click",function(event){
        event.preventDefault();
         tName = $("#train-name").val().trim();
         tDestination = $("#train-destination").val().trim();
         tTime = moment($("#train-time").val().trim(), "hh:mm").subtract(1, "years").format("X");
         tFrequency = $("#train-frequency");
      
        
        database.ref().push(
        {
            tName: tName,
            tDestination: tDestination,
            tTime: tTime,
            tFrequency: tFrequency,
    
        });
        
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-frequency").val("");
        return false;

    });
    database.ref().on("child_added", function(snapshot){
        console.log(snapshot.val());
        console.log(snapshot.val().tName);
        console.log(snapshot.val().tDestination);
        console.log(snapshot.val().tTime);
        console.log(snapshot.val().tFrequency);

   
        var tTime = snapshot.val().tTime;
        var tFrequency = snapshot.val().tFrequency;
        var timeCurrent = moment();
        console.log(timeCurrent);

        var firstTime = moment(tTime, "hh:mm").subtract(1,"years");
        console.log(firstTime);

        var difference = moment().diff(moment(firstTime), "minutes");
        console.log("time difference: " + difference);

        var remainder = difference % tFrequency;
        console.log(remainder);

        var minutesAway = tFrequency - remainder;
        console.log(minutesAway);

        var nextTime = moment().add(minutesAway, "minutes");
        console.log("at: " + moment(nextTime).format("hh:mm"));

        var nextTrain = moment(nextTime).format("hh:mm");
 
        $("#trainTable").append("<tr><td>" + snapshot.val().tName + "</td><td>" + snapshot.val().tDestination + "</td><td>" + tFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway+ "</td></tr>");
    },function(errorObject){
        console.log("errors handled: " + errorObject.code);
    });

    });
