var a = document.querySelector('#myaudio');
var level;
var repeatFor;
var manualPause = false;
var currentLearningPoints;
var resumeDelayTimer;
var currentPoint = 0;
var canRewind = false;
var prev = () => {
    if (canRewind) {
        canRewind = false;
        pausePlaying();
        currentPoint--;
        if (currentPoint >= 0) {
            console.log('p', currentPoint);
            var nextStop = currentLearningPoints[currentPoint];
            a.currentTime=nextStop;
        }
        resumePlaying();
    }
};

var next = () => {
    if (canRewind) {
        canRewind = false;
        pausePlaying();
        currentPoint++;
        if (currentPoint < currentLearningPoints.length) {
            console.log('n', currentPoint);
            var nextStop = currentLearningPoints[currentPoint];
            a.currentTime=nextStop;
        }
        resumePlaying();
    }
};

var pause = () => {
    if (a.paused) {
        resumePlaying();
    } else {
        pausePlaying();
    }
}

var pausePlaying = () => {
    a.pause();
    clearTimeout(resumeDelayTimer);
    manualPause = true;
};

var resumePlaying = () => {
    manualPause = false;
    startPlaying();
}

var stop = () => {
    a.pause();
    a.currentTime = 0;
};

var playbackRate = 1;
var start = () => {
    currentPoint = 0;
    a.currentTime = 0;
    level = Number(document.querySelector('#level').value);
    repeatFor = Number(document.querySelector('#repeatFor').value);
    playbackRate = 1;
    a.playbackRate = playbackRate;
    currentLearningPoints = samplePointsArr; // learningPoints[`step${level}`];
    startPlaying();
}
var startPlaying = () => {
    if (manualPause) {
        return;
    }
    if (currentPoint < currentLearningPoints.length) {
        var section = currentLearningPoints[currentPoint +1] - currentLearningPoints[currentPoint];
        section = Number(((section * 1000) / playbackRate).toFixed());
        currentPoint++;
        console.log('bump', currentPoint);
        canRewind = false;
        a.play()
        .then(() => {
            if (!a.paused) {
                setTimeout(() => {
                    a.pause();
                    resumeAfter(section * repeatFor);
                    canRewind = true;
                }, section);
            }
        })
    }
};
var resumeAfter = (delayFor) => {
    resumeDelayTimer = setTimeout(() => {
        startPlaying();
    }, delayFor);
}