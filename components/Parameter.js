import React , {Component} from 'react'

class Parameter extends Component {
            constructor(props){
                  super(props)
                  this.handleChange = this.handleChange.bind(this);
            }
            handleChange(e){
                  this.props.onParamChange(e.target.value);
            }

            render(){
            return(
                  <>
            <div className={`mx-6  grid grid-cols-12 ${this.props.className}`}>
                  <label className="col-span-5 mt-4 text-gray-600 font-extrabold block text-xs font-medium ">{this.props.title}</label>
                  <div className="col-span-4"></div>
                  <input className="col-span-3 focus:outline-none text-right text-base text-gray-700 font-bold outline-1 py-3 px-4 block  rounded-md" 
                         type="number"
                         value={this.props.value}
                         onChange={this.handleChange}
                  />
            </div>
            </>
             )
      }
}

export default Parameter;
