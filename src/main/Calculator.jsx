import React, { Component } from 'react'
import './Calculator.css'
import Button from '../Components/Button'
import Display from '../Components/Display'

const initialState = {
    displayValue: '0',
    memoryDisplay: '',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        let memoryDisplay = this.state.memoryDisplay

        if (this.state.current === 0){

            if (memoryDisplay === '') {
                memoryDisplay = memoryDisplay + this.state.values[0] + operation 
            } else {
                memoryDisplay = memoryDisplay + operation 
            }

            this.setState({ 
                memoryDisplay,
                operation, 
                current: 1, 
                clearDisplay: true
            })
        } else { 
            const values = [ ...this.state.values ]  
            const curretOperation = this.state.operation
            const equals = operation === '='  

            memoryDisplay = memoryDisplay + values[1] + operation

            switch(curretOperation){
                case '÷': 
                    values[0] = values[0] / values[1]
                    break;
                case 'x':       
                    values[0] = values[0] * values[1]
                    break;
                case '-':       
                    values[0] = values[0] - values[1]
                    break;
                case '+':       
                    values[0] = values[0] + values[1]
                    break;
                default:
                    values[0] = this.state.values[0]
            }  
            values[1] = 0

            if (equals) {
                memoryDisplay = memoryDisplay + values[0]   
            }

            this.setState({
                memoryDisplay,
                displayValue: values[0], 
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values                
            })
        }
    }

    addDigit(digito) {
        // Se é um ponto e já incluiu um ponto então sai da função
        if (digito === '.' && this.state.displayValue.includes('.')) {
            return
        }
        
        const clearDisplay = this.state.clearDisplay || this.state.displayValue === '0'
        
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digito
        this.setState({ 
            displayValue, 
            clearDisplay: false
        })

        if (digito !== '.') {
            const values = [...this.state.values]
            values[this.state.current] = parseFloat(displayValue)
            this.setState({ values })
        }
    }

    render(){
        {/* 
            Tem os 3 jeitos para passar eventos por parâmetros

            1 - crio uma arrow function no click do botão.
                ex.: <Button label="DEL" click={() => this.clearMemory()}/>

            2 - crio uma constante com a arrow function, fazendo a constante receber um parâmetro 
                e passar para a função original
                ex.: const nomeConstSetOperation = op => this.setOperation(op)
                        <Button label="/" click={nomeConstSetOperation}/> 

            3 - crio o constructor e depois posso utilizar a função direto no botão.
                ex.: 
                constructor(props) {
                    super(props)

                    this.addDigit = this.addDigit.bind(this)
                }
                <Button label="7" click={this.addDigit}/> 
            
        */}  
        const nomeConstSetOperation = op => this.setOperation(op)      
        return (
            <section className="container">
                <Display value={this.state.displayValue} valueMemoryDisplay={this.state.memoryDisplay}/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="." click={this.addDigit}/>
                <Button label="0" click={this.addDigit}/>
                <Button label="=" click={nomeConstSetOperation}/>
    
                <div className="painel-right">
                    <Button operation label="DEL" click={() => this.clearMemory()}/>
                    <Button operation label="÷" click={nomeConstSetOperation}/>
                    <Button operation label="x" click={nomeConstSetOperation}/>
                    <Button operation label="-" click={nomeConstSetOperation}/>
                    <Button operation label="+" click={nomeConstSetOperation}/>
                </div>
            </section>
        )
    } 
}