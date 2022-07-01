import 'reflect-metadata';

function Injectable(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata(key, 100, target);
        const meta = Reflect.getMetadata(key, target);
        console.log(meta);
    }
}



function Prop(target: Object, name: string) {
    
}

@Injectable('Class C')
class C {
    @Prop prop: number
}

@Injectable('Class D')
class D {
    @Prop prop: number;

    constructor(c: C) {
        
    }
}