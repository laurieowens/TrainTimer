  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4epD9MrhBlD5dqh3wgH5OTRj1cTdQDKM",
    authDomain: "trainschedule-fad72.firebaseapp.com",
    databaseURL: "https://trainschedule-fad72.firebaseio.com",
    storageBucket: "trainschedule-fad72.appspot.com",
    messagingSenderId: "753612370157"
  };
  firebase.initializeApp(config);

  //create variable to reference database
var dataRef = firebase.database();

//set initial values for table
var trainName = "";
var trainDest = "";
var firstTrainX = 0;
var trainFreq = 0;
var currentTime = moment();
var trainArrival=0;
var  minsAway= 0;
//var firstTrainXconvert = moment(firstTrainX, "hh:mm").subtract(1,"years");
    //console.log("1stTrainX "+ firstTrainXconvert);
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));



//capture button click
$("#submit-data").on("click", function(eventObject) {
    eventObject.preventDefault();

    trainName = $("#trainName").val().trim();
    trainDest = $("#destination").val().trim();
    firstTrainX = $("#firstTrainX").val();
    trainFreq = $("#frequency").val().trim();
   
       dataRef.ref().push({
    	trainName: trainName,
    	trainDest: trainDest,
    	firstTrainX: firstTrainX,
    	trainFreq: trainFreq,
    	dateAdded: firebase.database.ServerValue.TIMESTAMP
    
//$('input.className:form-control').val("");
    });

   
           $('#myForm').trigger("reset");
//$('#trainName').empty();
//console.log('#trainName');
    return false;
});


//
// append data for html
dataRef.ref().on("child_added", function(childSnapshot) {
	
	var trainName = childSnapshot.val().trainName;
	var trainDest = childSnapshot.val().trainDest;
	var firstTrainX = childSnapshot.val().firstTrainX;
	var trainFreq = childSnapshot.val().trainFreq;
	//var  minsAway= 0;
	//var  trainArrival= 0;


    var firstTrainXconvert = moment(firstTrainX, "hh:mm").subtract(1,"years");
    console.log("train convert " +firstTrainXconvert);
    var firstToNowTX= moment().diff(moment(firstTrainXconvert), "minutes");
    console.log(firstToNowTX);

var tRemainder = firstToNowTX % trainFreq;
    console.log(tRemainder);

     var minsAway = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minsAway);

    // Next Train
    var trainArrival = moment().add(minsAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainArrival).format("hh:mm"));
 






	$("#trainInfo").append("<tr><td>" + trainName + "</td><td>" + trainDest+"</td><td>" + trainFreq+"</td><td>" + moment(trainArrival).format("hh:mm")+  "</td><td>" + minsAway+"</td></tr>");
//$('input.classname:form-control').val("");
});


