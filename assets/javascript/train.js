


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
var firstTrainX = "";
var trainFreq = "";

//capture button click
$("#submit-data").on("click", function(eventObject) {
    eventObject.preventDefault();

    trainName = $("#trainName").val().trim();
    trainDest = $("#destination").val().trim();
    firstTrainX = $("#firstTrainTime").val().trim();
    trainFreq = $("#frequency").val().trim();

    dataRef.ref().push({
    	trainName: trainName,
    	trainDest: trainDest,
    	firstTrainX: firstTrainX,
    	trainFreq: trainFreq,
    	dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //return false;
});

//
// append data for html
dataRef.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().trainDest);
	console.log(childSnapshot.val().firstTrainX);
	console.log(childSnapshot.val().trainFreq);
	console.log(childSnapshot.key);

	var trainName = childSnapshot.val().trainName;
	var trainDest = childSnapshot.val().trainDest;
	var firstTrainX = childSnapshot.val().firstTrainX;
	var trainFreq = childSnapshot.val().trainFreq;
	var  minsAway= 0;
	var  trainArr= 0;

	$("#trainInfo").append("<tr><td>" + trainName + "</td><td>" + trainDest+"</td><td>" + trainFreq+"</td><td>" +firstTrainX+  "</td><td>" + minsAway+"</td></tr>");
});


