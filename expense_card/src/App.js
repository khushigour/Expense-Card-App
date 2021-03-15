import './App.css';
import React from 'react';

const List = [
  {
    cost: 100,
    description: "Fruits",
  },
  {
    cost: -200,
    description: "Dog" 
  },
  {
    cost: 500,
    description: "Car"
  }

];

const Amount = ({name, amount}) =>(
  <div className="amount">
    <h2>{name}</h2>
    <p>${amount}</p>
  </div>
);


const Searchbox = ({handleList, handleCost, handleDescription}) => (
  <form >
    <h3>Add more items</h3>
    <div className="cost">
      <label htmlFor="Cost">Cost:</label>
      <input 
        id="Cost" 
        type="number"
        onChange={handleCost}/>
    </div>
    <div className="description">
      <label htmlFor="Description">
        Description:
      </label>
      <input 
        id="Description" 
        type="text"
        onChange = {handleDescription}/>
    </div>
    <button onClick={e => handleList(e)}>
        Add
    </button>
  </form>
);



const App = () => {

  const [list, setList] = React.useState(List);
  const [cost, setCost] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState(400);
  const [income, setIncome] = React.useState(600);
  const [expense, setExpense] = React.useState(200);

  const handleCost = e => setCost(e.target.value);
  const handleDescription = e => setDescription(e.target.value);
  const handleList = e => {
    const newList =[...list, {cost: cost, description: description}];  
    if(cost>0)setIncome(income+parseInt(cost));
    if(cost<0)setExpense(expense-parseInt(cost));
    setList(newList);
    e.preventDefault();
  }

  const handleRemove = item => {
    if(item.cost>0)setIncome(income - parseInt(item.cost));
    if(item.cost<0)setExpense(expense + parseInt(item.cost));
    setList(list.filter((i) => {
      return (item.description!==i.description);
    }));
   
  }

  React.useEffect(() => {
    setAmount(income - expense);
  },[income, expense]);


  return (
    <div className="App">
      <h1>Expense Card</h1>
      <Amount amount={amount} name={"Amount"}/>
      <Amount amount={income} name={"Income"}/>
      <Amount amount={expense} name={"Expense"}/>
      <Searchbox handleList = {handleList} handleCost = {handleCost} handleDescription = {handleDescription}/>
      <Listdisplay lists={list} handleRemove = {handleRemove}/>
      
    </div>
  );
}


const Listdisplay = ({lists, handleRemove}) => (
  <div className="list">
   {console.log(lists)}
   <table>
   <tr className="items">
     <th>Cost of Item</th>
     <th>Description</th>
     <th>Delete</th>
   </tr>
    {lists.map(item =>(
      <tr key={item.description}>
        <th id="items_description"> {item.description} </th>
        <th id="items_cost"> {item.cost} </th>
      <th> <button onClick = {() =>handleRemove(item)}>&#10006;</button> </th>
      </tr>
    ))
   }
   </table>
  </div>
);

export default App;
