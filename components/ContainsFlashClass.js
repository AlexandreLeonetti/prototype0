import React, {Component} from 'react';
import FlashClass from './FlashClass';
import Parameter from './Parameter';
import Stats from './Stats';

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
												mode   					: "home"	,
												flasher					: false							,
												contentBtn			: "START"						,
												cperiod					: 1200							,
												cnumberOfDigits	: 1									,
												cnumberOfFlashes: 3									,
												clow						: 6									,
												series					: []								,
												ratio						: []								,
												session					: []
								};
								this.handleNumberOfDigits =			this.handleNumberOfDigits.bind(this)  ;
								this.handlePeriod					=			this.handlePeriod.bind(this)          ;
								this.handleNOfFlashes	    =			this.handleNOfFlashes.bind(this)      ;
								this.handleLow					  =			this.handleLow.bind(this)							;
								this.handleStartFlashing  =			this.handleStartFlashing.bind(this)		;
								this.handleSeries					=			this.handleSeries.bind(this)					;
								this.handleRatio					=			this.handleRatio.bind(this)						;
								this.handleSession				=			this.handleSession.bind(this)					;
								this.goHome								=			this.goHome.bind(this)								;
								
						}

				handleNumberOfDigits (n){
					this.setState({cnumberOfDigits:n});
				}
				handlePeriod(period){
					this.setState({cperiod:period});
				}

				handleNOfFlashes( NOFlashes){
					this.setState({cnumberOfFlashes:NOFlashes})	;	
				}

				handleLow(Low){
								this.setState({clow:Low});
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
					this.setState({contentBtn:"START"});
				}

				goHome(){
					console.log("goHome just called")
					console.log(this.state.mode)
					this.setState({mode:"home"})
					this.setState({contentBtn:"START"})
					console.log(this.state.mode);
				}

				handleStartFlashing(){
					console.log("handleStartFlashing just called")
					if(this.state.mode=="flashing"){
						this.setState({mode:"home"});
						/*this.handleSeries();*/
						this.setState({contentBtn:"START"});
					}else if(this.state.mode=="stats"){
						this.handleSeries();
						this.setState({mode:"flashing"});
						this.setState({contentBtn:"Stop Now"});
					}else if(this.state.mode=="home"){
						this.setState({contentBtn:"Stop"});
						this.handleSeries();
						this.setState({mode:"flashing"});
				//		let sessionNow = this.state.session;
				//		this.setState({session:(sessionNow+1)});
//						this.setState({session:(this.state.session+1)})
					}
				}

				
				
				// addRatio = (isSuccess) => {
				// ratio.push(isSuccess)
				// }
			handleSeries(){	
					let arrSeries =  this.state.series;
					for(let i =0; i<this.state.cnumberOfFlashes;i++){
						let x = generate(this.state.cnumberOfDigits,this.state.clow);
						arrSeries[i]=x;
					}
					console.log("master series");
					console.log(arrSeries);
					this.setState({series : arrSeries});
			}

			render(){
				const 
					cperiod						= this.state.cperiod,
					cnumberOfDigits		= this.state.cnumberOfDigits,
					cnumberOfFlashes  = this.state.cnumberOfFlashes,
					clow							= this.state.clow, 
					ratio 						= this.state.ratio,
					flasher 					= this.state.flasher,
					session 					= this.state.session,
					series						= this.state.series,
					mode 							= this.state.mode,
					contentBtn 				= this.state.contentBtn;
			return(

			<div	className="  flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
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
										/>
										 {/*<button 
																				className="mt-10 bg-emerald-400 text-white  font-black w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base" 
																				onClick={() => this.handleStartFlashing()}
																		>{contentBtn}
																		</button>*/}
										{/*
										 <div className="mx-6">
										<button
																						className="mt-5 bg-gray-100 text-black font-black w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base" 
																						onClick={() => this.goHome()}
																		>Cancel
																		</button>
										 </div>
										 */}
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
																				className="mt-10 bg-emerald-400 text-white  font-black w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base" 
																				onClick={() => this.handleStartFlashing()}
																		>{contentBtn}
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
										moreover  we can add this and add button to start already.
										basially it only display stop during the flashing sequence.*/}
                  </div>
                   <div className="grid grid-cols-1  ">
										 {mode=="home" && <>
										<div	className=" inline-flex items-center justify-center">
												 <div className="py-20 inline-flex items-center justify-center">
         	         				<button 
															className="disk bg-emerald-400 text-4xl text-white w-40  font-black inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-2xl shadow-sm text-base" 
															onClick={() => this.handleStartFlashing()}
													>{contentBtn}</button>
															      <div className="circle bg-emerald-500"></div>
			    													<div className="circle bg-emerald-500 delay1"></div>
																		<div className="circle bg-emerald-500 delay2"></div>
																		<div className="circle bg-emerald-500 delay3"></div>
												</div>
                     </div>
										 <Parameter
											 className="border-b border-gray-100"
												title= {"Number Of Digits"}
												value={cnumberOfDigits}
												onParamChange={this.handleNumberOfDigits}
										/>
										<Parameter
												className="border-b border-gray-100"
												title={"Period"}
												value={cperiod}
												onParamChange={this.handlePeriod}
										/>
										<Parameter
												className="border-b border-gray-100"
											title={"Number Of Times"}
											value={cnumberOfFlashes}
											onParamChange={this.handleNOfFlashes}
										/>
										<Parameter
											title={"Lower Bound"}
											value={clow}
											onParamChange={this.handleLow}
										/>
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
