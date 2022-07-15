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
          <li key={item.id}   className="grid grid-cols-2 h-12 mx-6 border-b border-gray-200 dark:border-gray-700 py-3 " >
             {item.bookTitle} <div className="text-right" >{item.bookAuthor}</div>
           </li>
        );
    return (
          <ul className="text-sm">{listItems}</ul>
        );
  }else{
    return(
      <div>err {props.myList.error} </div>
    );
  }
}






export default function Example() {

 const[bookTitle, setBookTitle]=useState("");
  const[bookAuthor, setBookAuthor]=useState("");
  const[bookGenre, setBookGenre]=useState("");
  const[APIResponse, setAPIResponse]=useState(null);
  useEffect(() => {
    console.log("bookTitle", bookTitle);
    console.log("bookAuthor", bookAuthor);
    console.log("bookGenre", bookGenre);
    console.log("APIResponse", APIResponse);
  },[bookTitle, bookAuthor, bookGenre, APIResponse])

  const readDB = async() => {
    try {
      const response = await fetch ("/api/books", {
           method: "GET",
           headers: {"Content-Type": "application/json"}
      });
      setAPIResponse(await response.json());
      if (response.status !== 200){
        console.log("something went wrong");
       } else {
         console.log("form submitted successfully !!!")
       }
    } catch (error) {
      console.log("there was an error reading from the db, " , error)
    }
  }

//creating a new book
  const handleSubmit = async(e) => {
        e.preventDefault();
    const body = {"title": bookTitle, "author":bookAuthor, "genre":bookGenre}
        try {
              const response = await fetch("/api/books", {
                      method: "POST",
                              headers: {"Content-Type": "application/json"},
     body: JSON.stringify(body),
         });
        if (response.status !== 200){
        console.log("something went wrong");
          console.log(body);
         //set an error banner here     
       } else {
             resetForm();
             readDB();
                   console.log("form submitted successfully !!!")
        //set a success banner              
                  }
           
               } catch (error) {
          console.log("there was an error submitting", error);

              }
       }

       const resetForm = () => {
           setBookTitle("");
           setBookAuthor("");
           setBookGenre("");
       }
      const showDB = (e) => {
        readDB();
      }



  return(
	<div>
	 <div className="App">
      	  <ContainsFlashClass/>
    	 </div>
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className=" relative max-w-xl mx-auto">
        <svg
          className="absolute left-full transform translate-x-1/2"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          
        </svg>
        <defs>
        </defs>
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"> WORLD MATH RANK </h2>
        <p className="mt-4 text-lg leading-6 text-gray-500">
            Ranking all the fastest players in the world.
           </p>
      </div>
      <div className="mt-12">
        <button
	className="mt-5 bg-white text-black font-black w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base" 

            onClick={(e) => showDB(e)}
            type="button"
        >
        Show Rank
        </button>
      </div>
        <div>{APIResponse? <ListComponent myList={APIResponse} />:<div></div>}</div>
        {   /*APIResponse?.map((book) => (<li>{book.bookTitle}</li>))*/  }
      </div>

    </div>


	</div>

  )
}
