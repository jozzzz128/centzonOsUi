'use strict'

var container = document.querySelector("body #container .screen");
var radarOn = true;

function reGenerateStart(){
  var instructions = document.createElement("div");
      instructions.innerHTML = '<span class="icon-indicacion"></span><p>Coloca tu tarjeta sobre el sensor para comenzar</p>';
  container.append(instructions);
}

function readCardScreen(){
  radarOn = true;
  container.id = "read-screen";
  setTimeout(function(){
    document.querySelector("body .screen .instruction").remove();
    var topInstruction = document.createElement("h2");
        topInstruction.classList.add("top-instruction");
        topInstruction.classList.add("appear");
        topInstruction.innerHTML = 'Leyendo Tarjeta<span>No retires la tarjeta del sensor</span>';
    container.append(topInstruction);
  },300);
  setTimeout(function(){
    var cardReader = document.createElement("div");
        cardReader.classList.add("card-reader");
        cardReader.setAttribute("onclick","checkPassScreen();");
        cardReader.innerHTML = '<span class="wave wave-hidden icon-detect-0-inverted"></span> <span class="icon-tarjeta"></span> <span class="wave wave-hidden icon-detect-0"></span>';
    container.append(cardReader);
  },500);
  setTimeout(function(){
    var cardWaves = container.querySelectorAll(".card-reader .wave");
        cardWaves[0].classList.remove("wave-hidden");
        cardWaves[1].classList.remove("wave-hidden");
        startWaveMovement();
        function startWaveMovement(){
          setTimeout(function(){
            if(cardWaves[0].classList.contains("icon-detect-4-inverted")){
              cardWaves[0].classList.remove("icon-detect-4-inverted");
              cardWaves[1].classList.remove("icon-detect-4");
            }else{
              cardWaves[0].classList.remove("icon-detect-0-inverted");
              cardWaves[1].classList.remove("icon-detect-0");
            }
            cardWaves[0].classList.add("icon-detect-1-inverted");
            cardWaves[1].classList.add("icon-detect-1");
          },300);
          setTimeout(function(){
            cardWaves[0].classList.remove("icon-detect-1-inverted");
            cardWaves[1].classList.remove("icon-detect-1");
            cardWaves[0].classList.add("icon-detect-2-inverted");
            cardWaves[1].classList.add("icon-detect-2");
          },600);
          setTimeout(function(){
            cardWaves[0].classList.remove("icon-detect-2-inverted");
            cardWaves[1].classList.remove("icon-detect-2");
            cardWaves[0].classList.add("icon-detect-3-inverted");
            cardWaves[1].classList.add("icon-detect-3");
          },900);
          setTimeout(function(){
            cardWaves[0].classList.remove("icon-detect-3-inverted");
            cardWaves[1].classList.remove("icon-detect-3");
            cardWaves[0].classList.add("icon-detect-4-inverted");
            cardWaves[1].classList.add("icon-detect-4");
            if(radarOn) startWaveMovement();
            else{
              cardWaves[0].classList.remove("icon-detect-4-inverted");
              cardWaves[1].classList.remove("icon-detect-4");
              cardWaves[0].classList.add("icon-detect-0-inverted");
              cardWaves[1].classList.add("icon-detect-0");
            }
          },1200);
        }
  },900);
}

function checkPassScreen(){
  radarOn = false;
  var prevInstruction = container.querySelector(".top-instruction");
  container.id = "pass-screen";
  setTimeout(function(){
    container.querySelector(".card-reader").remove();
    prevInstruction.classList.remove("appear");
    prevInstruction.classList.add("disappear");
  },700);
  setTimeout(function(){
    prevInstruction.remove();
    var topInstruction = document.createElement("h2");
        topInstruction.classList.add("top-instruction");
        topInstruction.classList.add("appear");
        topInstruction.innerHTML = 'Bienvenid@ Octavio<span class="separate">Ingresa tu contraseña para<br>confirmar que eres tu</span>';
    container.append(topInstruction);
  },900);
  setTimeout(function(){
    var lockPass = document.createElement("div");
        lockPass.classList.add("lock-pass");
        lockPass.innerHTML = '<span class="icon-lock"></span><input onkeyup="verifyPass(this,event);" type="password">';
    container.append(lockPass);
  },1100);

}

function verifyPass(param1,event){
    if(event.keyCode == 13) {
      var pass = "12345";
      var lock = param1.parentElement.querySelector(".icon-lock").classList;

      lock.add("jump");
      setTimeout(function(){
        lock.remove("jump");
      },300);

      if(param1.value == pass){
        if(lock.contains("wrong")) lock.remove("wrong");
        lock.add("right");
        param1.setAttribute("onkeyup","");
        selectOScreen();
      }else if(!(lock.contains("wrong"))){
        lock.add("wrong");
      }

    }
}

function selectOScreen(){
  var prevInstruction = container.querySelector(".top-instruction");
  container.id = "so-screen";
  setTimeout(function(){
    container.querySelector(".lock-pass").remove();
    prevInstruction.classList.remove("appear");
    prevInstruction.classList.add("disappear");
  },700);
  setTimeout(function(){
    prevInstruction.remove();
    var topInstruction = document.createElement("h2");
        topInstruction.classList.add("top-instruction");
        topInstruction.classList.add("appear");
        topInstruction.innerHTML = 'Bienvenid@ Octavio<span>Elije tu Sistema Operativo</span>';
    container.append(topInstruction);
  },900);
  setTimeout(function(){
    var soSelect = document.createElement("ul");
        soSelect.classList.add("so-select");
        soSelect.innerHTML = '<li><span class="icon-finder"></span><p>Mac OS<span>Multiples Distribuciones</span></p></li> <li onclick="osSelectedScreen(1);"><span class="icon-linux"></span><p>Linux<span>Multiples Distribuciones</span></p></li> <li><span class="icon-windows8"></span><p>Windows<span>Multiples Distribuciones</span></p></li>';
    container.append(soSelect);
  },1100);
}

function osSelectedScreen(param1){
  var distros = ['Debian<span>10.0 Buster</span><span class="arch">x64</span>','Ubuntu<span>18.04.3 LTS</span><span class="arch">x64</span>','CentOS<span>7.19 Atomic</span><span class="arch">x64</span>','Arch<span>2.17 Axel</span><span class="arch">x64</span>','Manjaro<span>9 Stretch</span><span class="arch">x64</span>','GenToo<span>9 Stretch</span><span class="arch">x64</span>','Mint<span>9 Stretch</span><span class="arch">x64</span>','Kali<span>9 Stretch</span><span class="arch">x64</span>'];
  var topDistros = distros.length / 2;
  if( !(Number.isInteger(topDistros)) ){
    topDistros++;
    topDistros = parseInt(topDistros);
  }

  if(param1 == 1){
    var prevInstruction = container.querySelector(".top-instruction");
    container.id = "distro-screen";
    setTimeout(function(){
      container.querySelector(".so-select").remove();
      prevInstruction.classList.remove("appear");
      prevInstruction.classList.add("disappear");
    },700);
    setTimeout(function(){
      prevInstruction.remove();
      var topInstruction = document.createElement("h2");
          topInstruction.classList.add("top-instruction");
          topInstruction.classList.add("appear");
          topInstruction.classList.add("distro");
          topInstruction.innerHTML = '<div class="flex"><span class="icon-linux"></span><p>Selecciona Tu Distribución<span>LINUX</span></p></div>';
      container.append(topInstruction);
    },900);
    setTimeout(function(){
      var soSelect = document.createElement("ul");
          soSelect.classList.add("distro-select");
          for(var i = 0; i < distros.length; i++){
            if(topDistros == i){
              var br = document.createElement("br");
              soSelect.append(br);
            }
            var distro = document.createElement("li");
                distro.innerHTML = distros[i];
            soSelect.append(distro);
          }
      container.append(soSelect);
    },1100);
  }
}
