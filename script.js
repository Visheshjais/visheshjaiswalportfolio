/* ================= THEME TOGGLE ================= */

/* Get the theme toggle button from the navbar */
const themeBtn = document.getElementById("themeToggle");

/* Add click event to toggle between dark mode and light mode */
themeBtn.addEventListener("click", () => {

/* Toggle the "light-mode" class on body */
document.body.classList.toggle("light-mode");

/* change icon depending on theme */

if(document.body.classList.contains("light-mode")){
themeBtn.textContent = "🌙";  /* Show moon icon in light mode */
}else{
themeBtn.textContent = "☀️"; /* Show sun icon in dark mode */
}

});


/* ================= NAVBAR ACTIVE LINK ================= */

/* Select all sections of the page */
const sections = document.querySelectorAll("section");

/* Select all navbar links */
const navLinks = document.querySelectorAll(".nav-links a");

/* Run this logic whenever the user scrolls */
window.addEventListener("scroll", () => {

let current = "";

/* Loop through each section to determine which section is currently visible */
sections.forEach(section => {

const sectionTop = section.offsetTop - 150;  /* Adjust offset for navbar */
const sectionHeight = section.clientHeight;

/* If the scroll position reaches this section */
if(pageYOffset >= sectionTop){
current = section.getAttribute("id"); /* Get section id */
}

});

/* Highlight the active navbar link */
navLinks.forEach(link => {

link.classList.remove("active");

if(link.getAttribute("href").includes(current)){
link.classList.add("active");
}

});

});


/* ================= SCROLL PROGRESS ================= */

/* Update the scroll progress bar while scrolling */
window.addEventListener("scroll", () => {

let scrollTop = document.documentElement.scrollTop;

/* Total scrollable height */
let height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

/* Calculate scroll percentage */
let scrolled = (scrollTop / height) * 100;

/* Set width of progress bar */
document.getElementById("scrollBar").style.width =
scrolled + "%";

});


/* ================= TYPING EFFECT ================= */

/* Array of texts to display in typing animation */
const text = [
"I am a Frontend Developer",
"I am a MERN Stack Developer",
"I am a Web Designer"
];

let count = 0; /* Index for sentence */
let index = 0; /* Index for character */

/* Self-invoking function that types text letter by letter */
(function type(){

if(count === text.length){
count = 0; /* Restart loop when all text displayed */
}

let current = text[count];

/* Display characters gradually */
document.querySelector(".typing")
.textContent = current.slice(0,++index);

/* When full sentence is typed */
if(index === current.length){

count++;
index = 0;

/* Pause before typing next sentence */
setTimeout(type,1000);

}else{

/* Continue typing */
setTimeout(type,100);

}

})();


/* ================= SCROLL REVEAL ================= */

/* Function to reveal elements when they enter the viewport */
function reveal(){

document.querySelectorAll(".reveal")
.forEach(el=>{

let top = el.getBoundingClientRect().top;

/* If element is near viewport bottom */
if(top < window.innerHeight - 100){
el.classList.add("active"); /* Add animation class */
}

});

}

/* Run reveal animation on scroll */
window.addEventListener("scroll", reveal);


/* ================= SKILL BAR ANIMATION ================= */

/* Animate skill progress bars when they appear on screen */
function animateSkills(){

document.querySelectorAll(".progress-bar")
.forEach(bar=>{

let top = bar.getBoundingClientRect().top;

if(top < window.innerHeight){

/* Set width from data-progress attribute */
bar.style.width = bar.dataset.progress + "%";

}

});

}

/* Run animation on scroll */
window.addEventListener("scroll",animateSkills);


/* ================= PARTICLE BACKGROUND ================= */

/* Select canvas element */
const canvas = document.getElementById("particles");

/* Get drawing context */
const ctx = canvas.getContext("2d");

/* Set canvas size equal to screen */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* Store particles */
let particles=[];

/* Create 100 particles */
for(let i=0;i<100;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:2,
speedX:(Math.random()-0.5),
speedY:(Math.random()-0.5)
});

}

/* Animation loop */
function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

/* Move each particle */
particles.forEach(p=>{

p.x+=p.speedX;
p.y+=p.speedY;

ctx.fillStyle="#38bdf8";

/* Draw particle */
ctx.fillRect(p.x,p.y,p.size,p.size);

});

/* Repeat animation */
requestAnimationFrame(animate);

}

animate();


/* ================= GITHUB REPOS ================= */

/* Fetch repositories from GitHub API */
fetch("https://api.github.com/users/Visheshjais/repos?sort=updated")

.then(res=>res.json())

.then(data=>{

let repoContainer=document.getElementById("repos");

repoContainer.innerHTML="";

/* Remove forked repositories */
const filtered=data.filter(repo=>!repo.fork);

/* Display only latest 6 repositories */
filtered.slice(0,6).forEach(repo=>{

let div=document.createElement("div");

div.classList.add("repo");

/* Insert repo info */
div.innerHTML=`
<h3>${repo.name}</h3>
<p>${repo.description || "No description available"}</p>
<a href="${repo.html_url}" target="_blank">View Repo</a>
`;

repoContainer.appendChild(div);

});

});


/* ================= PROJECT MODAL ================= */

let currentSlide = 0;
let projectImages = [];

function openProject(project){

const modal = document.getElementById("projectModal");

const title = document.getElementById("modalTitle");
const desc = document.getElementById("modalDescription");
const tech = document.getElementById("modalTech");
const github = document.getElementById("modalGithub");
const demo = document.getElementById("modalDemo");

modal.style.display="flex";

if(project==="groovix"){

projectImages=[
"images/Groovix 1.png",
"images/Groovix 2.png",
"images/Groovix 3.png"
];

title.innerText="Groovix Music Player";

desc.innerText=
"A Spotify-inspired music streaming web application with a modern interface and smooth playback features. Users can browse songs and control music with interactive UI components.";

tech.innerHTML=
"<span>React</span><span>Node.js</span><span>MongoDB</span>";

github.href="https://github.com/your-repo";
demo.href="#";

}

if(project==="unmasking"){

projectImages=[
"images/Unmasking 1.png",
"images/Unmasking 2.png",
"images/Unmasking 3.png"
];

title.innerText="Unmasking Illusion";

desc.innerText=
"A deepfake detection system that analyzes manipulated faces in videos and images using machine learning models.";

tech.innerHTML=
"<span>Python</span><span>PyTorch</span><span>JavaScript</span>";

github.href="https://github.com/your-repo";
demo.href="#";

}

if(project==="translation"){

projectImages=[
"images/All in One 1.jpg",
"images/All in One 2.jpg",
"images/All in One 3.jpg"
];

title.innerText="All-in-One Translation";

desc.innerText=
"A multilingual translation platform supporting 50+ languages with a responsive interface and multiple translation methods.";

tech.innerHTML=
"<span>Node.js</span><span>JavaScript</span><span>HTML</span>";

github.href="https://github.com/your-repo";
demo.href="#";

}

currentSlide=0;

showSlide();

}

function showSlide(){

document.getElementById("sliderImage").src=projectImages[currentSlide];

}

function nextSlide(){

currentSlide++;

if(currentSlide>=projectImages.length){
currentSlide=0;
}

showSlide();

}

function prevSlide(){

currentSlide--;

if(currentSlide<0){
currentSlide=projectImages.length-1;
}

showSlide();

}

function closeProject(){

document.getElementById("projectModal").style.display="none";

}


/* ================= CLOSE MODAL BY CLICKING OUTSIDE ================= */

window.addEventListener("click", function(event){

const modal = document.getElementById("projectModal");

if(event.target === modal){
modal.style.display = "none";
}

});


/* ================= CONTACT FORM SUBMISSION ================= */

/* Show confirmation message after form submission */
const form = document.querySelector("form");

form.addEventListener("submit", function(){
document.getElementById("formMessage").innerText =
"Message sent successfully!";
});