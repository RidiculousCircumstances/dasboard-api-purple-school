// let universalType: number | string = 5;
// universalType = 'sss';

// function printId (id: number | string) {

//     if (typeof id == 'string') {

//         console.log(id.toUpperCase());
//     } else {
//         console.log(id);
//     }

// }

// function greetingsForUsers (user: string | string[]) {
//     if (typeof user == 'string') {
//         console.log(`hello, ${user}`);
//     } else {
//         user.map(() => {
//             console.log(`hello, ${user}`);
//         });
//     }
// }

// greetingsForUsers('Jhon');

// type coord = { lat: number, long: number};
// interface ICoord {
//     lat: number;
//     long: number;
//     (point: string): number;

// }

// interface IAnimal {
//     name: string;
// }

// interface IDog extends IAnimal {
//     hasOwner: boolean;  
// }

// const dog: IDog = {
//     name: 'Bobeek',
//     hasOwner: true,
// }

// function checkOwner (name: IDog) {
//     console.log(name.hasOwner);
// }

// type Animal = {
//     name: string;
// }

// type Dog = Animal & {
//     hasOwner: boolean;
// }

// const anotherDog: Dog = {
//     name: 'Khylkh',
//     hasOwner: false,
// }

// interface IAnotherDog {
//     name: string;
// }

// interface IAnotherDog {
//     hasOwner: boolean;
//     woof: ()
// }


// function sss(name: IAnotherDog): void {

// }

// const doggo: IAnotherDog = {
//     hasOwner: true,
//     name: 'dfsdf',
//     woof: () => {
//         console.log('wooof');
//     }
// }

// const ddog = {
//     hasOwner: true,
//     name: 'dfsdf',
//     woof: function () {
//         console.log('woooof!');

//     }
// }

// sss(ddog);

// let b: 'sss' | 'bbb' = 'bbb';

// type direction = 'left' | 'right';

// function moveDog(dir: direction): -1 | 0 | 1 {
//     switch (dir) {
//         case 'left':
//             return 1;

//         case 'right':
//             return -1;
//         default: 
//             return 0;

//     }
// };

// moveDog('left');

// interface IConnection {
//     host: string;
//     port: number;
// }

// function connect(connectParams: IConnection | 'default') {

// }

// const con = {
//     host: 'localhost',
//     protocol: <"https">"https",
// }

// function anotherConnect(host: string, protocol: 'http' | 'https') {

// }

// anotherConnect(con.host, con.protocol);


// function point() {

// }

// enum Direction {
//     Left,
//     Right
// }

// function move(dir: Direction) {
//     switch (dir) {
//         case Direction.Left:
//             return -1;
//         case Direction.Right:
//             return +1;
//         default: 
//             return 0;
//     }
// }

// function objMod(dir: { Right: number }) {

// }

// objMod(Direction);

// const enum dir2 {
//     up,
//     down
// }

// let myDirection = dir2.down;

// interface IHasLength {
//     length: number;
// }

// function generic<T extends IHasLength, K> (obj: T, arr: K[]): K[] {
//     obj.length;
//     return arr;
// }

// interface IUser {
//     name: string;
//     age?: number;
//     bid: <T>(sum: T) => boolean;
// }

// function bid<T>(sum: T): boolean {
//     let a = true;
//     return a;
// }

class Coord {

    lat: number;
    long: number;
    computeDistance(newLat: number, newLong: number): number {
        let distance: number = Math.sqrt(Math.pow(Math.abs(newLat - this.lat), 2) + Math.pow(Math.abs(newLong - this.long), 2));
        return distance;
    }

    protected test() {

    }

    constructor(lat: number, long: number) {
        this.lat = lat;
        this.long = long;
    }

}

// const point = new Coord(1, 5);

// const dist: number = point.computeDistance(10, 7);
// console.log(dist);



class MapLocation extends Coord {
    // override computeDistance(newLat: number, newLong: number): number {
    //     return 1;
    // }

    private _name: string;

    get name() {
        return this._name;
    }

    set name(s: string) {
        this._name = s;
    }

    static a(exp: MapLocation) {

    }


    constructor(name: string, lat: number, long: number) {
        super(lat, long);
        this._name = name;

    }

}



// const namedPoint = new MapLocation('AssValley', 1010, 2089)
// const dist = namedPoint.computeDistance(10, 65);
// console.log();
// MapLocation.a(namedPoint);



// interface ILoggerService {
//     log: (s: string) => void;
// }

// class Logger implements ILoggerService {
//     log(s: string) {
//         console.log(s);
//     }
// }

class MyClass<T> {
    public prop: T;

    constructor(prop: T) {
        this.prop = prop;
    }

}

const gen = new MyClass<number>(5);

abstract class Base {
    print(s: string) {
        console.log(s);
    }

    abstract error (s: string): void;
}

class Extender extends Base {
    error (s: string) {

    }
}

const a = new Extender();
a.print('aaa');






class A {
    name!: string;
}

class B {
    name!: string;
    anotherProp!: string;
}

function AB (clss: A) {

}

const Ab: A = new B();

AB(Ab);
AB(B);

type Coord2 = {
    lat: number;
    long: number;
}

type P = keyof Coord2;

let aa: P = 'lat';

function log2(a: string | null) {
    a?.toLocaleLowerCase();
}