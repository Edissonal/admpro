
export class Usuario{


  constructor(
    public nombre: string,
    public email:string,
    public google: boolean,
    public password?:string,
    public img?:string,
    public uid?: String,
    public role?:string,
  ) {
  
  }

}