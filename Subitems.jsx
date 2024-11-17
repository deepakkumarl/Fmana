const Subitems = ({ bug2, setbug2, ite, setite, amo2, setamo2, addsups }) => {
  return (
    <div className="kkk">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter a Budget"
          value={bug2}
          onChange={(e) => setbug2(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter a subitem"
          value={ite}
          onChange={(e) => setite(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter the amount of the subitem"
          value={amo2}
          onChange={(e) => setamo2(Number(e.target.value))} 
        />
        <button type="submit" onClick={() => {addsups()}}>Add</button>
      </form>
    </div>
  );
};

export default Subitems;
