//copied forconfetti
var maxParticleCount = 5000; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function() {
	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();
//finished confetticopiedcode
var check_count=0;
var total_count=0;
var titleinput=document.querySelector("#title-input");
var descinput=document.querySelector("#desc-input");
var timeinput=document.querySelector("#time-input");
var dateinput=document.querySelector("#date-input");
var taskcount=0;
var addtaskbtn=document.querySelector("#add-task");
var todolist=document.querySelector(".todo-list");
var taskcounter=document.querySelector("#get-info");
var area=document.createElement('div');
var mode=document.querySelector('#modes');
var test=document.querySelector('.hidden2');
var btn=document.querySelector(".complete-btn");
var presscheck=0;

//event listener
addtaskbtn.addEventListener('click',addTodo);
todolist.addEventListener('click',deleteCheck);
taskcounter.addEventListener('click',taskcountershow);
mode.addEventListener('click',modetoggle);var createtask=document.querySelectorAll('#createtask');
 



//Functions
function displaycreatetaskpanel(event){
    var bctarget=event.target;
    var createtaskpanel=bctarget.parentNode.querySelector(".create-task-menu");
    createtaskpanel.classList.add("make-visible");
}
for(var i=0;i<createtask.length;i++){
    var anchor=createtask[i];
    anchor.addEventListener("click",displaycreatetaskpanel);  
        
}
function addTodo(event){
	
	test.classList.add("make-visible2");
	test.classList.remove(".hidden2");
    var closewindow=document.querySelector(".create-task-menu");
    closewindow.classList.remove("make-visible")
    event.preventDefault();
    //dwe
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
    //li
    const newtodo=document.createElement('li');
    newtodo.innerHTML=`<label>Title:  </label>${document.querySelector("#title-input").value}
    
        <div><label>Description: </label>${document.querySelector("#desc-input").value}</div>
        <div><label>Time:  </label>${document.querySelector("#time-input").value}</div>
        <div><label>Date:  </label>${document.querySelector("#date-input").value}</div>
    
    `;

    newtodo.classList.add('todoitem');
    todoDiv.appendChild(newtodo);
    
    //checkmark
    
    const completedbutton=document.createElement('button');
    completedbutton.innerHTML='<i class="fa-solid fa-flag"></i>';
    completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(completedbutton);
	const space=document.createElement('span');
	space.innerText='  ';
	todoDiv.appendChild(space);

    //checkmark
    const trashbutton=document.createElement('button');
    trashbutton.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    trashbutton.classList.add("delete-btn");
    todoDiv.appendChild(trashbutton);
    //appendtolist
    todolist.appendChild(todoDiv);
    //clearvalue
    titleinput.value="";
    descinput.value="";
    timeinput.value="";
    dateinput.value="";
    total_count=total_count+1;
    area.remove();
    
	taskcount=taskcount+1;
	if(total_count==1||check_count>0){
		presscheck=0;
	}
	if(presscheck>0){
		
	}else{
	presscheck=0;}
}
function deleteCheck(event){
    const item=event.target;
    //delete
    if(item.classList[0]==="delete-btn"){
        const todo=item.parentElement;
		total_count=total_count-1;
		check_count=check_count-1;
		taskcount=taskcount-1;
       
		if(total_count===0){
			check_count=0;
			test.classList.add("hidden2");	
			test.classList.remove("make-visible2");
		}
        todo.remove();
        area.remove();
		
        
    }
    //check
    
	
	if(item.classList[0]==="complete-btn"&&presscheck<taskcount){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
        check_count=check_count+1;
        area.remove();
        startConfetti();
        calltostop();
        presscheck=presscheck+1;
        
    }
    
    
}
function calltostop(){
    var stopnow=document.addEventListener("mousemove",stopConfetti());
}

function taskcountershow(event){
    event.preventDefault();
    var morearea=document.querySelector(".counterarea2");
    
    area.innerHTML=check_count + '/' +total_count;
    morearea.append(area);
}
function modetoggle(){
    var body= document.querySelector("body");
    body.classList.toggle("dark-mode");	
}
