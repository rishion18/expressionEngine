const Card = ({item  , setJsonData , finalJson}) => {


      const handleDeleteExpression = (e ) => {
        e.preventDefault()
        let filteredJsonData;
        const filterJasonData = (prevJsonData) => {
          filteredJsonData = {
            ...prevJsonData ,
            rules: prevJsonData.rules.filter((rule) => rule.key !== item.key),

          }
          localStorage.setItem("finalJson", JSON.stringify(filteredJsonData));
          return filteredJsonData
        }
        setJsonData((prevJsonData) => filterJasonData(prevJsonData));
      };  

    return(
<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.key}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">score is {item.output.score} as value is {item.output.Operator} {item.output.value}</p>
    <button onClick={ (e) => {handleDeleteExpression(e)}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Delete Expression
    </button>
</div>

    )
}

export default Card;