
let thickness;
let randomness;
let spread;
let iterations;

function setup() {
  createCanvas($(document).width(), 900).parent('tree_p5');
  thickness = document.getElementById('thickness').value;
  randomness = document.getElementById('randomness').value / 100;
  spread = document.getElementById('spread').value;
  iterations = 0;
  recursiveDraw(createVector(width/2, height), createVector(0,-100));
  document.getElementById('iterations').innerHTML = formatThousands(iterations) + ' iterations.';
}

function recursiveDraw(pos, v){
  let magnitude = v.mag();
  if (magnitude < 5)
    return;
  stroke(255-map(magnitude,5,100,0,255), 120, 0, map(magnitude,5,100,20,150));
  strokeWeight(map(magnitude,5,100,1,thickness));
  line(pos.x, pos.y, pos.x + v.x, pos.y + v.y);
  var nextPos = createVector(pos.x + v.x, pos.y + v.y);
  recursiveDraw(nextPos, v.copy().rotate(radians(random(spread))).mult(0.81 + random(randomness)-randomness/2));
  recursiveDraw(nextPos, v.copy().rotate(radians(random(spread)*-1)).mult(0.81 + random(randomness)-randomness/2));
  iterations++;
}

function formatThousands(integer) {
  return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
