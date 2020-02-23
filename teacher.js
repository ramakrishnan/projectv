var teacherAudio = document.querySelector('#tracherAudio');
var teacherAudioSource = document.querySelector('#teacherAudioSource');
var teacherAudioPlayBack = document.querySelector('#learnSpeed');
// var samplePointsArr = [0];
// var samplePointsArr = JSON.parse("[0,3.545815,6.065446,7.696052,10.269152,12.099853,15.336606,17.382497,19.488204,22.261011,23.458668,24.582202,26.188096,27.715172,29.881216,30.675791,31.945096,33.125044,34.438547,36.166062,38.131838,39.632317,40.872546,42.238312,44.139394,45.078772,46.891513,48.103437,49.692667,49.977324]")
// var samplePointsArr = JSON.parse("[0,3.545815,6.155399999999998,7.696052,10.269152,12.099853,15.336606,17.382497,19.488204,22.261011,23.458668,24.582202,26.188096,27.715172,29.881216,30.675791,31.945096,33.125044,34.438547,36.166062,38.131838,39.632317,40.872546,42.238312,44.139394,45.078772,46.891513,48.103437,49.692667,49.977324]")
var samplePointsArr = JSON.parse("[0,3.545815,6.155399999999998,7.696052,10.269152,12.099853,15.336606,17.382497,19.488204,22.261011,23.458668,24.582202,26.188096,27.715172,29.8412,30.675791,31.8651,33.125044,34.438547,36.166062,38.131838,39.632317,40.872546,42.238312,44.139394,45.078772,46.891513,48.103437,49.692667,49.977324]")
var loadFile = (target) => {
    // var target = event.currentTarget;
    var file = target.files[0];
    var reader = new FileReader();
    if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            teacherAudioSource.setAttribute('src', e.target.result);
            teacherAudio.playbackRate = Number(teacherAudioPlayBack.value);
            document.querySelector('#samplePoints').disabled = false;
        }
        reader.readAsDataURL(file);
    }
};

var startTeacherPlay = () => {
    teacherAudio.play();
};

var pauseTeacherPlay = () => {
    teacherAudio.pause();
}

var resetTeacherSampling = () => {
    teacherAudio.stop();
    samplePointsArr = [0];
};

var samplePoints = () => {
    teacherAudio.playbackRate = Number(teacherAudioPlayBack.value);
    // if (teacherAudio.paused) {
        samplePointsArr.push(teacherAudio.currentTime);
        // teacherAudio.play();
    // } else {
        // teacherAudio.pause();
    // }
};
var startPoint = 0;
var endPoint = 1;
var tempEndTime = Number(samplePointsArr[endPoint].toFixed(4))
var review = () => {
    document.querySelector('#nosample').textContent = samplePointsArr.length;
    document.querySelector('#endR').textContent = samplePointsArr.length;
    document.querySelector('#startR').textContent = startPoint;
    var startTime = samplePointsArr[startPoint];
    playPortion(startTime, tempEndTime);
};

var nextReview = () => {
    startPoint = endPoint;
    endPoint = startPoint + 1;
    tempEndTime = Number(samplePointsArr[endPoint].toFixed(4))
    review();
}

var finalize = () => {
    samplePointsArr[endPoint] = tempEndTime;
};

var correctEnd = (dir) => {
    if (dir === '-') {
        tempEndTime = tempEndTime - 0.0100;
    } else {
        tempEndTime = tempEndTime + 0.0100;
    }
    tempEndTime = Number(tempEndTime.toFixed(4));
}
var playPortion = (startTime, endTime) => {
    teacherAudio.currentTime = startTime;
    teacherAudio.play()
    .then(() => {
        setTimeout(() => {
            teacherAudio.pause();
        }, (endTime - startTime) * 1000)
    })
}