var React = require('react');

function FluxCounter({ count, onClick }) {
  return (
    <div className="flux-counter">
      <p>{count}</p>
      <button type="button" onClick={onClick}>Increment</button>
    </div>
  );
};

module.exports = FluxCounter;
