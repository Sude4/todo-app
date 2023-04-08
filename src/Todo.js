import React, { useState } from 'react';

function Todo({ text }) {
  const [completed, setCompleted] = useState(false);

  const handleClick = () => {
    setCompleted(!completed);
  };

  return (
    <div onClick={handleClick}>
      <h2 style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </h2>
    </div>
  );
}

export default Todo;

