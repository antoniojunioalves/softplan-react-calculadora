import React from 'react'
import '../Experiencias/TesteArquivoCSS.css';

export default class Calculadora extends React.Component {
    render(){
        return(
            <div class="principal">
                <input class="visor"></input>
                {/* <div class="container">
                      1
                </div >
                <div class="container">
                    2
                </div>
                <div >
                    3
                </div>   */}
                <div class="container">
                    <div class="item">7</div>
                    <div class="item">8</div>
                    <div class="item">9</div>
                </div>
                <div class="container">
                    <div class="item">6</div>
                    <div class="item">5</div>
                    <div class="item">4</div>
                </div>
                <div class="container">
                    <div class="item">3</div>
                    <div class="item">2</div>
                    <div class="item">1</div>
                </div>                                
            </div>           
        )
    }
}