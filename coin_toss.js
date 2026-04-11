    let result = ''
    let guess = ''
    let win = 0
    let lose = 0 

    const score = localStorage.getItem('score') ?
    JSON.parse(localStorage.getItem('score')):
    {
      Wins : 0,
      Lose : 0
    }

    function play(){ 
    random_number = parseFloat(Math.random()).toFixed(1)
    random_number <= 0.5 ? result = 'HEADS' : result = 'TAILS' 
    console.log ('Computers choice: ', result)

    guess == result ? (console.log('YOU WIN'), score.Wins += 1) : (console.log('YOU LOSE'), score.Lose += 1)

     localStorage.setItem ('score', JSON.stringify(score))
    }
    