$(document).ready(function(){

var firebaseConfig = {
    apiKey: "AIzaSyCbntqNOv9TNuHW4iYIrN08LV6TfKNj4lc",
    authDomain: "first-project-test-f34fd.firebaseapp.com",
    databaseURL: "https://first-project-test-f34fd.firebaseio.com",
    projectId: "first-project-test-f34fd",
    storageBucket: "",
    messagingSenderId: "524056946388",
    appId: "1:524056946388:web:943795c00c420431"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);
  var database = firebase.database();
  // global variables for bringing in moment
  var hour = moment().hour();
  var minute = moment().minutes();
  var current = moment(hour + ":" + minute, "HH:mm");
  var current = current.format("hh:mm A")
  var minAway = 0;


  $("p").text("The Current Time Is: " + current);
 
  
  $('#add-train-btn').on('click', function (event) {
    event.preventDefault();
  
    var tName = $('#name-input').val().trim();
    var tDest = $('#dest-input').val().trim();
    var tStart = moment($('#start-input').val().trim(), 'HH:mm').format('X');
    var tFreq = parseInt$('#freq-input').val().trim();
  
    var newTrain = {
      name: tName,
      dest: tDest,
      start: tStart,
      freq: tFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP,
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
    alert('You have added a new train, \n look at the table to see the schedule');
  
    $('#name-input').val('');
    $('#dest-input').val('');
    $('#start-input').val('');
    $('#freq-input').val('');
  });
  
  database.ref().on('child_added', function (childSnapShot) {
    console.log(childSnapShot.val());
  
    // var Name = childSnapShot.val().name;
    // var Dest = childSnapShot.val().dest;
    // var Start = childSnapShot.val().start;
    // var Freq = childSnapShot.val().freq;
  
    var frequency =  childSnapShot.val().freq;
    var firstTrain = childSnapShot.val().start;
    var trainName = childSnapShot.val().name;
    var destination= childSnapShot.val().dest;
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");;   
    var now = moment();
    var diffTime = moment().diff(moment(firstTrainConverted),"minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrain = moment(nextTrain).format("hh:mm A");

   var newRow = $("<tr>").append(
     $("<td>").text(trainName),
     $("<td>").text(destination),
     $("<td>").text(frequency),
     $("<td>").text(nextTrain),
     $("<td>").text(tMinutesTillTrain),
     );

   $(".table > tbody").append(newRow);
// $('#trainSchedule > tbody').append('<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>');
});



  });
  


  