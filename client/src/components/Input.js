import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            [this.props.bandType + this.props.inputType]: this.props.displayValue,
        }
    }

    handleChange(event) {
        const val = parseFloat(event.target.value);
        const valueKey = this.props.bandType + this.props.inputType;
        
        this.setState({[valueKey]: val});
        this.props.onInputChange({[valueKey]: val}); 
        
    }

    handleSubmit(event) {
        event.preventDefault();
    } 

    render() {
        const valueKey = this.props.bandType + this.props.inputType;

        return (
        <form onSubmit={this.handleSubmit}>
            <input type="number" value={this.state[valueKey]} onChange={this.handleChange.bind(this)}/>
        </form>
        );
    }
}

export default Input;