import React, {Component} from 'react';
import FlashClass from './FlashClass';
import Parameter from './Parameter';
import Stats from './Stats';
import Levels from './Levels';

const generate = (cnumberOfDigits,clow) => {
		//genrate digits of the concatedStrNumber in the current flash.
		let concatedStrNumber = '';
		for (let i=0; i< parseInt(cnumberOfDigits); i++){
		let min=Math.ceil(clow);
		let randomDigit = Math.floor(Math.random()*(10-min)+min);
		randomDigit !=0 ? concatedStrNumber += String(randomDigit) : i --;
		}
	return concatedStrNumber;
}


class ContainsFlashClass extends Component{
		constructor(props){
				super(props)
				this.state={
	    			level			: 1,
	    			mode  			: "home"	    ,
	    			flasher			: false			,
	    			contentBtn		: "LEVEL 1"		,
	    			cperiod			: 1200			,
	    			cnumberOfDigits	: 1			    ,
	    			cnumberOfFlashes: 3			    ,
	    			clow		    : 6			    ,
	    			series			: []			,
	    			ratio		    : []			,
	    			session			: []
				};

				this.handleStartFlashing    =	this.handleStartFlashing.bind(this)  ;
				this.createSeries			=	this.createSeries.bind(this)		 ;
				this.handleRatio			=	this.handleRatio.bind(this)		     ;
				this.handleSession		    =	this.handleSession.bind(this)		 ;
				this.goHome				    =	this.goHome.bind(this)				 ;
				this.incLevel               =   this.incLevel.bind(this)             ;
                this.sendLevel              =   this.sendLevel.bind(this)            ;
		}

//creating a new book
async sendLevel () {
        //e.preventDefault();
    const body = {"title": "level : " +this.state.level, "author":"level : "+this.state.level, "genre":"level :"+this.state.level}
        try {
              const response = await fetch("/api/books", {
                      method: "POST",
                              headers: {"Content-Type": "application/json"},
     body: JSON.stringify(body),
         });
        if (response.status !== 200){
        console.log("something went wrong while sending level");
          console.log(body);
         //set an error banner here     
       } else {
                   console.log("level submitted successfully !!!")
        //set a success banner              
                  }
           
               } catch (error) {
          console.log("there was an error submitting level", error);

              }
       }


	
		incLevel(){
                   console.log(`level ${this.state.level}`);
               //this.sendLevel(); 
				let lev = this.state.level + 1;
                console.log("lev in incLevel"+lev);
                let cper = Levels[lev]["interval"];
                let cnumd = Levels[lev].numberOfDigits;
                let cntimes = Levels[lev].numberOfTimes;
                let lowbnd = Levels[lev].lowerBound;
                this.setState({ 
                                level: lev,
                                cperiod:  cper, 
                                cnumberOfDigits : cnumd,
                                cnumberOfFlashes : cntimes,
                                clow : lowbnd
                });
                console.dir(this.state);
		}
		handleRatio(isSuccess){
			let arrRatio = this.state.ratio;
			arrRatio.push(isSuccess);
			this.setState({ratio:arrRatio});
			//this.setState({contentBtn:"Start"});
		}

		handleSession(isSession){
			
			let arrSession = this.state.session;
			arrSession.push(isSession);
			this.setState({session:arrSession});
			this.setState({mode:"stats"});
            let nextLvl = this.state.level +1;
			this.setState({contentBtn:"LEVEL "+ nextLvl});
		}

		goHome(){
			this.setState({mode:"home"})
			this.setState({contentBtn:"LEVEL "+ this.state.level})
		}

		handleStartFlashing(){
			console.log("handleStartFlashing just called")
			if(this.state.mode=="flashing"){
		        this.setState({mode:"home"});
		        this.setState({contentBtn:"START"});
			}else if(this.state.mode=="stats"){
		        this.createSeries();
		        this.setState({mode:"flashing"});
		        this.setState({contentBtn:"Stop Now"});
			}else if(this.state.mode=="home"){
		        this.setState({contentBtn:"Stop"});
		        this.createSeries();
		        this.setState({mode:"flashing"});
			}
		}

		
		
	createSeries(){	
			let arrSeries = this.state.series;
			for(let i =0; i<this.state.cnumberOfFlashes;i++){
	        	let x = generate(Levels[this.state.level].numberOfDigits,Levels[this.state.level].lowerBound);
		        arrSeries[i]=x;
			}
			console.log("created serie : ");
			console.log(arrSeries);
			this.setState({series : arrSeries});
	}





	render(){
		const 
			cperiod		        = this.state.cperiod,
			cnumberOfDigits		= this.state.cnumberOfDigits,
			cnumberOfFlashes    = this.state.cnumberOfFlashes,
			clow			    = this.state.clow, 
			ratio 		        = this.state.ratio,
			flasher 			= this.state.flasher,
			session 			= this.state.session,
			series		        = this.state.series,
			mode 			    = this.state.mode,
			contentBtn 		    = this.state.contentBtn;
	return(
	    <div	className=" flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className="w-full">
			<div className="">
              <div className=" w-full "> 
			    {mode=="flashing"&& <>
				 <FlashClass 
						period={cperiod} 
						series={series}
						numberOfFlashes = {cnumberOfFlashes}
						addRatio = {this.handleRatio}
						addSession = {this.handleSession}
					 	cancel= { this.goHome}
                        level = { this.incLevel }
				/>
				</>
				}
			    {mode=="stats"&& <>
				 				<Stats
								ratio={ratio}
								session={session}
								period={cperiod}
						 />
				 				<div className="grid grid-col-1 px-6">
						<button 
								className="mt-10 bg-emerald-400 text-white font-black w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base" 
								onClick={() => this.handleStartFlashing()}
						>{contentBtn}
						</button>
	<button 
								className="mt-10 bg-emerald-400 text-white font-black w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base" 
								onClick={() => this.sendLevel()}
						>Save Level
						</button>
				 				<button
								className="mt-5 bg-white text-black font-black w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base" 
								onClick={() => this.goHome()}
						>Home
						</button>
						</div>
				 				</>
			    } 
				{/*if flash just finished display result 
				of flash in this div to replace the previous flashes}
				moreover we can add this and add button to start already.
				basially it only display stop during the flashing sequence.*/}
               </div>
               <div className="grid grid-cols-1 ">
				 {mode=="home" && <>
				    <div	className=" inline-flex items-center justify-center">
				        <div className="py-20 inline-flex items-center justify-center">
  	  		                <button 
				    	        className="disk bg-emerald-400 text-4xl text-white w-40 font-black inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-2xl shadow-sm text-base" 
				                onClick={() => this.handleStartFlashing()}
					         >{contentBtn}</button>
					         <div className="circle bg-emerald-500"></div>
	  					     <div className="circle bg-emerald-500 delay1"></div>
						     <div className="circle bg-emerald-500 delay2"></div>
						     <div className="circle bg-emerald-500 delay3"></div>
				        </div>
                    </div>
				 </>
				}
              </div>
			</div>	
        </div>
	</div>
   )
	}
}

export default ContainsFlashClass;
