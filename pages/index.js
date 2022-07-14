import {useState, useEffect} from 'react'
import {Switch} from '@headlessui/react'
//import './App.css';
import ContainsFlashClass from '../components/ContainsFlashClass';



function classNames(...classes){
  return classes.filter(Boolean).join(' ')
}


function ListComponent(props) {
  if(!props.myList.error){
    const listItems = props.myList.map((item) =>
          <li key={item.id}>
             {item.bookTitle}
           </li>
        );
    return (
          <ul>{listItems}</ul>
        );
  }else{
    return(
      <div>err {props.myList.error} </div>
    );
  }
}






export default function Example() {


  return(
		<div>
	 <div className="App">

      <ContainsFlashClass/>
    </div>
  		hello world

	  	</div>
  )
}
