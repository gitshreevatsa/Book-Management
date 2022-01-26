import { Context, logging } from "near-sdk-as";
import { Library, library } from "./models";

export function newBook(bookId: string,bookName: string,author: string,department: string): void{
    assert(bookId.length>0, "Enter the book ID of the book");
    assert(bookName.length>0, "Enter the name of the book");
    assert(author.length>0, "Enter the author of the book");
    assert(department.length>0,"Enter to which department the book belongs");
    let user = Context.sender;
    let toBlockchain = new Library(bookId, bookName, author, department);
    library.push(toBlockchain);
    logging.log(bookId+ ' Added by ' + user);
}

//function to see all books
export function seeBooks(): Array<Library>{
    let result = new Array<Library>(library.length);
    for(let i=0; i<library.length; i++){
        let toBlockchain = library[i];
        result[i] = toBlockchain;
    }
    return result;
}

//function to query books by id
export function queryBook(bookId : string):Library|null{
    assert(bookId.length>0,"Id is required");
  for (let i = 0; i < library.length; i++) {
    if (library[i].bookId == bookId) {
      let toBlockchain = library[i];
      return toBlockchain;
    }
  }
  return null;
}


//near call shreyaspadmakiran.testnet newBook '{"bookId" : "EST", "bookName":"Nerds", "author" : "Christine","department" : "Startups"}' --account-id shreyaspadmakiran.testnet
//near call shreyaspadmakiran.testnet newBook '{"bookId" : "REC", "bookName":"Climate Disaster", "author" : "Bill Gates","department" : "Environment"}' --account-id shreyaspadmakiran.testnet
//near call shreyaspadmakiran.testnet queryBook '{"bookId" : "REC"}' --account-id shreyaspadmakiran.testnet