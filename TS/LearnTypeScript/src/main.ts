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
interface Barkable {
  barking(): void;
}
interface Shakable {
  shaking(): void;
}
interface Petable extends Barkable, Shakable {
  eating(): void;
}

class Dog implements Petable {
  barking(): void {
    console.log("wangwang");
  }
  shaking(): void {
    console.log("摇尾巴");
  }
  eating(): void {
    console.log("吃屎");
  }
}
//声明为模块，有自已的作用域
export {};
