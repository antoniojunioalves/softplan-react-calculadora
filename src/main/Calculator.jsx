import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
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
        if (this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const curretOperation = this.state.operation
            const values = [ ...this.state.values ]
            
            try {
                values[0] = eval(`${values[0]} ${curretOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0
            this.setState({
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

        const clearDisplay = this.state.clearDisplay || 
            this.state.displayValue === '0'
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digito
        this.setState({ displayValue, clearDisplay: false })

        if (digito !== '.') {
            const i = this.state.current
            const values = [...this.state.values]
            values[i] = parseFloat(displayValue)
            this.setState({ values })
            console.log(values)
        }
    }

    render(){
        return (
            <section className="container">
                <Display />
                <Button label="7"/>
                <Button label="8"/>
                <Button label="9"/>
                <Button label="4"/>
                <Button label="5"/>
                <Button label="6"/>
                <Button label="1"/>
                <Button label="2"/>
                <Button label="3"/>
                <Button label="."/>
                <Button label="0"/>
                <Button label="="/>
    
                <div className="painel-right">
                    <Button operation label="DEL"/>
                    <Button operation label="/"/>
                    <Button operation label="*"/>
                    <Button operation label="-"/>
                    <Button operation label="+"/>
                </div>
            </section>
        )
    }
}

