const X_IMG = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMG = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

//FUNCTIONS
function PutX(event) {
     assingSpace(event.currentTarget, 'X');
    PutO();
}

function PutO(){
    const index = Math.floor(Math.random() * freeboxes.length)
    const choosenbox = freeboxes[index];
    assingSpace(choosenbox, 'O');
    if (checkWinner() !== null)
    {
        displayWinner();
    }
}

function assingSpace(space,owner){
    const image = document.createElement('img');
    image.src = owner === 'X'? X_IMG : O_IMG;
    space.appendChild(image);
    space.removeEventListener('click', PutX);

    takenboxes[space.id] = owner;
    const indextoremove = freeboxes.indexOf(space);
    freeboxes.splice(indextoremove,1);

}
//ADDING LISTENERS TO ALL BOXES
const allboxes = document.querySelectorAll('#grid div');
const freeboxes = [];
const takenboxes = {};
for (const box of allboxes) {
    box.addEventListener('click', PutX);
    freeboxes.push(box);
}
function checkbox(box1,box2,box3)
{
    if(takenboxes[box1] !== undefined && takenboxes[box1] === takenboxes[box2] && takenboxes[box1] === takenboxes[box3])
    {
       return takenboxes[box1];
    }
    return null;
}

function checkWinner()
{
    let rowwinner = checkbox('one','two','three') || checkbox('four','five','six') || checkbox('seven','eight','nine');
    let columnwinner = checkbox('one','four','seven') || checkbox('two','five','eight') || checkbox('three','six','nine');
    let diagonalwinner = checkbox('one','five','nine') || checkbox('three','seven','five');
    return rowwinner || columnwinner || diagonalwinner;
}

function displayWinner(){
    const text = document.createElement('h1');
    let winner = checkWinner();
    if(winner === 'X')
    {
        text.textContent = 'X WINS';
    }
    else if(winner === 'O')
    {
        text.textContent = 'O WINS';
    }
    else
    {
        text.textContent = 'TIE';
    }
    let result = document.querySelector('#result');
    result.appendChild(text);
}
//GAME