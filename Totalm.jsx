const Totalm = ({ tot, settot , month , setmonth}) => {
    return (
      <>
      <div className="asd">
      <h3>Total Amount</h3>
      <input
        type="number"
        placeholder="Enter the Total amount for the month"
        value={tot}
        onChange={(e) => settot(Number(e.target.value))} 
      />
      <h3 className="dfgh">Which Month</h3>
       <input
          type="month"
          placeholder="Enter the month"
          value={month}
          onChange={(e) => setmonth(e.target.value)}
        />

        
      </div>
      </>
    );
  };
  
  export default Totalm;
  