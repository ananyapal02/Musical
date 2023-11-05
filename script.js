console.log("Welcome to Musical");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('./Musical-Items/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals (ft. Laura Brehm)", filePath: "./Musical-Items/songs/1.mp3", coverPath: "./Musical-Items/covers/1.jpg"},
    {songName: "Cielo - Huva-Huva", filePath: "./Musical-Items/songs/2.mp3", coverPath: "./Musical-Items/covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "./Musical-Items/songs/3.mp3", coverPath: "./Musical-Items/covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart", filePath: "./Musical-Items/songs/4.mp3", coverPath: "./Musical-Items/covers/4.jpg"},
    {songName: "Janji Heroes - Tonight (ft. Johning)", filePath: "./Musical-Items/songs/5.mp3", coverPath: "./Musical-Items/covers/5.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "./Musical-Items/songs/6.mp3", coverPath: "./Musical-Items/covers/6.jpg"},
    {songName: "Janji Heroes - Tonight (ft. Johning)", filePath: "./Musical-Items/songs/7.mp3", coverPath: "./Musical-Items/covers/7.jpg"},
    {songName: "Warriyo - Mortals (ft. Laura Brown)", filePath: "./Musical-Items/songs/8.mp3", coverPath: "./Musical-Items/covers/8.jpg"},
    {songName: "Janji Heroes - Tonight (ft. Johning)", filePath: "./Musical-Items/songs/9.mp3", coverPath: "./Musical-Items/covers/9.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart", filePath: "./Musical-Items/songs/10.mp3", coverPath: "./Musical-Items/covers/10.jpg"}
]

songItems.forEach((element, i)=>{
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//audioElement.play()

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=> {
    //console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`./Musical-Items/songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9) {
        songIndex=0;
    }
    else {
        songIndex+=1;
    }
    audioElement.src=`./Musical-Items/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0) {
        songIndex=0;
    }
    else {
        songIndex-=1;
    }
    audioElement.src=`./Musical-Items/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})