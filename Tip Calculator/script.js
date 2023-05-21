
const billInput = document.getElementById('billTotalInput')
const tipInput = document.getElementById('tipInput')
const numberOfPeopleDiv = document.getElementById('numberOfPeople')
const perPersonTotalDiv = document.getElementById('perPersonTotal')

let numberOfPeople = Number(numberOfPeopleDiv.innerText) // to get number of people from the div

const calculateBill = () => { //function to calculate the bill 
  
  const bill = Number(billInput.value) //get the value(bill amount) from the input tag

  const tipPercent = Number(tipInput.value) / 100 //get the value(tip) from the input tag

  const tipAmount = bill * tipPercent // calculate the tip

  const total = tipAmount + bill // calculate the amount

  const perPersonTotal = total / numberOfPeople // calculate the per person total

  perPersonTotalDiv.innerText = `₹${perPersonTotal.toFixed(2)}` //update the DOM with the per person total
}

const increasePeople = () => { //function to increase the number of people

  numberOfPeople += 1

  numberOfPeopleDiv.innerText = numberOfPeople //update the DOM with the incresed number of people

  calculateBill() // call the function again to calculate amount (with the increased number of people)
}

const decreasePeople = () => { // function to decrease the number of people
  
  if (numberOfPeople <= 1) { // guard clause - to not make the number of people negative(and to just simply return)
    return
  }

  numberOfPeople -= 1

  numberOfPeopleDiv.innerText = numberOfPeople //update the DOM with the decreased number of people

  calculateBill() // call the function again to calculate amount (with the increased number of people)
}