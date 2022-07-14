import React from 'react';
//import './Stats.css';

function Stats (props){
		const ratio =props.ratio.length+"/"+(props.session.length ) ;
const percents = (100*props.ratio.length/(props.session.length)).toFixed(2);
	return(
		<div className="Stats ">
					<div  className="">
				    <div className="bcontainer">
			      <div className="item text-white">
						Correct Answer !	
		      </div>
							<div className="cover bg-emerald-300"></div>
		      <div className="circle bg-emerald-500"></div>
			    <div className="circle bg-emerald-500 delay1"></div>
					<div className="circle bg-emerald-500 delay2"></div>
					<div className="circle bg-emerald-500 delay3"></div>
		    </div>
		  </div>
		<div className=" innerStats mt-10">
			<ul className="text-sm">
				<li className="grid grid-cols-2 h-12 mx-6 border-b border-gray-200 dark:border-gray-700 py-3 ">
					<div className="col-span-1" >Score </div><div className="col-span-1 text-right"> {ratio}</div> </li>
				<li className="h-12 grid grid-cols-2 mx-6 border-b border-gray-200 dark:border-gray-700 py-3">
					<div>Ratio </div><div className="text-right">{percents} %</div></li>
				<li className="grid grid-cols-2 h-12 mx-6 border-b border-gray-200 dark:border-gray-700 py-3">
					<div>Speed in numbers/min</div><div className="text-right"> {60/(props.period/1000)} </div></li>
			</ul>
		</div>
		</div>
	)
}

export default Stats;
