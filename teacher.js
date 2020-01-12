var teacherAudio = document.querySelector('#tracherAudio');
var teacherAudioPlayBack = document.querySelector('#learnSpeed');
var samplePointsArr = [];
var loadFile = (target) => {
    // var target = event.currentTarget;
    var file = target.files[0];
    var reader = new FileReader();
    if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            teacherAudio.setAttribute('src', e.target.result);
            teacherAudio.playbackRate = Number(teacherAudioPlayBack.value);
            document.querySelector('#samplePoints').disabled = false;
        }
        reader.readAsDataURL(file);
    }
};

var samplePoints = () => {
    if (teacherAudio.paused) {
        teacherAudio.play();
    }
    samplePointsArr.push(teacherAudio.currentTime);
};

var endSamplePoints = () => {

}