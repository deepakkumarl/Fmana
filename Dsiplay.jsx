const Dsiplay = ({ budgets, dell, delsup, pro }) => {
  return (
    <>
      <ul className="diss">
        <p className="ch">{pro > 0 ? "REMAINING AMOUNT" : "LOSS"}: {pro}</p>
        {budgets.map((bud) => (
          <li key={bud.id} className="budget-item">
            <h1 className="nbudg">{bud.name}</h1>
            <h3 className="dfg">Amount: ₹{bud.amount}</h3>
            {bud.subbb && bud.subbb.length > 0 ? (
              <table>
                <thead>
                  <tr className="dddd">
                    
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {bud.subbb.map((sup) => (
                    <tr key={sup.twoid} className="ddd">
                      
                      <td>{sup.subname}</td>
                      <td>{sup.subbudget}</td>
                      <td>
                        <button onClick={() => delsup(bud.id, sup.twoid)} className="fd">
                          Delete sub
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Your item cart is empty</p>
            )}
            <button onClick={() => dell(bud.id)} className="hju">Delete</button>
          </li>
        ))}
      </ul>
      <br />
    </>
  );
};

export default Dsiplay