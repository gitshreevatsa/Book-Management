import { PersistentVector, Context, logging } from "near-sdk-as";

@nearBindgen
export class Library{
    bookId : string;
    bookName : string;
    author : string;
    department : string;
    user : string;

    constructor(bookId: string,bookName: string,author: string,department: string){
        this.bookId = bookId;
        this.bookName = bookName;
        this.author = author;
        this.department = department;
        this.user = Context.sender;
    }
    getAuthor():string{
        return this.author
    }
}


export const library = new PersistentVector<Library>("l");