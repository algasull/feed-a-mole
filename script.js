let runAgainAt = Date.now() + 100;
let score = 0;
const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[0]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[1]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[2]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[3]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[4]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[5]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[6]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[7]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[8]
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelectorAll('.hole-container')[9]
  }]

function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random()*18000) +2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random()*3000) +2000;
}

function getHappyInterval() {
  return Date.now() + 500;
}

function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
      mole.next = getSadInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.classList.add('king-leaving')
        mole.node.classList.remove('king-sad');
      } else {
        mole.node.classList.add('leaving');
        mole.node.classList.remove('sad');
      }
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      if (mole.king) {
        mole.node.classList.remove('king-leaving');
      } else {
        mole.node.classList.remove('leaving');
      }
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      if (Math.random()*10 > 9) {
        mole.king = true;
      } else {
        mole.king = false;
      }
      if (mole.king) {
        mole.node.classList.add('king-hungry');
      } else {
        mole.node.classList.add('hungry');
      }
      break;
    case "hungry":
      mole.next =  getSadInterval();
      mole.status = "sad";
      if (mole.king) {
        mole.node.classList.remove('king-hungry');
        mole.node.classList.add('king-sad');
      } else {
        mole.node.classList.remove('hungry');
        mole.node.classList.add('sad');
      }
      break;
    case "happy":
      mole.next = getSadInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.classList.remove('king-happy');
        mole.node.classList.add('king-leaving');
      } else {
        mole.node.classList.remove('happy');
        mole.node.classList.add('leaving');
      }
      break;
  }
}

function feedMole(mole) {
  mole.next = getHappyInterval();
  mole.status = "happy";
  if (mole.king) {
    mole.node.classList.remove('king-hungry');
    mole.node.classList.add('king-happy');
    score =  score + 2;
  } else {
    mole.node.classList.remove('hungry');
    mole.node.classList.add('happy');
    score =  score + 1;
  }
}

function nextFrame() {
  const now = Date.now();
  
  if (runAgainAt <= now) {
    for (let i=0; i < moles.length; i++) {
      let mole = moles[i];
      if (mole.next <= now) {
        getNextStatus(mole); 
      }
      runAgainAt = runAgainAt + 100;

    }
  }
  requestAnimationFrame(nextFrame);
}

window.addEventListener('click', function(event) {
    const holeNode = event.target;
    const mole = moles[holeNode.dataset.index];
    console.log(mole.status)
    if (mole.status === ('hungry'||'king-hungry')) {
      feedMole(mole)
    }
  })
nextFrame();