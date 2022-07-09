import {useState, useEffect} from 'react'
import {Switch} from '@headlessui/react'

function classNames(...classes){
  return classes.filter(Boolean).join(' ')
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
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"> Book Suggestions </h2>
        <p className="mt-4 text-lg leading-6 text-gray-500">
          We are asking community to suggest books.
        </p>
      </div>
      <div className="mt-12">
        <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label htmlFor="book-title" className="block text-sm font-medium text-gray-700">
              Book Title
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => setBookTitle(e.target.value)}
                type="text"
                name="title"
                id="title"
                autoComplete="book-title"
                className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="author-name" className="block text-sm font-medium text-gray-700">
             Author Name 
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => setBookAuthor(e.target.value)}
                type="text"
                name="author"
                id="author"
                autoComplete="author-name"
                className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
             Genre 
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => setBookGenre(e.target.value)}
                type="text"
                name="genre"
                id="genre"
                autoComplete="genre"
                className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
             <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base"
               onClick={(e) => handleSubmit(e)}
             >
               enter book
             </button>
          </div>

        </form>
        <button
            onClick={(e) => showDB(e)}
            type="button"
        >
          show db
        </button>
      </div>
      <div>{APIResponse?.map((book) => (<li>{book.bookTitle}</li>))}</div>
      </div>

    </div>
  )
}
