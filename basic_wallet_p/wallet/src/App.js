import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("")
  const [trans, setTrans] = useState()
  const [balance, setBalance] = useState(0)
  
  const handleChange = e =>{
    setUsername(e.target.value);
  }

  const handleSubmit = () =>{
    let total = 0;
    axios.get('http://127.0.0.1:5000/chain')
    .then(res=>{
      let chain = res.data.chain
      let name = username.toLowerCase()
      let list = []
      chain.forEach(object=>{
        object.transactions.forEach(item=>{
          let sender = item.sender.toString();
          let rec = item.recipient.toString()
          if(sender.toLowerCase() === name){
            total -= item.amount
            list.push(item)
          } else if(rec.toLowerCase() === name){
            total += item.amount
            list.push(item)
          }
        })
      })

      setBalance(total)
      setTrans(list);
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="App">
      <input placeholder="ENTER NAME" name="username" value={username} onChange={handleChange} />
      <button onClick={handleSubmit}>Retrieve data</button>
      {trans && balance && 
      <div>
        <p>Total Balance: {balance}</p>
        </div>}
      {trans && 
      trans.map((x, idx)=>{
        return <div key={idx}>
          <p>Sender: {x.sender}</p>
          <p>Recipient: {x.recipient}</p>
          <p>Amount: {x.amount}</p>
          <hr />
          </div>
      })}
    </div>
  );
}

export default App;
