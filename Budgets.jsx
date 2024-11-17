const Budgets = ({ bug, amo, setbug, setamo, addbudget }) => {
    return (
      
      <div className="bugs">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter a Budget"
            value={bug}
            onChange={(e) => setbug(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter the amount"
            value={amo}
            onChange={(e) => setamo(Number(e.target.value))} 
          />
          <button type="submit" onClick={() => {addbudget()}}>Add</button>
        </form>
      </div>
    );
  };
  
  export default Budgets;
  