import { useEffect, useState } from "react";
import Card from "./card";


const Form = () => {

 const[connector , setConnector] = useState('')
 const[rule , setRule] = useState('')
 const[operator , setOperator] = useState('')
 const[value , setValue] = useState(1)
 const[score , setScore] = useState(1)
 const [finalJson, setJsonData] = useState({
  rules:[],
  combinator:connector
 });
 const[renderJson , setRenderJson] = useState({
  rules:[],
  combinator:''
 })

 const handleConnector = (val) => {
  setConnector(val);
  setJsonData((prevJsonData) => ({
    ...prevJsonData,
    combinator: val,
  }));
};


 const handleOperator = (val) => {
   setOperator(val)
 }

 const handleRule = (val) => {
   setRule(val)
 }

 const handleValue = (val) => {
   setValue(val)
 }

 const handleScore = (val) => {
    setScore(val)
 }


 const handleSubmit = (e) => {
  e.preventDefault();

  const newRule = {
    key: rule.toLowerCase(),
    output: {
      value: value,
      operator: operator,
      score: score,
    },
  };

  setJsonData((prevJsonData) => {
    const updatedJsonData = { ...prevJsonData };

    updatedJsonData.combinator = connector

    const existingRuleIndex = updatedJsonData.rules.findIndex(
      (r) => r.key === newRule.key
    );

    if (existingRuleIndex !== -1) {
      updatedJsonData.rules[existingRuleIndex] = newRule;
    } else {
      updatedJsonData.rules.push(newRule);
    }

    localStorage.setItem("finalJson", JSON.stringify(updatedJsonData));
    setRenderJson(updatedJsonData);
    return updatedJsonData;
  });
};


const fetchList = () => {
  const storedJson = localStorage.getItem("finalJson");
  if (storedJson) {
    setRenderJson(JSON.parse(storedJson));
  }
};


useEffect(() => {
fetchList()
}, [finalJson]);

    return(
    <div className='w-screen flex flex-col justify-center items-center mt-5'>
       <div className="m-2 font-semibold text-lg">To generate expressions fill the form -</div>
        <div className='w-90vw m-5 grid grid-cols-3 gap-3'>
        <div>
            <label for="connector" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select 
                   onChange={(e) => handleConnector(e.target.value)}
                    id="connector" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a connector</option>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
            </select>
        </div>    
        <div>
            <label for="rule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select onChange={(e) => handleRule(e.target.value)} id="rule" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a Rule Type</option>
                <option value="Age">Age</option>
                <option value="Credit Score">Credit Score</option>
                <option value="Account Balance">Account Balance</option>
            </select>
        </div>

        <div>
            <label for="operator" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select onChange={(e) => handleOperator(e.target.value)} id="operator" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose an operator</option>
                <option value="greater than">greater than</option>
                <option value="less than">less than</option>
                <option value="greater than equal to">greater than equal to</option>
                <option value="less than equal to">less than equal to</option>
            </select>
        </div>    
        
        <div>
            <label for="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Value :</label>
            <input 
                  onChange={(e) => handleValue(e.target.value)}
                  type="number" 
                  id="value-input" 
                  aria-describedby="helper-text-explanation" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="50" 
                  required/>
        </div>          
        
            <div>
                <label for="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Score :</label>
                <input 
                    onChange={(e) => handleScore(e.target.value)}
                    type="number" 
                    id="score-input" 
                    aria-describedby="helper-text-explanation" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="60" 
                    required/>
            </div>           
        </div>
        <div>
            <button onClick={(e) => handleSubmit(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
               Generate expression
            </button>
        </div>
        <div className="mt-10 text-lg font-semibold">Generated expressions -</div>
        <div className="grid grid-cols-3 gap-4 m-5">
          
          {(renderJson?.rules || []).map((item, index) => (
            <Card
            key={index}
            item={item}
            setJsonData={setJsonData}
            finalJson={finalJson}
          />
          ))}
        
        </div>
    </div>
    )
}

export default Form;