function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

class Counter extends React.Component{
    constructor(){
        super();
        this.state = {
            running: false,
            watch: null,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        }
    }

    format(times){
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    counterStart(){
        if(!this.state.running){
            this.setState({
                running: true,
                watch: setInterval(() => this.step(), 10)
            })
        }
    }


    counterStop(){ 
        clearInterval(this.state.watch);
        this.setState({
            running: false,
            watch: null
        })
    }

    step(){
        let miliseconds = this.state.times.miliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;
    
        miliseconds++;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        this.setState({
            times: {
                miliseconds,
                seconds,
                minutes
            }
        })
    }


    saveResults(){
        this.setState({
            results: [...this.state.results, this.format(this.state.times)]
        });
    }
    

    renderResult(result, i){
       return (<li key={i}>{result}</li>); 
    }

    render(){
        return (<div>
            <nav className="controls">
              <span>Running: {this.state.running.toString()}</span>
              <button href="#" className="button" onClick={this.counterStart.bind(this)}>Start</button>
              <button href="#" className="button" onClick={this.counterStop.bind(this)}>Stop</button>
              <button href="#" className="button" onClick={this.saveResults.bind(this)}>Save Results</button>
            </nav>
            <div className="stopwatch">{this.format(this.state.times)}</div>
            <ul className="results">
                {this.state.results.map( (r, i) => this.renderResult(r, i))}
            </ul>
        </div>)
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));