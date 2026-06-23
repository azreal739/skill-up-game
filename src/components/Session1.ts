// type User = {
//   id: string;
//   age: number;
//   active: boolean;
//   profile?: {
//     email: string;
//   };
// }
//
// type Status = "idle" | "loading" | "success" | "error";
//
// type Result =
//   | { ok: true; value: number }
//   | { ok: false; error: string };
//
// interface Person {
//   id: string;
//   name: string;
//   active: boolean;
// }
//
// type ID = String;
// type Roll = "admin" | "user";
//
// export class PersonComponent {
//
//
//   constructor() {
//     // primitive types
//     let user: User = {
//       age: 30,
//       active: true,
//       id: "380209",
//       profile: {
//         email: "asd"
//       }
//     };
//
//     let email: string = user.profile?.email ?? "no Email found!";
//
//     let age: number = 30;
//     let name: string = "Waldt";
//     let isActive: boolean = true;
//
//     let x: any; // never use
//     let y: unknown;
//
//     if(typeof y === "string") {
//       console.log(y.toString());
//     }
//
//     y.toString();
//
//     x.toString();
//
//     this.identity<string>("123");
//
//     let userName = {
//       age: 30,
//       active: true,
//       id: "380209",
//       userName: "name"
//     }
//
//     this.logId(userName);
//
//     const el = document.getElementById("APP") as HTMLElement; //EEEEK
//   }
//
//   add(x: number, y:number): number {
//     return x + y;
//   }
//
//   identity<T>(value:T): T {
//     return value;
//   }
//
//   logId<T extends { userName: string }>(user: T) {
//     console.log(user.userName);
//   }
//
//
//   render(status: Status): string {
//     if(status === "loading") {
//       return "Loading..."
//     }
//
//     return "Some Person"
//   }
//
//   print(value: string | number) {
//     if(typeof value === "string" ) {
//       return value.toUpperCase();
//     }
//
//     return value.toFixed(2);
//   }
// }
