
function Component(id: number) {
    console.log('init');
    return (target: Function) => {
        console.log('run');
        target.prototype.id = id;
    }
}

function Logger() {
    console.log('init logger');
    return (targ: Function) => {
        console.log('run logger');
    }
}

function Method(
    target: Object,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
) {
    //console.log(target, propertyKey, propertyDescriptor);
    propertyDescriptor.value = function(...args: any[]) {
        return args[0]*10;
    }
}

function Prop(
    target: Object,
    propertyKey: string
) {
    console.log(target, propertyKey);
    let value: number;
    
    const getter = () => {
        console.log('get!');
        return value;
    }

    const setter = (newValue: number) => {
        console.log('set!');
        value = newValue;
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
    })
}

function Param(
    target: Object,
    propertyKey: string,
    index: number,
) {
    console.log(target, propertyKey, index)
}

//@Logger()
@Component(1)
export class User {
    @Prop id: number;
    anotherProp: string;

    @Method
    updateId(@Param newId: number) {
        this.id = newId;
        this.anotherProp = 'something else';
        return this.id;
    }
}

console.log(new User().id);
console.log(new User().updateId(2));