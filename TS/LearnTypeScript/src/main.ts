// let message: string = "123";
// let foo = function (a: number) {
//   setTimeout(() => {
//     console.log(a);
//   }, 2000);
// };
// foo(1000);
// console.log(message);

// let name: string = "222";

// const obj = {
//   name: "why",
//   age: 25,
//   height: 1.88,
// };
// console.log(obj.name);

// const s1 = Symbol("identity");
// const s2 = Symbol("identity");

// const person = {
//   [s1]: "程序员",
//   [s2]: "教师",
// };

// enum Direction {
//   EAST = 10,
//   WEST,
//   NORTH,
//   SOUTH,
// }
// const d1 = Direction.EAST;
// const d2 = Direction.NORTH;

// console.log(d1);
// console.log(d2);

// const tInfo: [string, number, number] = ["why", 16, 25];
// console.log(tInfo[0]);
// console.log(tInfo[1]);

// const aInfo: Array<string | number> = ["longinus", 18, 20];
// console.log(aInfo[0]);

// let a: any = "why";
// a = 123;
// a = true;
// const aArray: any[] = ["longinus", 16, 25];

// const sum = (num1: number, num2: number) => {
//   return num1 + num2;
// };

// 相当于下面的写法
// const sum: (num1: number, num2: number) => number = (
//   num1: number,
//   num2: number
// ) => {
//   return num1 + num2;
// };

// const sayHello: (name: string) => void = (name: string) => {
//   console.log("hello" + name);
// };

// const errFunc = () => {
//   throw new Error("函数发生错误");
// };

// const getUserInfo = function (user) {
//   return `name: ${user.name}, age: ${user.age}`;
// };

// const getUserInfo = (user: { name: string; age: number }) => {
//   return `name: ${user.name} age: ${user.age}`;
// };

//参数类型使用接口定义
// interface IUser {
//   name: string;
//   age: number;
// }

// const getUserInfo1 = (user: IUser): string => {
//   return `name: ${user.name} age; ${user.age}`;
// };

// let b = getUserInfo1({ name: "longiuns", age: 18 });
// console.log(b);

//函数的类型使用接口定义好
// interface IUser {
//   name: string;
//   age: number;
// }
// interface IUserInfoFunc {
//   (user: IUser): string;
// }
// const getUserInfo2: IUserInfoFunc = (user) => {
//   return `name: ${user.name} age; ${user.age}`;
// };
// let b = getUserInfo2({ name: "longiuns", age: 18 });
// console.log(b);
//可选属性如果没有赋值，那么获取到的是undefined
//对于可选方法，必须先判断再调用
// interface Person {
//   readonly name: string;
//   age?: number;
//   run(): void;
//   eat(): void;
//   study?(): void;
// }
// const p: Person = {
//   name: "longinus",
//   run() {
//     console.log("running");
//   },
//   eat() {
//     console.log("eating");
//   },
// };
// console.log(p.age);
// if (p.study) {
//   p.study();
// }
// p.name = "why"

//定义可索引类型的接口
// interface RoleMap {
//   [index: number]: string;
// }
//赋值方式一
// const roleMap1: RoleMap = {
//   0: "xuesheng",
//   1: "jiangshi",
//   2: "banzhuren",
// };
//赋值方式二
// const roleMap2 = ["luban7hao", "luna", "libai"];
// console.log(roleMap1[0]);
// console.log(roleMap2[1]);

//索引签名支持：字符串和数字
// interface RoleMap2 {
//   [name: string]: string;
// }
// const roleMap3: RoleMap2 = {
//   aaa: "long",
//   bbb: "zheng",
//   ccc: "bo",
// };
// console.log(roleMap3.aaa);
// console.log(roleMap3["aaa"]);

//数字索引的返回值必须是字符串索引返回值类型的子类型
//这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象
// class Person {
//   private name: string = "";
// }
// class Student extends Person {
//   private sno: number = 0;
// }

// interface IndexSubject {
//   [index: number]: Student;
//   [name: string]: Person;
//   letter: Person;
// }

//让一个类去实现某个接口
// interface Entity {
//   title: string;
//   log(): void;
// }
// class Post implements Entity {
//   title: string;

//   constructor(title: string) {
//     this.title = title;
//   }

//   log(): void {
//     console.log(this.title);
//   }
// }

//接口的继承
// interface Barkable {
//   barking(): void;
// }
// interface Shakable {
//   shaking(): void;
// }
// interface Petable extends Barkable, Shakable {
//   eating(): void;
// }

// class Dog implements Petable {
//     console.log("wangwang");
//   }
//   shaking(): void {
//     console.log("摇尾巴");
//   }
//   eating(): void {
//     console.log("吃屎");
//   }
// }

// function identity(arg: number): number {
//   return arg;
// }

//参数类型与返回值类型相同，跟踪函数里使用的类型的信息
// function identity<T>(arg: T): T {
//   return arg;
// }
// let output1 = identity<string>("mystring1");
// let output2 = identity("mystring2");

// function loggingIdentity<T>(arg: T[]): T[] {
//   console.log(arg.length);
//   return arg;
// }
// function loggingIdentity2<T>(arg: Array<T>): Array<T> {
//   console.log(arg.length);
//   return arg;
// }

// let myIdentity: <T>(arg: T) => T = identity;

// interface GenericIdentityFn<T> {
//   <T>(arg: T): T;
// }
// function identity<T>(arg: T): T {
//   return arg;
// }
// let myIdentity1: GenericIdentityFn<number> = identity;

//剩余参数
// function buildName(firstName: string, ...restName: string[]) {
//   return firstName + " " + restName.join(" ");
// }
// let employeeName = buildName("Joseph", "Samuel", "Lucas");
// console.log(employeeName);

//this指向
// let deck = {
//   suits: ["hearts", "spades", "clubs", "diamonds"],
//   cards: Array(52),
//   createCardPicker: function () {
//     return () => {
//       let pickedCard = Math.floor(Math.random() * 52);
//       let pickedSuit = Math.floor(pickedCard / 13);
//       return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//     };
//   },
// };

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();
// alert("card: " + pickedCard.card + " of " + pickedCard.suit);

//字符串字面量
// type Easing = "ease-in" | "ease-out" | "ease-in-out";
// class UIElement {
//   animate(dx: number, dy: number, easing: Easing) {
//     if (easing === "ease-in") {
//     } else if (easing === "ease-out") {
//     } else if (easing === "ease-in-out") {
//     } else {
//     }
//   }
// }

// let button = new UIElement();
// button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy");

//在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
getProperty(x, "m");
//声明为模块，有自已的作用域
export {};
