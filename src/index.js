import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ErrorCatcher extends React.Component{
  state = { error: null }

  componentDidCatch(error, info) {
    console.log('[componentDidCatch]', error);
    this.setState({ error: info.componentStack });
  }
  render() {
    if(this.state.error) {
      return (
        <div>
          Am error occurred: {this.state.error}
        </div>
      );
    }
     return this.props.children;
  }
}

class LifecycleDemo extends React.Component {
  state = {counter: 0};
  // The first method called after initializing state
  constructor(props) {
    super(props);
    console.log('[constructor]');
    console.log(' State already set:', this.state);
  }
  // Called after initial render is done
  componentDidMount() {
    console.log('[componendDidMount]','Mounted.');
  }

  //Called before initial render, and any time new props are received
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[getDerivedStatedFromProps]');
    console.log('  Next props: ', nextProps);
    console.log('  Prev state:', prevState);
    return null;
  }
  //Called before each render.  Return false to prevent rendering;
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[shouldComponentUpdate]', 'Deciding to update');
    return true;
  }

  //Called after render() but before updating the DOM
  //A good place to execute calculations based on old DOM nodes
  // The returned value here is passed into componentDidUpdate
  getSnapshotBeforeUpdate(nextProps, nextState) {
   console.log('[getSnapShotBeforeUpdate]', 'About to update...');
   return `Time is ${Date.now()}`;
  }

  componentDidUpdate(preProps, prevState, snapshot) {
    console.log('[componentDidUpdate]', 'Updated.');
    console.log(' snapshot:', snapshot);
  }

  componentWillUnmount() {
    console.log('[componentWillUnmount]', 'Goodbye.'); 
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  causeErrorNextRender = () => {
    //Set a flag to cause an error on the next render
    // This will case componentDidCatch to run in the parent
    this.setState({
        causeError: true
    });
  };

  render() {
    console.log('[render]');
    if(this.state.causeError) {
      throw new Error('oh no!');
    }
    return (
      <div>
        <span>Counter: {this.state.counter}</span>
        <button onClick={this.handleClick}>
          Click to increment
        </button>
        <button onClick={this.causeErrorNextRender}>
          Throw an error
        </button>
      </div>
    );
  }  

}



ReactDOM.render(
  <ErrorCatcher>
    <LifecycleDemo />
  </ErrorCatcher>,
  document.getElementById('root')
);


