import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";

const App = () => {
  const [stack, setStack] = useState([]);
  const [heap, setHeap] = useState([]);

  const newTaskHandler = (event) => {
    if (event.which === 13) {
      setStack([
        ...stack,
        { id: uuidv4(), type: 'stack', topic: event.target.value, isDone: false }
      ]);
      event.target.value = '';
    };
  };

  const newHeapHandler = (event) => {
    if (event.which === 13) {
      setHeap([
        ...heap,
        { id: uuidv4(), type: 'heap', topic: event.target.value, isDone: false }
      ]);
      event.target.value = '';
    };
  };

  const taskRemoveHandler = (id, type) => {
    if(type === 'stack'){
    const taskIndex = stack.findIndex(task => {
      return task.id === id;
    });

    let tempList = [...stack];
    tempList.splice(tempList[taskIndex], 1);
    setStack(tempList)
  };
    if(type === 'heap'){
      const taskIndex = heap.findIndex(task => {
        return task.id === id;
      });
  
      let tempList = [...heap];
      tempList.splice(tempList[taskIndex], 1);
      setHeap(tempList)
    };
    return console.log('taskRmoveHandler: ', stack);

  }

  const keyboardRemoveHandler = (e) => {
    
    if (e.ctrlKey && e.shiftKey && e.which === 88) {
      let tempStack = [...stack];
      tempStack.splice(tempStack.length - 1, 1);
      setStack(tempStack);
    }
  }
  useEffect(() => {
    if (document){
      document.addEventListener('keydown', keyboardRemoveHandler);
    }
    return () => {
      document.removeEventListener('keydown', keyboardRemoveHandler);
    }
  }, [stack]);

  const keyboardCangeListHandler = (e) => {
    
    if (e.ctrlKey && e.which === 77) {
      changeListHandler();
    }
  }

  const changeListHandler = (id, type) => {
    // move task from stack to heap
    if (type === 'stack') {
      const taskIndex = stack.findIndex(task => {
        return task.id === id;
      });
      setHeap([...heap, { id: stack[taskIndex].id, type: 'heap', topic: stack[taskIndex].topic, isDone: false }]);

      let tempStack = [...stack];
      tempStack.splice(taskIndex, 1);
      setStack(tempStack);
      console.log('change to heap ', stack, '  ', heap)
    };

    // move task from heap to stack
    if (type === 'heap') {
      const taskIndex = heap.findIndex(task => {
        return task.id === id;
      });
      setStack([...stack, { id: heap[taskIndex].id, type: 'stack', topic: heap[taskIndex].topic, isDone: false }]);

      let tempHeap = [...heap];
      tempHeap.splice(taskIndex, 1);
      setHeap(tempHeap);
      console.log('change to stack ', stack, '  ', heap)
    };
  }

  return (
    <div className="container">
      <h4>ctrl+shift+x : Removes current stack  |  Double click or ctrl+m : Moves task between lists</h4>
      <div className="current-task">
        <h1>{stack[0] !== undefined ? stack[stack.length - 1].topic : null}</h1>
      </div>
      <fieldset className="task-list">
      <legend>Stack</legend>
        <ul>
          <>
            {console.log('1', stack)}
            {stack[0] !== undefined ? stack.map((task, id) => (
              <div onKeyDown={() => changeListHandler(task.id, task.type)>
              <Task title={task.topic}
                key={id}
                remove={() => taskRemoveHandler(task.id, task.type)}
                move={() => changeListHandler(task.id, task.type)}
                } />
                </div>
            )) : null}
          </>
        </ul>
        <input type="text" placeholder="Add a task to stack" onKeyDown={newTaskHandler} className='stack-input'  autoFocus aria-flowto='heap-input' />
      </fieldset>

      <fieldset className="task-list">
        <legend>Heap</legend>
        <input type="text" placeholder="Add a task to heap" onKeyDown={newHeapHandler} className='heap-input'  aria-flowto='stack-input' />
        <ul>
          <>
            {console.log('2', heap)}
            {heap[0] !== undefined ? heap.map((task, id) => (
              <Task title={task.topic}
                key={id}
                remove={() => taskRemoveHandler(task.id, task.type)}
                move={() => changeListHandler(task.id, task.type)}
                keyboardMove={keyboardCangeListHandler} />
            )) : null}
          </>
        </ul>
      </fieldset>
    </div>
  );
};

export default App;
