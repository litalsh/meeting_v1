import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";
import useLocalStorage from './useLocalStorage';

const App = () => {
  const [stack, setStack] = useLocalStorage('stack', []);
  const [heap, setHeap] = useLocalStorage('heap', []);
  const [timer, setTimer] = useState(stack[0] !== undefined ? stack[stack.length - 1].duration * 60 : 0);
  const [isRunning, setIsRunning] = useState(false);

  let minutes = Math.floor(timer / 60);
  let seconds = Math.abs(timer % 60);
  minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
  seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;

  const newTaskHandler = (event) => {
    if (event.which === 13 && event.target.value !== '') {
      setStack([
        ...stack,
        { id: uuidv4(), type: 'stack', topic: event.target.value, duration: 5 , slider: 'show-slider' }
      ]);
      event.target.value = '';
      setIsRunning(false);
      setTimer(stack[stack.length - 1].duration * 60);
    };
  };

  const newHeapHandler = (event) => {
    if (event.which === 13 && event.target.value !== '') {
      setHeap([
        ...heap,
        { id: uuidv4(), type: 'heap', topic: event.target.value, duration: 5, slider: 'hide-slider' }
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
    setStack(tempList);
    if(taskIndex === stack.length - 1 ){
      setIsRunning(false);
      setTimer(stack[stack.length - 1].duration * 60);
    }
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
      setIsRunning(false);
      setTimer(stack[stack.length - 1].duration * 60);
    }
  } 

  const adjustDurationHandler = (e, id) => {
    const index = stack.findIndex(task =>task.id === id);
    setStack(stack[index].duration = e.target.value);
  }
  
  const keyboardStartTimerHandler = (e) => {
    if (e.altKey && e.which === 83) {
      !isRunning ? setIsRunning(true) : setIsRunning(false) ;
    }
  }

  // remove from stack with the keyboard
  useEffect(() => {
    if (document){
      document.addEventListener('keydown', keyboardRemoveHandler);
    }
    return () => {
      document.removeEventListener('keydown', keyboardRemoveHandler);
    }
  }, [stack]);

  // starts and stops the countdown
  useEffect(() => {
    if (document){
      document.addEventListener('keydown', keyboardStartTimerHandler);
      if(isRunning) {
        const id = window.setInterval(() => {
          setTimer(timer => timer-1);
        }, 1000);
        return () => window.clearInterval(id);
      }
    }
    return () => {
      document.removeEventListener('keydown', keyboardStartTimerHandler);
    }   
  }, [isRunning])

  const changeListHandler = (id, type) => {
    // move task from stack to heap
    if (type === 'stack') {
      const taskIndex = stack.findIndex(task => {
        return task.id === id;
      });
      setHeap([...heap, { id: stack[taskIndex].id, type: 'heap', topic: stack[taskIndex].topic, duration: stack[taskIndex].duration, slider: 'hide-slider' }]);

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
      setStack([...stack, { id: heap[taskIndex].id, type: 'stack', topic: heap[taskIndex].topic, duration: heap[taskIndex].duration, slider: 'show-slider' }]);

      let tempHeap = [...heap];
      tempHeap.splice(taskIndex, 1);
      setHeap(tempHeap);
      console.log('change to stack ', stack, '  ', heap)
    };
  }

  const clearListsHandler = () => {
    setHeap([]);
    setStack([]);
  }
  let 
  return (
    <div className="container">
      <button className='clear-btn' onClick={() => clearListsHandler()}>Clear all</button>
      <h4>Ctrl+Shift+X: Removes current stack  |  Double click: Moves the task between lists  |  Alt+S: Start/stop the timer</h4>
      {stack[0] !== undefined ?  <h3 className="timer">{minutes}:{seconds}</h3> : null}
      <div className="current-task">
        <h1>{stack[0] !== undefined ? stack[stack.length - 1].topic : null}</h1>
      </div>
      <fieldset className="task-list stack-list">
      <legend>Stack</legend>
        <ul>
          <>
            {stack[0] !== undefined ? stack.map((task, id) => (
              <Task title={task.topic}
                key={id}
                remove={() => taskRemoveHandler(task.id, task.type)}
                move={() => changeListHandler(task.id, task.type)}
                class={"stack_item"}
                duration={task.duration}
                slider={task.slider}
                sliderControl={() => adjustDurationHandler(task.id)}
                onChange={value => }
                 />
            )) : null}
          </>
        </ul>
        <input type="text" placeholder="Add a task to stack" onKeyDown={newTaskHandler} className='stack-input'  autoFocus aria-flowto='heap-input' />
      </fieldset>

      <fieldset className="task-list heap-list-container">
        <legend>Heap</legend>
        <input type="text" placeholder="Add a task to heap" onKeyDown={newHeapHandler} className='heap-input'  aria-flowto='stack-input' />
        <ul className="heap-list">
          <>
            {heap[0] !== undefined ? heap.map((task, id) => (
              <Task title={task.topic}
                key={id}
                remove={() => taskRemoveHandler(task.id, task.type)}
                move={() => changeListHandler(task.id, task.type)}
                class={"heap_item"}
                duration={task.duration}
                slider={task.slider}/>
            )) : null}
          </>
        </ul>
      </fieldset>
    </div>
  );
};

export default App;
