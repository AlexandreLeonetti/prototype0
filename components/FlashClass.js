import React, {Component} from 'react'

const between = "";

function Marvelous(props){
      return <h1 className="marvelous"> Marvelous !</h1>;
}
class Flash extends Component {
      constructor(props){
            super(props);
            this.state = {
                  ith               :   0        ,
                  concatedStrNumber :   ""       ,
                  sumOfSerie        :   0        ,
                  flashing          :   true     ,
                  succeeded         :   false    ,
                  cflash            :   ""       ,
                  cresult           :   ""
            };
            this.check = this.check.bind(this);
      }

      componentDidMount(){
            this.launchFlasher();
            this.backgroundGray();
      }
      backgroundGray = () => {
            document.body.style.backgroundColor="rgb(31 41 55)";
      }
      backgroundWhite = () => {
            document.body.style="background-color:white;"
      }

      stopFlasher = () =>{
            clearInterval(this.updateFlash);
            console.log("stopFlasher");
      }

      launchFlasher= () =>{
            this.updateFlash        = setInterval(() => {
                 let currentVal            = this.props.series[this.state.ith];//render ith elt of serie into the ith flash
     
                  this.setState({cflash:currentVal});
                  console.log(currentVal);
                  setTimeout(() => this.setState({cflash:between}),(this.props.period)*2/3);
                  if(this.state.ith==this.props.numberOfFlashes-1){
                       clearInterval(this.updateFlash);
                        setTimeout(() =>  this.setState({flashing:false}),(this.props.period*2/3));
                  }
               
                  this.setState({ith:(this.state.ith +1)});
            },this.props.period);
      };

      componentWillUnmount(){
            this.backgroundWhite();
            this.stopFlasher();

            console.log("FlashClass Will unmount");
            
            if(this.state.succeeded!==true){
                  //this.props.addSession("session");
            }
      }

      check  (e) {
            let sumOfSerie = 0
            for(let i=0; i<this.props.numberOfFlashes; i++){
                   sumOfSerie += parseInt(this.props.series[i]);
            }

            this.setState({cresult:e});

            if(parseInt(e)==parseInt(sumOfSerie)){
                  //this.setState({cflash:"Marvelous !"});
                  this.setState({succeeded:true});
                  this.props.addRatio("success");
                  this.props.addSession("session");
                  this.props.level();
            }else{
                  //this.props.addSession("session");
                  //this.props.rato("sucess",props.series);
            }
      }

      render(){ 
            const flashing = this.state.flashing;
            const succeeded = this.state.succeeded;
            return(
                  <>
                     {flashing && <>
                         <div className="bg-gray-800 grid grid-rows-5 ">
                            <div className=" bg-gray-800 w-full"></div>
                                <div className="bg-gray-800 w-full">
                                    <h1 className=" betweenVoid text-white text-9xl text-center font-extrabold ">{flashing && this.state.cflash}</h1>
                                </div>
                                <div></div>
                                <div className="px-6">
                                    <button className="bg-gray-500 w-full  mt-5 text-gray-800 font-black inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base "
                                        onClick={() => this.props.cancel()}
                                    >Home</button>
                                </div>
                            <div className="bg-gray-800 w-full "></div>
                        </div>
                      </>
                     }
                      {!flashing && !succeeded && 
                       <div className="px-6 grid grid-rows-4">
                             <div></div>
                           <label className="block text-sm text-center text-white font-black">Enter Result : </label>
            					     <input type ='number' 
                                 className="py-3 px-4 block w-full border-black rounded-xl shadow-sm focus:outline-none border-gray-300 "
                                  autoFocus
             				              value={this.state.cresult} 
                                  onChange={(event) => this.check(event.target.value)}
                           />
                             <div></div>
                              <div className="px-6">
                     <button className="bg-gray-500 w-full  mt-5 text-gray-800 font-black inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base "
                             onClick={() => this.props.cancel()}
                     >Home</button>
                     </div>
            			    </div>
                     }
                     {/*succeeded && <Marvelous/>*/}
                  </>
            )
      }
}

export default Flash;
